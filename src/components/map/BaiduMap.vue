<template>
	<!-- ready是组件加载完之后才能执行的代码 -->
	<baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" @load="loadding" :scroll-wheel-zoom="true"
		@moveend="moveend"
		@movestart="movestart"
		:mapStyle="{styleJson: styleJson}">
		<!-- 其中bm-geolocation中的locationIcon属性要加上“:”，否则会报错！ -->
		<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false" :autoLocation="false"
			:locationIcon="{url: require('../../svg/location.svg'), size: {width: 18, height: 18}}" 
			@locationSuccess="getLoctionSuccess" @locationError="getLocationError">
		</bm-geolocation>
		<!-- 自动定位覆盖物 -->
		<bm-marker :position="autoLocationPoint"
			:icon="{url: require('../../svg/location.svg'), size: {width: 18, height: 18}}" v-if="initLocation">
		</bm-marker>
		<bm-marker :position="enableSelectPoint"
			:icon="{url: require('../../svg/enableselect.svg'), size: {width: 14, height: 14}}">
			<my-label :position="{lng: 110.307236, lat: 21.157355}" :text="selectAddress" :active="active"
				@mouseover.native="active = true" @mouseleave.native="active = false">
			</my-label>
		</bm-marker>
		<bm-marker :position="centerIconPoint" 
			:icon="{url: require('../../svg/centericon.svg'), size: {width: 20, height: 31}}"
			:offset="{width: 0, height: -14}">
		</bm-marker>
	</baidu-map>
	
</template>

