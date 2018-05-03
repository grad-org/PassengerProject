<template>
		<div ref="selectorDiv" class="container">
			<div style="padding: 18px 0 15px 0; text-align: center; font-size: 14px;">
				<img :src="carIcon" width="84px"/>
			</div>
			<div style="text-align: center">
				<mu-raised-button label="联系司机" class="raised-button" :backgroundColor="backgroundColor" :rippleOpacity="rippleOpacity" @click="havaDone"/>
			</div>
		</div>
</template>

<script>

	import car from '../../svg/car.svg'
	import SockJS from '../../../static/utils/sockjs.js'
	import Stomp from 'stompjs'

	export default {
		data () {
			return {
				disable: false,
				carIcon: car,

				backgroundColor: '#4a4d5b',	// 按钮波纹效果的颜色
				rippleOpacity: 0.1			// 按钮波纹效果的透明度
			}
		},
		created () {
			
		},
		mounted () {
			
		},
		methods: {
			havaDone () {
				// 变量
				let _this = this;
			}
		}
	}
</script>

<style scoped>
	.container{
		/* display: flex; */
		flex-wrap: wrap;
		margin: 0 auto;
	}
	.raised-button {
		margin: 6px 0 12px 0;
		width: 72%;
	}
	.call {
		background: #4a4d5b;
		color: #fff;
		width: 100%;
		height: 56px;
		text-align: center;
		line-height: 56px;
		font-size: 15px;
		font-weight: bold;
	}
</style>
