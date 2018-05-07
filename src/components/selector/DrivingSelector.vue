<template>
		<div ref="selectorDiv" class="container">
			<div style="padding: 18px 0 15px 0; text-align: center; font-size: 14px;">
				<img :src="carIcon" width="84px"/>
				<div style="margin-top: 6px">
					<span class="span1">车费计费中...</span>
				</div>
			</div>
			<div style="text-align: center">
				<mu-raised-button label="Button" class="raised-button" :backgroundColor="backgroundColor" :rippleOpacity="rippleOpacity" @click="clickButton"/>
			</div>
		</div>
</template>

<script>

	// 基于spring websocket+sockjs实现的长连接请求
	// 参考：https://blog.csdn.net/hzzhoushaoyu/article/details/49407835
	// 客户端接收服务端消息推送sockjs-client的使用
	// 参考：https://blog.csdn.net/nongshuqiner/article/details/78792079
	// Stomp Over Websocket文档
	// https://segmentfault.com/a/1190000006617344#articleHeader13

	import Vue from 'vue'
	import { DatetimePicker } from 'vant';
	import car from '../../svg/car.svg'
	import SockJS from '../../../static/utils/sockjs.js'
	import Stomp from 'stompjs'

	Vue.use(DatetimePicker)

	export default {
		data () {
			return {
				disable: false,

				// localStorage信息
				
				carIcon: car,

				backgroundColor: '#4a4d5b',	// 按钮波纹效果的颜色
				rippleOpacity: 0.1,		// 按钮波纹效果的透明度

				

				
				// predictMileage: null,	// 本次行程预估里程
				// predictDuration: null,	// 本次行程预估时长
			}
		},
		created () {

			
		},
		mounted () {

		},
		methods: {
			clickButton () {
				
			},
			
			
		},
		computed: {
			
		},
		destroyed () {
			
		}
	}
</script>

<style scoped>
	.container{
		/* display: flex; */
		flex-wrap: wrap;
		margin: 0 auto;
	}
	.demo-flat-button {
		padding: 24px;
		width: 100%
	}
	.raised-button {
		margin: 6px 0 12px 0;
		width: 72%;
	}·
	* {
		z-index: 2;
	}
	.mu-divider {
		margin: 0 
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
	.span1 {
		display: inline-block;
		font-size: 14px;
		color: #757575
	}
</style>
