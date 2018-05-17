<template>
	<!-- ready是组件加载完之后才能执行的代码 -->
	<baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" @load="loadding" :scroll-wheel-zoom="true" :inertial-dragging="true" :max-zoom="16"
		@moveend="moveend"
		@movestart="movestart"
		@zoomend="zoomend"
		:mapStyle="{styleJson: styleJson}">
		<!-- :mapStyle="mapStyle"> -->
		<!-- 其中bm-geolocation中的locationIcon属性要加上“:”，否则会报错！ -->
		<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false" :autoLocation="false"
			:locationIcon="{url: require('../../svg/location.svg'), size: {width: 18, height: 18}}" 
			@locationSuccess="getLoctionSuccess" @locationError="getLocationError">
		</bm-geolocation>
		<!-- 自动定位覆盖物 -->
		<bm-marker :position="autoLocationPoint"
			:icon="{url: require('../../svg/location.svg'), size: {width: 18, height: 18}}" v-if="initLocation">
		</bm-marker>
		<!-- <bm-marker :position="enableSelectPoint"
			:icon="{url: require('../../svg/enableselect.svg'), size: {width: 14, height: 14}}">
			<my-label :position="{lng: 110.307236, lat: 21.157355}" :text="selectAddress" :active="active"
				@mouseover.native="active = true" @mouseleave.native="active = false">
			</my-label>
		</bm-marker> -->
		<bm-marker :position="centerIconPoint" 
			:icon="{url: require('../../svg/centericon.svg'), size: {width: 20, height: 31}}"
			:offset="{width: 0, height: -14}">
		</bm-marker>

		<!-- 路书测试 -->
		<!-- 参考：https://github.com/Dafrok/vue-baidu-map/issues/174 -->
		<bml-lushu
			v-for="(item, index) in list"
			:key="index"
			:path="item.path"
			:rotation="true"
			:content="item.content"
			:infoWindow="true"
			:speed="100"
			:icon="icon"
			:play="true">
		</bml-lushu>
	</baidu-map>
	
</template>

