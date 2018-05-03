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
		<bm-marker :position="outsetPoint" 
			:icon="{url: require('../../svg/outset.svg'), size: {width: 20, height: 31}}" :offset="{width: 0, height: -14}">
		</bm-marker>
		<bm-marker :position="destinationPoint" 
			:icon="{url: require('../../svg/destination.svg'), size: {width: 20, height: 31}}" :offset="{width: 0, height: -14}">
		</bm-marker>
	</baidu-map>
	
</template>

<script>

	import MapStyle from './js/map-style.js'

	export default {
		data () {
			return {
				center: null,
				zoom: 12,
				styleJson: null,
				outsetPoint: {lng: 0, lat: 0},
				destinationPoint: {lng: 0, lat: 0},

				map: null,	// 指定map对象
				BMap: null,	// 指定BMap对象
				autoLocationPoint: {lng: 0, lat: 0},
				initLocation: false,
				ls_triping: null,
			}
		},
		created () {
			this.styleJson = MapStyle.style();
			this.ls_triping = JSON.parse(window.localStorage.getItem('T1'))
			this.center = this.ls_triping.departureLocation;
			this.outsetPoint = this.ls_triping.departureLocation;
			this.destinationPoint = this.ls_triping.destinationLocation;
		},
		mounted () {
			
		},
		methods: {
			handler ({BMap, map}) {
				let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
				let _map = map;
				_this.map = map;	// 创建map对象，然后赋给map属性，以方便在别的方法使用，下同
				_this.BMap = BMap;
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					_this.center = {lng: parseFloat(r.longitude), lat: parseFloat(r.latitude)};		// 设置center属性值
					_this.autoLocationPoint = {lng: parseFloat(r.longitude), lat: parseFloat(r.latitude)};		// 自定义覆盖物
					_this.initLocation = true;
					// _this.$store.dispatch('city', r.address.city);
				}, {enableHighAccuracy: true})
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
</style>