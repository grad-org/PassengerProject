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
		</div>
</template>

<script>

	/**
	 * 支付宝链接嵌入参考：https://segmentfault.com/q/1010000010377953/a-1020000010379509
	 */
	import Vue from 'vue'
	import { Toast } from 'vant'
	import car from '../../svg/car.svg'
	import SockJS from '../../../static/utils/sockjs.js'
	import Stomp from 'stompjs'

	export default {
		data () {
			return {
				disable: false,
				amount1: null,
				id1: null,

				// localStorage信息
				carIcon: car,
				// 按钮样式
				backgroundColor: '#4a4d5b',	// 按钮波纹效果的颜色
				rippleOpacity: 0.1,		// 按钮波纹效果的透明度
				// predictMileage: null,	// 本次行程预估里程
				// predictDuration: null,	// 本次行程预估时长

				ls_processingtrip: null,
				fareTips: '车费计算中...'
			}
		},
		computed: {
			
		},
		created () {
			
		},
		mounted () {
			let _this = this;
			this.ls_processingtrip = JSON.parse(window.localStorage.getItem('ProcessingTrip'));
			// 根据订单状态判断，解决页面刷新的问题
			if (this.ls_processingtrip.orderStatus == 'PROCESSING_COMPLETED') {
				this.fareTips = '请支付车费：' + this.ls_processingtrip.totalCost + '元';
				this.amount1 = this.ls_processingtrip.totalCost;
				this.id1 = this.ls_processingtrip.tripOrderId;
			} else {
				_this.$socket.on('confirmArrival', function (tripOrder) {
					console.log('有监听到？？？？？？');
					console.log('监听返回的tripOrder：', tripOrder);
					window.localStorage.setItem('ProcessingTrip', JSON.stringify(tripOrder));
					// 计算车费
					_this.fareTips = '本次车费为' + tripOrder.totalCost + '元 >';
					// 支付所需提供的参数
					_this.amount1 = tripOrder.totalCost;
					_this.id1 = tripOrder.tripOrderId;
					// 取消监听整个行车过程
					
					// 暂时未做支付功能，先提示然后跳转到首页
					// const toast1 = Toast.loading({
					// 	duration: 0,
					// 	forbidClick: true,
					// 	message: '已到达'
					// });
					// let second = 2;
					// const time1 = setInterval(() => {
					// 	second--;
					// 	if (second) {
					// 		toast1.message = '返回首页...';
					// 	} else {
					// 		clearInterval(time1);
					// 		Toast.clear();
					// 		// this.$router.push({name: 'Home'})
					// 	}
					// }, 1000);
				});
			};
		},
		methods: {
			payButton () {
				if (this.amount1 == '' || this.amount1 == null) {
					Toast('需等待车主确认到达！')
				} else {
					this.$axios.post('/api/payment/alipay/pay',
					{
						tripOrderId: this.id1,
						totalAmount: this.amount1
					}
					).then((response) => {
						console.log(response);
						console.log(response.data);
						window.localStorage.removeItem('ProcessingTrip');
						const div = document.createElement('div');	// 创建div
						div.innerHTML = response.data;				// 将返回的form 放入div
						document.body.appendChild(div);
						document.forms[0].submit();
					}).catch((error) => {
						console.log(error);
						// if (error.status == 400) {
						// 	alert(error.data.message)
						// 	// this.$router.push({name: 'Home'});	// 调试用
						// }
					})
				}
			}
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
