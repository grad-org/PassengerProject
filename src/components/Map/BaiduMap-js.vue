<template>
	<div id="allMap" >
		<!-- 没有设置 center 和 zoom 属性的地图组件是不进行地图渲染的 -->
		<!-- <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true">
			<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" ></bm-geolocation>
		</baidu-map> -->
	</div>
</template>

<script>

import BMap from 'BMap';

export default {
	name: 'baiduMap',
	data () {
		return {
			initPoint: {lng: 113.271431, lat: 23.135336},
			currentPoint: {lng: '', lat: ''}
		}
	},
	methods: {
		initMap: function() {
			var map = new BMap.Map('allMap');
			map.enableScrollWheelZoom(true);	//开启鼠标滚轮缩放
			var point = new BMap.Point(this.initPoint.lng, this.initPoint.lat);
			map.centerAndZoom(point, 15);
			map.addControl(new BMap.GeolocationControl);
			// var marker = new BMap.Marker(point);	// 创建标注
			// map.addOverlay(marker);					// 将标注添加到地图中
			console.log("初始化地图成功");

			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition( function(r) {
				if (r.point) {
					console.log(r);
					let mk = new BMap.Marker(r.point);
					map.addOverlay(mk);
					map.panTo(r.point);
					map.centerAndZoom(r.point, 12)
					this.currentPoint.lng = r.longitude;
					this.currentPoint.lat = r.latitude;
				}
			}, {enableHighAcceuracy: true})
		}
	},
	created() {

	},
	mounted () {
		this.initMap();
	},
	// beforeUpdate () {
	// 	this.getCurrentLocation();
	// },
}
</script>

<style>
	#allMap {
		width: 100%;
		height: 300px;
	}
</style>