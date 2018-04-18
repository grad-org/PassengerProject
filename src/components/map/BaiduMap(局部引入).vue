<template>
	<div id="map" >
		
	</div>
</template>

<script>
	/**
	* 去掉百度地图LOGO参考：http://www.jb51.net/article/41787.htm
	* 创建icon：https://blog.csdn.net/qq_38903950/article/details/78022174?locationNum=7&fps=1
	*/
	import BMap from 'BMap';

	export default {
		data () {
			return {
				initPoint: {lng: 113.262232, lat: 23.154345},
				// currentPoint: {lng: '', lat: ''}
			}
		},
		methods: {
			initMap () {
					var map = new BMap.Map('map');
					var point = new BMap.Point(this.initPoint.lng, this.initPoint.lat);
					map.centerAndZoom(point, 15);
					map.enableScrollWheelZoom(true);	//开启鼠标滚轮缩放
					// var geolocationControl = new BMap.GeolocationControl();
					// geolocationControl.addEventListener('locationSuccess', function(e) {
					// 	console.log('定位成功');
					// });
					// geolocationControl.addEventListener('locationError', function() {
					// 	console.log('定位失败');
					// });
					// map.addControl(geolocationControl);
			
				
			}
		},
		created() {

		},
		mounted () {
			let _this = this;
			BaiduMap.init().then((BMap) => {
				console.log(BMap);
				console.log('加载到页面')
			this.initMap()
			})
		}
	}
</script>

<style>
	#allMap {
		width: 100%;
		height: 300px;
	}
	.anchorBL{ 
		display:none; 
	} 
</style>