<script>
	/**
	 * 需要完善：定位后选起点的问题！
	 * 安装stompjs: https://www.cnblogs.com/liemei/p/7064386.html
	 */
	import MapStyle from './js/map-style.js'
	import Handler from './js/handler.js'
	import MyLabel from './overlay/Label.vue'
	import SockJS from '../../../static/utils/sockjs.js'
	// import Stomp from '../../../static/utils/stomp.js'
	import Stomp from 'stompjs'
	import {BmlLushu} from 'vue-baidu-map'

	export default {
		components: {
			MyLabel, BmlLushu
		},
		data () {
			return {
				center: this.$store.state.currentCity,
				zoom: 16,
				styleJson: MapStyle.style(),
				// mapStyle: {
				// 	styleJson: [
				// 		{
				// 			"featureType": "all",
				// 			"elementType": "geometry",
				// 			"stylers": {
				// 				"hue": "#007fff",
				// 				"saturation": 89
				// 			}
				// 		},
				// 		{
				// 			"featureType": "water",
				// 			"elementType": "all",
				// 			"stylers": {
				// 				"color": "#ffffff"
				// 			}
				// 		}
				// 	]
				// },
				list: [
					{
						path: [
							{lng: 110.30926, lat: 21.15172},
							{lng: 110.303442, lat: 21.151441}
						]
					},
					{
						path: [
							{lng: 110.365067, lat: 21.257463},
							{lng: 110.361648, lat: 21.252284}
						]
					},
					{
						path: [
							{lng: 110.363444, lat: 21.260705},
							{lng: 110.376604, lat: 21.259686}
						]
					},
					{
						path: [
							{lng: 116.405, lat: 39.920},
							{lng: 116.423493, lat: 39.907445}
						]
					},
				],
				icon: {
					// url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
					url: require('../../svg/carmoving.svg'),
					size: {width: 42, height: 22},
					opts: {anchor: {width: 21, height:11}}
				},
				enableSelectPoint: {lng: 110.307236, lat: 21.157355},
				active: false,
				selectAddress: '广东海洋大学',

				// 建立连接用
				stompClient: Stomp.over(new SockJS(this.$serverUrl + '/orh')),
				listenCarSubscription: null,

				map: null,	// 指定map对象
				BMap: null,	// 指定BMap对象
				autoLocationPoint: {lng: 0, lat: 0},
				centerIconPoint: {lng: 0, lat: 0},
				initLocation: false,

				carLists: [],
			}
		},
		// watch: {
		// 	stompStatus (newVal, oldVal) {
		// 		console.log('执行了侦听器')
		// 		this.findOnlineCar();
		// 	}
		// },
		created () {

		},
		mounted () {
			// 发现附近已上线的司机
			this.findOnlineCar();
			// console.log('执行了mounted')
		},
		methods: {
			handler ({BMap, map}) {
				let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
				_this.map = map;	// 创建map对象，然后赋给map属性，以方便在别的方法使用，下同
				_this.BMap = BMap;
				// _this.findOnlineCar();
				let rs = this.$route.params.selectStatus;	// 当选择城市，返回首页是不进行定位
				let rs1 = this.$route.params.searchStatus;	// 判断是否从搜索地点返回
				console.log('两个判断值：', rs, rs1)
				console.log('判断结果',rs == undefined && rs1 == undefined);

				// 参数分别是BMap、map、城市选择判断、搜索地点判断、
				// let obj = Handler.handle(BMap, map, rs, rs1);
				// console.log('obj返回', obj)

				if (rs == undefined && rs1 == undefined) {
					var geolocation = new BMap.Geolocation();
					geolocation.getCurrentPosition(function(result) {
						let rs_lng = parseFloat(result.longitude);
						let rs_lat = parseFloat(result.latitude);
						_this.center = {lng: rs_lng, lat: rs_lat};		// 设置center属性值
						_this.autoLocationPoint = {lng: rs_lng, lat: rs_lat};		// 自定义覆盖物
						_this.centerIconPoint = {lng: rs_lng, lat: rs_lat};		// 地图中心覆盖物
						
						// 上车点
						// jsonp跨域参考：https://www.cnblogs.com/rapale/p/7839203.html
						// _this.$jsonp('http://api.map.baidu.com/parking/search?location=110.36506726,21.2574631&coordtype=bd09ll&ak=fZjHntKQ477LNrWlWsjEQKH3ZeVnKySz')
						// _this.$jsonp('http://api.map.baidu.com/parking/search?location='+ rs_lng +',' + rs_lat + '&coordtype=bd09ll&ak=fZjHntKQ477LNrWlWsjEQKH3ZeVnKySz')
						// .then((response) => {
						// 	console.log('推荐上车点成功返回：', response);
						// 	console.log('推荐上车点个数：', response.recommendStops.length);
						// }).catch((error) => {
						// 	console.log('推荐上车点失败返回', error);
						// })
						
						_this.initLocation = true;
						_this.$store.dispatch('city', result.address.city);

						// 当定位完成，进行搜索附近位置，如果放在getCurrentPosition外面是不可以的，因为只是异步操作。
						let geocoder = new BMap.Geocoder();
						geocoder.getLocation(new BMap.Point(_this.center.lng, _this.center.lat), function(rs) {
							if (rs.surroundingPois.length > 0) {
								_this.$store.dispatch('setOutset', {title: rs.surroundingPois[0].title, address: rs.surroundingPois[0].address, point: rs.surroundingPois[0].point});
								window.localStorage.setItem('Outset', JSON.stringify(_this.$store.state.outset));
							} else {
								
							}
							// clearTimeout(timer)		// 清除定时器
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
						setTimeout(function() {
							map.panTo(p1);
							_this.centerIconPoint = {lng: tmp1.point.lng, lat: tmp1.point.lat}
						}, 500)
					} else {
						console.log('localstorage中Outset为null');
					}
				}
			},
			loadding () {
				// console.log("load组件加载时执行的抽象方法")
			},
			pickUpPoint (response) {
				console.log('这里这里');
				console.log(response);
			},
			getLoctionSuccess (result) {
				let data = result;
				// console.log(result)
				let _this = this;
				// _this.zoom = 16
				// _this.map.setZoom(16)
				console.log(_this.map.getZoom());
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

				// // 创建连接
				_this.stompClient.connect(
					// headers
					{'Auth-Token': token},
					// 连接成功的回调函数
					function connectCallback (frame) {
						// 需要将订阅的对象传给一个变量，否则取消订阅时会找不到订阅id
						_this.listenCarSubscription = _this.stompClient.subscribe('/topic/hailingService/car/uploadCarLocation', function (carLocation) {
							console.log('监测附近车辆：',JSON.parse(carLocation.body));
							let body = JSON.parse(carLocation.body);
							if (body.message == 'uploadCarLocation') {
								_this.carLists.push(body.data)
							}
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
				if (this.listenCarSubscription != null) {
					this.listenCarSubscription.unsubscribe();
				}
			},
			// 关闭连接
			disconnect () {
				this.stompClient.disconnect()
			},
			// 地图移动开始时触发此事件
			movestart ({type, target}) {
				let _this = this;
				_this.$store.dispatch('setOutset', '正在获取上车地点…');
			},
			// 地图移动结束时触发此事件
			moveend ({type, target}) {
				let _this = this;
				// let rs = this.$route.params.searchStatus;	// 判断是否从搜索地点返回
				
				let lng_t = _this.map.getCenter().lng;
				let lat_t = _this.map.getCenter().lat;
				_this.centerIconPoint = {lng: lng_t, lat: lat_t}
				let geocoder = new _this.BMap.Geocoder();
				geocoder.getLocation(new _this.BMap.Point(lng_t, lat_t), function(result) {
					if (result.surroundingPois.length > 0) {
						_this.$store.dispatch('setOutset', {title: result.surroundingPois[0].title, address: result.surroundingPois[0].address, point: result.surroundingPois[0].point});
						window.localStorage.setItem('Outset', JSON.stringify(_this.$store.state.outset));
					} else {
						// let lc = {title: '当前位置', address: '未知', point: {lng: lng_t, lat: lat_t}};
						_this.$store.dispatch('setOutset', {title: '当前位置', address: '未知', point: {lng: lng_t, lat: lat_t}});
						window.localStorage.setItem('Outset', JSON.stringify({title: '当前位置', address: '未知', point: {lng: lng_t, lat: lat_t}}))
					}
				})
			},
			// 地图更改缩放级别结束时触发触发此事件
			zoomend () {
				let _this = this;
				let map = _this.map;
				console.log('覆盖物数量：', map.getOverlays().length)
				// 获取地图级别
				let val_zoom = map.getZoom();
				console.log('地图级别：', val_zoom);
				if (val_zoom < 12) {
					// map.clearOverlays();
					// map.getOverlays().hide();
				} else {
					// map.getOverlays().show();
				}
			}
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