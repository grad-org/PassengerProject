<template>
		<div ref="selectorDiv" class="container">
			<mu-list-item class="outset" title="捎句话" style="margin-left: -16px" >
				<mu-icon slot="left" value="lens" color="#009688" style="margin-left: 16px; font-size: 18px"/>
			</mu-list-item>
			<mu-divider shallowInset/>
			<mu-list-item title="车费：¥10" style="margin-left: -16px" >
				<mu-icon slot="left" value="lens" color="#ffc107" style="margin-left: 16px; font-size: 18px"/>
			</mu-list-item>
			<mu-divider shallowInset/>
			<mu-list-item  title="呼叫快车" style="margin-left: -16px" @click="havaDone">
				<mu-icon slot="left" value="lens" color="#ffc107" style="margin-left: 16px; font-size: 18px"/>
			</mu-list-item>
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
	import store from '../store'
	Vue.use(DatetimePicker)

	export default {
		data () {
			return {
				disable: false,
				selectorHeight: '',
			}
		},
		created () {
			
		},
		mounted () {
			
		},
		methods: {
			havaDone () {
				// 变量
				let token = window.localStorage.getItem('token');
				let trip = {
					// "departure": {lng: 110.308994, lat: 21.15026},
					"departure": '广东海洋大学',
					"destination": '湖光岩',
					"departureTime": null,
					"tripType": 'REAL_TIME',
					"passengerId": 1
				}

				// 建立连接对象（还没发起连接）
				let socket = new SockJS('http://forcar.vip:8080/orh');
				let stompClient = Stomp.over(socket);

				// 创建连接
				stompClient.connect(
					// headers
					{'Auth-Token': token},
					// 连接成功的回调函数
					function connectCallback (frame) {
						console.log('已连接【' + frame + '】');
					},
					// 连接失败的回调函数
					function errorCallback (error) {
						console.log(error);
						console.log('失败回调',error);
					}
				)
				
				// 发布行程：client.send(destination url[, headers[, body]]);
				// stompClient.send('/api/hailingService/trip/publishTrip', {}, JSON.stringify(trip))
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
		margin: 12px;
	}·
	* {
		z-index: 2;
	}
	.mu-divider {
		margin: 0 
	}
	.destination {
		/* color: #ffc107; 只能改变按下时的背景颜色 */
		display: inline-block;
		width: 65%;
	}
	.picker-container{
		width: 256px;
	}
	.active {
		color: rgb(0, 0, 0);
		border: rgb(33, 150, 243) solid 0.5px;
		/* 2196f3 */
		border-radius: 16px;
	}
	.timeStyle button {
		margin: 6px 12px;
		padding: 4px 16px;
		color: rgb(70, 70, 70);
		/* border: rgb(230, 230, 230) solid 0.5px;
		border-radius: 16px; */
		background-color: #fff
	}
</style>
