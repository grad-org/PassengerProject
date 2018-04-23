<template>
	<!-- ready是组件加载完之后才能执行的代码 -->
	<baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" @load="loadding" :scroll-wheel-zoom="true"
		:mapStyle="{styleJson: styleJson}">
		<!-- 其中bm-geolocation中的locationIcon属性要加上“:”，否则会报错！ -->
		<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false" :autoLocation="false"
			:locationIcon="{url: require('../../svg/location.svg'), size: {width: 18, height: 18}}" 
			@locationSuccess="getLoctionSuccess" @locationError="getLocationError">
		</bm-geolocation>
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
			handler (data) {
				
			},
			loadding () {
				// console.log("load组件加载时执行的抽象方法")
			},
			getLoctionSuccess (data) {
				console.log('定位信息返回',data)
				this.zoom = 15
				this.$store.dispatch('city', data.addressComponent.city)
				var geocoder = new BMap.Geocoder();
				geocoder.getLocation(new BMap.Point(data.point.lng, data.point.lat), function(rs) {
					var lbs_point = '';
					var address = '';
					if (rs.surroundingPois.length > 0) {
						lbs_point = rs.surroundingPois[0].point.lng+","+rs.surroundingPois[0].point.lat;
						address =  rs.surroundingPois[0].title;
					} else {
						lbs_point = rs.point.lng+","+rs.point.lat;
						address = rs.address;
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