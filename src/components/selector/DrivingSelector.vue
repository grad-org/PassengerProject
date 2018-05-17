<template>
		<div ref="selectorDiv" class="container">
			<div style="padding: 18px 0 15px 0; text-align: center; font-size: 14px;">
				<img :src="carIcon" width="84px"/>
				<div style="margin-top: 6px">
					<span class="span1">{{fareTips}}</span>
				</div>
			</div>
			<div style="text-align: center">
				<mu-raised-button label="支付车费" class="raised-button" :backgroundColor="backgroundColor" :rippleOpacity="rippleOpacity" @click="payButton"/>
			</div>
			<!-- <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet" style="height: 300px">
				<div v-html="rawHtml"></div>
				<form>
					<input type="text" value="" v-model="amount1" placeholder="车费">
					<input type="text" value="" v-model="id1" placeholder="订单号">
					<button @click="submitForm($event)">提交</button>
				</form>
			</mu-bottom-sheet> -->
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
	import { Toast } from 'vant'
	import car from '../../svg/car.svg'
	import SockJS from '../../../static/utils/sockjs.js'
	import Stomp from 'stompjs'

	export default {
		data () {
			return {
				disable: false,
				bottomSheet: false,		// 控制弹出，是否可见
				rawHtml: null,
				amount1: null,
				id1: null,

				// localStorage信息
				carIcon: car,
				// 按钮样式
				backgroundColor: '#4a4d5b',	// 按钮波纹效果的颜色
				rippleOpacity: 0.1,		// 按钮波纹效果的透明度
				// predictMileage: null,	// 本次行程预估里程
				// predictDuration: null,	// 本次行程预估时长
				
				stompClient: null,
				listenOrderSubscription: null,

				ls_processingtrip: null,
				fareTips: '车费计算中...'
			}
		},
		computed: {
			
		},
		created () {
			let _this = this;
			this.ls_processingtrip = JSON.parse(window.localStorage.getItem('ProcessingTrip'));
			// 根据订单状态判断，解决页面刷新的问题
		if (this.ls_processingtrip.orderStatus == 'PROCESSING_COMPLETED') {
			this.fareTips = '请支付车费：' + this.ls_processingtrip.totalCost + '元';
		} else {
			let token = window.localStorage.getItem('Token');
			let socket = new SockJS(this.$serverUrl + '/orh');
			_this.stompClient = Stomp.over(socket);
			// 创建连接
			_this.stompClient.connect(
				// headers
				{
					'Auth-Token': token,
				},
				// 连接成功的回调函数
				function connectCallback (frame) {
					// 订阅司机到达通知
					_this.listenOrderSubscription = _this.stompClient.subscribe('/user/queue/hailingService/tripOrder/acceptance-notification', function (trip) {
						console.log(trip);
						let body = JSON.parse(trip.body);
						window.localStorage.setItem('ProcessingTrip', JSON.stringify(body.data));
						if (body.message == 'confirmArrival') {
							// 计算车费
							let d1 = body.data;
							console.log(d1)
							_this.fareTips = '本次车费为' + d1.totalCost + '元 >'
							// 暂时未做支付功能，先提示然后跳转到首页
							const toast1 = Toast.loading({
								duration: 0,
								forbidClick: true,
								message: '已到达'
							});
							let second = 2;
							const time1 = setInterval(() => {
								second--;
								console.log(second);
								if (second) {
									toast1.message = '返回首页...';
								} else {
									clearInterval(time1);
									Toast.clear();
									this.$router.push({name: 'Home'})
								}
							}, 1000);
						}
					})	
				},
				// 连接失败的回调函数
				function errorCallback (error) {
					console.log(error);
					console.log('失败回调',error);
				}
			)
		};
		},
		mounted () {

		},
		methods: {
			payButton () {
				this.amount1 = this.ls_processingtrip.totalCost;
				this.id1 = this.ls_processingtrip.tripOrderId;
				this.$axios.post('/api/payment/alipay/pay',
				{
					tripOrderId: this.ls_processingtrip.tripOrderId,
					totalAmount: this.ls_processingtrip.totalCost
				}
				// {
				// 	headers: {
				// 		'Content-Type': 'multipart/form-data'
				// 	}
				// }
				).then((response) => {
					console.log(response);
					console.log(response.data);
					// this.bottomSheet = true;
					// this.rawHtml = response.data;
				}).catch((error) => {
					console.log(error);
					// if (error.status == 400) {
					// 	alert(error.data.message)
					// 	// this.$router.push({name: 'Home'});	// 调试用
					// }
				})
			},
			// closeBottomSheet () {
			// 	this.bottomSheet = false
			// },
			// submitForm (event) {
			// 	event.preventDefault();
			// 	let formData = new FormData();
			// 	formData.append('tripOrderId', 8);
			// 	formData.append('totalAmount', 110.25);
			// 	console.log(formData);
			// 	window.localStorage.setItem('formData', JSON.stringify(formData))
			// 	let config = {
			// 		headers: {
			// 			'Content-Type': 'multipart/form-data'
			// 		}
			// 	}
			// 	this.$axios.post('/api/payment/alipay/pay', formData, config).then((response) => {
			// 		console.log(response);
			// 		console.log(response.data);
			// 		// this.bottomSheet = true;
			// 		// this.rawHtml = response.data;
			// 	}).catch((error) => {
			// 		console.log(error);
			// 		if (error.status == 400) {
			// 			alert(error.data.message)
			// 			// this.$router.push({name: 'Home'});	// 调试用
			// 		}
			// 	})
			// }
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
		background: #fff
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
