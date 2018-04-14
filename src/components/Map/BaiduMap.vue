<template>
	<!-- ready是组件加载完之后才能执行的代码 -->
	<baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" @load="loadding" 
		:mapStyle="{styleJson: styleJson}">
		<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false" :autoLocation="false"
			@locationSuccess="getLoctionSuccess" @locationError="getLocationError">
		</bm-geolocation>
	</baidu-map>
</template>

<script>

	// import 

	export default {
			
		data () {
			return {
				center: null,
				zoom: 12,
				min_zoom: 5,

				// 自定义主题，顺序：背景、水系、国道、陆地、边界线、建筑物、人造区域、铁路、地铁
				styleJson: [
					{
						"featureType": "background",
						"elementType": "all",
						"stylers": {
								"color": "#eef1f5ff",
								// "weight": "0.1",
								"visibility": "on"
						}
					},
					{
						"featureType": "water",
						"elementType": "geometry.fill",
						"stylers": {
								"color": "#c2def4ff",
						}
					},
					{
						"featureType": "green",
						"elementType": "geometry.fill",
						"stylers": {
								"color": "#dcefe8ff",
								"visibility": "on"
						}
					},
					// {
					// 	"featureType": "highway",
					// 	"elementType": "geometry.stroke",
					// 	"stylers": {
					// 			"color": "#ffd966ff",
					// 			"weight": "0.2",
					// 			"visibility": "on"
					// 	}
					// },
					// {
					// 	"featureType": "highway",
					// 	"elementType": "geometry.fill",
					// 	"stylers": {
					// 			"color": "#fff2ccff",
					// 			"weight": "1.3",
					// 			"visibility": "on"
					// 	}
					// },
					{
						"featureType": "boundary",
						"elementType": "all",
						"stylers": {
								"hue": "#c05965",
								"weight": "0.1",
								"visibility": "on"
						}
					},
					{
						"featureType": "building",
						"elementType": "all",
						"stylers": {
								"visibility": "off"
						}
					},
					{
						"featureType": "manmade",
						"elementType": "all",
						"stylers": {
								"visibility": "off"
						}
					},
					// {
					// 	"featureType": "railway",
					// 	"elementType": "all",
					// 	"stylers": {
					// 			"weight": "0.3",
					// 			"visibility": "on"
					// 	}
					// },
					{
						"featureType": "subway",
						"elementType": "all",
						"stylers": {
								"weight": "0.1",
								"visibility": "on"
						}
					}
				]
			}
		},
		created () {
			this.center = this.$store.state.localCity
		},
		mounted () {
			// this.lng = 113.271431
			// this.lat = 23.135336	
		},
		methods: {
			handler (data) {
				// console.log(data)
				this.zoom = 15
			},
			loadding () {
				// console.log("load组件加载时执行的抽象方法")
			},
			getLoctionSuccess (data) {
				console.log(data)
				this.$store.commit(this.$types.City, data.addressComponent.city)
				// this.$emit('update', data.addressComponent.city)
			},
			getLocationError () {
				alert("获取位置失败，请重试！")
			}
		}
	}
</script>


<style>
	.map {
	width: 100%;
	height: 300px;
	}
</style>