<script>
	/**
	 * 需要完善：定位后选起点的问题！
	 * 安装stompjs: https://www.cnblogs.com/liemei/p/7064386.html
	 */
	import MapStyle from './js/map-style.js'
	import MyLabel from './overlay/Label.vue'
	import SockJS from '../../../static/utils/sockjs.js'
	// import Stomp from '../../../static/utils/stomp.js'
	import Stomp from 'stompjs'

	export default {
		components: {
			MyLabel
		},
		data () {
			return {
				center: this.$store.state.currentCity,
				zoom: 15,
				styleJson: null,
				enableSelectPoint: {lng: 110.307236, lat: 21.157355},
				active: false,
				selectAddress: '广东海洋大学',

				// 建立连接用
				stompClient: Stomp.over(new SockJS('http://online-ride-hailing.herokuapp.com/orh')),

				map: null,	// 指定map对象
				BMap: null,	// 指定BMap对象
				autoLocationPoint: {lng: 0, lat: 0},
				centerIconPoint: {lng: 0, lat: 0},
				initLocation: false,

				carLists: [],
			}
		},
		created () {

		},
		mounted () {
			// 发现附近已上线的司机
			this.findOnlineCar();
		},
		methods: {
			handler ({BMap, map}) {
				this.styleJson = MapStyle.style();
				let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
				_this.map = map;	// 创建map对象，然后赋给map属性，以方便在别的方法使用，下同
				_this.BMap = BMap;
				let rs = this.$route.params.selectStatus;	// 当选择城市，返回首页是不进行定位
				let rs1 = this.$route.params.searchStatus;	// 当用户搜索起点或终点时，不对其自动获取当前位置
				if (!rs && !rs1) {
					var geolocation = new BMap.Geolocation();
					geolocation.getCurrentPosition(function(r) {
						_this.center = {lng: parseFloat(r.longitude), lat: parseFloat(r.latitude)};		// 设置center属性值
						_this.autoLocationPoint = {lng: parseFloat(r.longitude), lat: parseFloat(r.latitude)};		// 自定义覆盖物
						const timer = setTimeout(function() {
							_this.centerIconPoint = {lng: parseFloat(r.longitude), lat: parseFloat(r.latitude)};		// 地图中心覆盖物
						}, 500);
						_this.initLocation = true;
						_this.$store.dispatch('city', r.address.city);

						// 当定位完成，进行搜索附近位置，如果放在getCurrentPosition外面是不可以的，因为只是异步操作。
						let geocoder = new BMap.Geocoder();
						geocoder.getLocation(new BMap.Point(_this.center.lng, _this.center.lat), function(rs) {
							if (rs.surroundingPois.length > 0) {
								_this.$store.dispatch('setOutset', {title: rs.surroundingPois[0].title, address: rs.surroundingPois[0].address, point: rs.surroundingPois[0].point});
								window.localStorage.setItem('Outset', JSON.stringify(_this.$store.state.outset));
							} else {
								
							}
							clearTimeout(timer)		// 清除定时器
							console.log('定位附近的地点',rs.surroundingPois)
						})
					}, {enableHighAccuracy: true})
				};
				if (rs1) {
					// 搜索起（终）点返回首页时，自动定位到起点
					let tmp1 = null;
					if (typeof window.localStorage.getItem('Outset') === 'string') {
						tmp1 = JSON.parse(window.localStorage.getItem('Outset'));
					} else {
						tmp1 = window.localStorage.getItem('Outset');
					}
					if (tmp1 != null) {
						// _this.center = {lng: 110.396533, lat: 21.197716};
						var p1 = new BMap.Point(tmp1.point.lng, tmp1.point.lat);
						console.log(p1)
						setTimeout(function() {
							map.panTo(p1);
							_this.centerIconPoint = {lng: tmp1.point.lng, lat: tmp1.point.lat}
						}, 500)
						console.log('执行到这来了！');
					} else {
						console.log('aaaaaa');
					}
				} 
			},
			loadding () {
				// console.log("load组件加载时执行的抽象方法")
			},
			getLoctionSuccess (result) {
				let data = result;
				// console.log(result)
				let _this = this;
				_this.zoom = 15
				_this.initLocation = false;
				_this.$store.dispatch('city', data.addressComponent.city);
				_this.centerIconPoint = {lng: data.point.lng, lat: data.point.lat};
				var geocoder = new BMap.Geocoder();
				geocoder.getLocation(new BMap.Point(data.point.lng, data.point.lat), function(rs) {
					console.log('定位附近的地点',rs.surroundingPois)
					// 后续需要完善，定位后若无具体地址，需要判断选择弄个点
					if (rs.surroundingPois.length > 0) {
						_this.$store.dispatch('setOutset', {title: rs.surroundingPois[0].title, address: rs.surroundingPois[0].address, point: rs.surroundingPois[0].point});
						window.localStorage.setItem('Outset', JSON.stringify(_this.$store.state.outset));
					} else {
						_this.$store.dispatch('setOutset', {title: '当前位置', address: '未知', point: {lng: data.point.lng, lat: data.point.lng}});
						window.localStorage.setItem('Outset', JSON.stringify({title: '当前位置', address: '未知', point: {lng: data.point.lng, lat: data.point.lng}}));
					}
				})
			},
			getLocationError () {
				alert("获取位置失败，请重试！")
			},

			// 用来订阅司机
			findOnlineCar () {
				// 变量
				let _this = this
				let token = window.localStorage.getItem('Token');

				// 创建连接
				_this.stompClient.connect(
					// headers
					{'Auth-Token': token},
					// 连接成功的回调函数
					function connectCallback (frame) {
						// 需要将订阅的对象传给一个变量，否则取消订阅时会找不到订阅id
						_this.listenCarSubscription = _this.stompClient.subscribe('/topic/hailingService/car/uploadCarLocation', function (carLocation) {
							console.log('附近车辆返回信息',JSON.parse(carLocation.body));
							_this.carLists.push(carLocation.body)
						})
					},
					// 连接失败的回调函数
					function errorCallback (error) {
						console.log('连接失败回调',error);
					}
				)
			},
			// 取消订阅
			closeSubscribe () {
				let _this = this
				if (_this.listenCarSubscription != null) {
					_this.listenCarSubscription.unsubscribe();
				}
			},
			// 关闭连接
			disconnect () {
				let _this = this
				_this.stompClient.disconnect()
			},
			// 地图移动开始时触发此事件
			movestart ({type, target}) {
				let _this = this;
				_this.$store.dispatch('setOutset', '正在获取上车地点…');
			},
			// 地图移动结束时触发此事件
			moveend ({type, target}) {
				let _this = this;
				let rs = this.$route.params.searchStatus;	// 判断是否从搜索地点返回
				
				let lng_t = _this.map.getCenter().lng;
				let lat_t = _this.map.getCenter().lat;
				_this.centerIconPoint = {lng: lng_t, lat: lat_t}
				let geocoder = new _this.BMap.Geocoder();
				geocoder.getLocation(new _this.BMap.Point(lng_t, lat_t), function(rs) {
					if (rs.surroundingPois.length > 0) {
						_this.$store.dispatch('setOutset', {title: rs.surroundingPois[0].title, address: rs.surroundingPois[0].address, point: rs.surroundingPois[0].point});
						window.localStorage.setItem('Outset', JSON.stringify(_this.$store.state.outset));
					} else {
						// let lc = {title: '当前位置', address: '未知', point: {lng: lng_t, lat: lat_t}};
						_this.$store.dispatch('setOutset', {title: '当前位置', address: '未知', point: {lng: lng_t, lat: lat_t}});
						window.localStorage.setItem('Outset', JSON.stringify({title: '当前位置', address: '未知', point: {lng: lng_t, lat: lat_t}}))
					}
				})
			
			},
		},
		destroyed () {
			this.closeSubscribe();
			this.disconnect();
		}
	}
</script>


<style>
	/* 地图容器必须设置宽和高属性 */
	.map {
		width: 100%;
		height: 300px;
	}
</style>