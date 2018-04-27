<template>
	<!-- ready是组件加载完之后才能执行的代码 -->
	<baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" @load="loadding" :scroll-wheel-zoom="true"
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
			<!-- <bm-label content="广东海洋大学" :labelStyle="{color: '#00bcd4', fontSize : '12px'}" :offset="{width: 15, height: 0}"/> -->
			<my-label :position="{lng: 110.307236, lat: 21.157355}" :text="selectAddress" :active="active"
				@mouseover.native="active = true" @mouseleave.native="active = false">
			</my-label>
		</bm-marker>
		<bm-marker :position="outsetPoint" 
			:icon="{url: require('../../svg/outset.svg'), size: {width: 20, height: 20}}">
			<!-- <my-label :position="outsetPoint" text="起点" ></my-label> -->
		</bm-marker>
		<bm-marker :position="destinationPoint" 
			:icon="{url: require('../../svg/destination.svg'), size: {width: 20, height: 20}}">
			<!-- <my-label :position="outsetPoint" text="终点" ></my-label> -->
		</bm-marker>
	</baidu-map>
	
</template>

<script>

	import MapStyle from './js/map-style.js'
	import MyLabel from './overlay/Label.vue'

	export default {
		components: {
			MyLabel
		},
		data () {
			return {
				center: null,
				zoom: 15,
				styleJson: null,
				enableSelectPoint: {lng: 110.307236, lat: 21.157355},
				active: false,
				selectAddress: '广东海洋大学',

				// 调试用，海大餐厅 => 湖光镇派出所
				outsetPoint: {lng: 110.308994, lat: 21.15026},
				destinationPoint: {lng: 110.318268, lat: 21.12831},

				// 建立连接用
				stompClient: null,

				autoLocationPoint: {lng: 0, lat: 0},
				initLocation: false,
			}
		},
		created () {
			this.center = this.$store.state.currentCity
			this.styleJson = MapStyle.style();
		},
		mounted () {
			this.getCarLocation();
		},
		methods: {
			handler ({BMap, map}) {
				console.log('BMap',BMap);
				console.log('map',map);
				let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
				let rs = this.$route.params.selectStatus;	// 当选择城市，返回首页是不进行定位
				let rs1 = this.$route.params.searchStatus;	// 当用户搜索起点或终点时，不对其自动获取当前位置
				if (!rs && !rs1) {
					var geolocation = new BMap.Geolocation();
					geolocation.getCurrentPosition(function(r) {
						_this.center = {lng: parseFloat(r.longitude), lat: parseFloat(r.latitude)};		// 设置center属性值
						_this.autoLocationPoint = {lng: parseFloat(r.longitude), lat: parseFloat(r.latitude)};		// 自定义覆盖物
						_this.initLocation = true;
						_this.$store.dispatch('city', r.address.city);

						// 当定位完成，进行搜索附近位置，如果放在getCurrentPosition外面是不可以的，因为只是异步操作。
						var geocoder = new BMap.Geocoder();
						geocoder.getLocation(new BMap.Point(_this.center.lng, _this.center.lat), function(rs) {
							if (rs.surroundingPois.length > 0) {
								_this.$store.dispatch('setOutset', {title: rs.surroundingPois[0].title, address: rs.surroundingPois[0].address, point: rs.surroundingPois[0].point});
								window.localStorage.setItem('Outset', JSON.stringify(_this.$store.state.outset));
							} else {
								
							}
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
						_this.center = {lng: tmp1.point.lng, lat: tmp1.point.lat};
						// _this.center = {lng: 110.396533, lat: 21.197716};
						let p1 = new BMap.Point(tmp1.point.lng, tmp1.point.lat)
						console.log(p1);
						map.centerAndZoom(p1, 8)
						console.log('bbbbbbbb');
					} else {
						console.log('aaaaaa');
					}
				} 
			},
			loadding () {
				// console.log("load组件加载时执行的抽象方法")
			},
			getLoctionSuccess (result) {
				let data = null;
				console.log(result)
				if (typeof result === 'string') {
					data = JSON.parse(result)
				} else {
					data = result
				}
				let _this = this;
				_this.zoom = 15
				_this.initLocation = false;
				_this.$store.dispatch('city', data.addressComponent.city)
				var geocoder = new BMap.Geocoder();
				geocoder.getLocation(new BMap.Point(data.point.lng, data.point.lat), function(rs) {
					var lbs_point = '';
					var address = '';
					if (rs.surroundingPois.length > 0) {
						_this.$store.dispatch('setOutset', {title: rs.surroundingPois[0].title, address: rs.surroundingPois[0].address, point: rs.surroundingPois[0].point});
						window.localStorage.setItem('Outset', JSON.stringify(_this.$store.state.outset));
					} else {
						
					}
					console.log('定位附近的地点',rs.surroundingPois)
				})
			},
			getLocationError () {
				alert("获取位置失败，请重试！")
			},

			// 用来订阅司机
			getCarLocation () {
				// 变量
				let _this = this

				// 建立连接对象（还没发起连接）
				let socket = new SockJS('http://forcar.vip:8080/orh');
				_this.stompClient = Stomp.over(socket);

				// 创建连接
				_this.stompClient.connect(
					// headers
					{},
					// 连接成功的回调函数
					function connectCallback (frame) {
						// 需要将订阅的对象传给一个变量，否则取消订阅时会找不到订阅id
						_this.listenOrderSubscription = _this.stompClient.subscribe('/topic/hailingService/car/uploadCarLocation', function (carLocation) {
							console.log('附近车辆返回信息',carLocation.body)
						})
					},
					// 连接失败的回调函数
					function errorCallback (error) {
						console.log(error);
						console.log('失败回调',error);
					}
				)
			}
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