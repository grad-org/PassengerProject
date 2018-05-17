<template>
	<!-- ready是组件加载完之后才能执行的代码 -->
	<baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true"
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
		<!-- 通知控件 -->
		<bm-control style="width: 100%" anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{width: 0, height: 0}"  v-show="seen">
			<van-notice-bar  mode="closeable" :scrollable="true"  background="rgba(0,0,0, 0.4)" color="#fff">
				<!-- 调试用：上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。 -->
				{{noticeContent}}
				<!-- <span style="color: #fff">{{noticeContent}}</span> -->
			</van-notice-bar>
		</bm-control>
		<bm-marker :position="driverPoint"
			:icon="{url: require('../../svg/driverlocation.svg'), size: {width: 18, height: 18}}" v-if="driverLocationSeen">
		</bm-marker>
	</baidu-map>
	
</template>

<script>

	import MapStyle from './js/map-style.js'
	import SockJS from '../../../static/utils/sockjs.js'
	import Stomp from 'stompjs'
	import { NoticeBar } from 'vant'
	import { Toast } from 'vant'

	export default {
		components: {
			[NoticeBar.name]: NoticeBar
		},
		data () {
			return {
				center: null,
				zoom: 12,
				styleJson: null,
				seen: false,			// 通知控件
				noticeContent: null,	// 通知内容
				timer: null,			// 定时器

				map: null,	// 指定map对象
				BMap: null,	// 指定BMap对象
				autoLocationPoint: {lng: 0, lat: 0},
				driverPoint: {lng: 0, lat: 0},
				initLocation: false,		// 自定义定位图标是否可见
				driverLocationSeen: false,	// 司机位置是否可见
				ls_triping: null,

				// 用于创建连接
				stompClient: null,
				listenPickUpSubscription: null,		// 乘客上车
				listenCarLocationSubscription: null,		// 司机位置
			}
		},
		created () {
			let socket = new SockJS(this.$serverUrl + '/orh');
			this.stompClient = Stomp.over(socket);
			this.styleJson = MapStyle.style();
			this.ls_triping = JSON.parse(window.localStorage.getItem('T1'))
			this.center = this.ls_triping.departureLocation;
		},
		mounted () {
			
		},
		destroyed () {
			clearTimeout(this.timer);	// 清除定时器
			this.closeSubscribe();		// 取消订阅
			this.disconnect();			// 关闭连接
		},
		methods: {
			handler ({BMap, map}) {
				let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
				let token = window.localStorage.getItem('Token')
				let _map = map;
				_this.map = map;	// 创建map对象，然后赋给map属性，以方便在别的方法使用，下同
				_this.BMap = BMap;
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					_this.center = {lng: parseFloat(r.longitude), lat: parseFloat(r.latitude)};		// 设置center属性值
					_this.autoLocationPoint = {lng: parseFloat(r.longitude), lat: parseFloat(r.latitude)};		// 自定义覆盖物
					_this.initLocation = true;
					_this.$store.dispatch('city', r.address.city);

					// 订阅司机的位置
					_this.stompClient.connect(
						// headers
						{'Auth-Token': token},
						function connectCallback (frame) {
							console.log('连接成功');
							Toast('连接成功！')
							_this.subscribeCarLocation(BMap, map);	// 订阅司机位置通知
							_this.subscribePickUpPassenger()	// 订阅乘客已上车通知
						},
						function errorCallback (error) {
							console.log('连接失败', error);
							Toast('连接失败！需要重新刷新页面！')
						}
					)


				}, {enableHighAccuracy: true})
			},
			// 订阅确认上车通知
			subscribePickUpPassenger () {
				let _this = this;
				_this.listenPickUpSubscription = _this.stompClient.subscribe('/user/queue/hailingService/tripOrder/acceptance-notification', function(tripOrder) {
					console.log(tripOrder.body);
					let body = JSON.parse(tripOrder.body);
					if (body.message == 'pickUpPassenger') {
						window.localStorage.removeItem('T1');	// 删除上车之前的订单信息，如果乘客上车，订单状态会改变
						window.localStorage.setItem('ProcessingTrip', JSON.stringify(body.data));
						_this.$router.push({name: 'CarDriving'})
					}
				})
			},
			// 订阅司机位置
			subscribeCarLocation (BMap, map) {
				let _this = this;
				this.listenCarLocationSubscription = _this.stompClient.subscribe('/user/queue/hailingService/car/uploadCarLocation', function (carLocation) {
					console.log(carLocation);
					let body = JSON.parse(carLocation.body);
					if (body.message == 'uploadCarLocation') {
						_this.driverPoint.lng = body.data.lng;
						_this.driverPoint.lat = body.data.lat;
						// _this.driverPoint = {lng: body.data.lng, lat: body.data.lat};
						_this.driverLocationSeen = true;
						// map.getDistance(pointA,pointB)	// 测试当前位置和起点的距离
						_this.setDriveRoute(BMap, map);	// 驾车路线
					}
					console.log(_this.driverPoint)
				})
			},
			// 取消订阅
			closeSubscribe () {
				// 关闭乘客上车订阅
				if (this.listenPickUpSubscription != null) {
					this.listenPickUpSubscription.unsubscribe();
				};
				// 关闭司机位置订阅
				if (this.listenCarLocationSubscription != null) {
					this.listenCarLocationSubscription.unsubscribe();
				}
			},
			// 关闭连接
			disconnect () {
				this.stompClient.disconnect();
			},
			// 画驾车路线（司机 → 我的位置）
			setDriveRoute (BMap, map) {
				let _this = this;
				let passengerLocation1 = new BMap.Point(_this.autoLocationPoint.lng, _this.autoLocationPoint.lat);
				let driverLocation1 = new BMap.Point(_this.driverPoint.lng, _this.driverPoint.lat);
				//三种驾车策略：最少时间，最短距离，避开高速，而采用的默认策略是：最少时间
				var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
				// 检索完成后的回调函数
				var searchComplete = function (results) {
					console.log('驾车路线返回', results)
					let plan = results.getPlan(0);
					console.log('里程：', plan.getDistance(false), '米')	// false返回数值，单位米；true返回字符串
					console.log('用时：', plan.getDuration(false), '秒')	// false返回数值，单位秒；true返回字符串
					let distance = (plan.getDistance(false)/1000).toFixed(1);
					let duration = (plan.getDuration(false)/60).toFixed(0);
					// window.localStorage.setItem('TripDistance', distance);
					// window.localStorage.setItem('TripDuration', duration);
					_this.seen = true;		// 通知控件可看
					_this.noticeContent = '车主到达大约需要' + plan.getDuration(true) + '，约' + plan.getDistance(true) + '。请您耐心等待！';
					_this.timer = setTimeout(() => {
						_this.seen = false;
					}, 5000);
				};

				var polylineComplete = function (routes) {
					
				};
				var transit = new BMap.DrivingRoute(
					map,	// 表示检索区域，类型可为地图实例
					{
						renderOptions: {map: map},	// 结果呈现设置，当前地图实例
						policy: routePolicy[0],		// 驾车策略，时间最少
						onSearchComplete: searchComplete,	// 检索完成后的回调函数。参数result
						// onPolylinesSet: polylineComplete,	// 折线添加完成后的回调函数。参数： routes: Array
						onMarkersSet: function(routes) {
							map.removeOverlay(routes[0].marker);	//删除起点
							map.removeOverlay(routes[1].marker);	//删除终点
						}
					}
				);
				transit.search(driverLocation1,passengerLocation1);
			},

			getLoctionSuccess (result) {
				let _this = this;
				_this.initLocation = false;		// 关闭自定义定位图标
				console.log('result');
			},
			getLocationError () {
				alert("获取位置失败，请重试！")
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
	table {
		background: rgba(0, 0, 0, 0.3);
		color:#90cbfc
	}
</style>