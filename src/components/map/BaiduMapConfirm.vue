<template>
	<!-- ready是组件加载完之后才能执行的代码 -->
	<baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true"
		:mapStyle="{styleJson: styleJson}">
		<!-- 其中bm-geolocation中的locationIcon属性要加上“:”，否则会报错！ -->
		<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false" :autoLocation="false"
			:locationIcon="{url: require('../../svg/location.svg'), size: {width: 18, height: 18}}" 
			@locationSuccess="getLoctionSuccess" @locationError="getLocationError">
		</bm-geolocation>
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
				ls_outset: null,
			}
		},
		created () {
			// this.center = this.$store.state.currentCity
			this.styleJson = MapStyle.style();
			this.ls_outset = JSON.parse(window.localStorage.getItem('Outset'))
			this.ls_destination = JSON.parse(window.localStorage.getItem('Destination'))
			this.center = this.ls_outset.point;
			this.outsetPoint = this.ls_outset.point;
			this.destinationPoint = this.ls_destination.point;
		},
		mounted () {
			
		},
		methods: {
			handler ({BMap, map}) {
				let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
				let _map = map;
				_this.map = map;	// 创建map对象，然后赋给map属性，以方便在别的方法使用，下同
				_this.BMap = BMap;
			},
			getLoctionSuccess (result) {
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