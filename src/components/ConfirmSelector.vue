<template>
		<div ref="selectorDiv" class="container">
			<div style="padding: 10px 0 10px 0; text-align: center; font-size: 14px; color: rgb(177, 177, 177);" v-show="showTimePicker">
				<span style="font-weight: bold">出行时间：{{selectTime}}</span>
			</div>
			<mu-divider shallowInset v-show="showTimePicker"/>
			<div style="padding: 18px 0 15px 0; text-align: center; font-size: 14px;">
				<img :src="carIcon" width="84px"/>
				<div style="margin-top: 6px">
					<span class="span1">{{farePrediction}}</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span class="span1" @click="openBottomSheet">计费规则 ＞</span>
				</div>
			</div>
			<div style="text-align: center">
				<mu-raised-button label="呼叫快车" class="raised-button" :backgroundColor="backgroundColor" :rippleOpacity="rippleOpacity" @click="havaDone"/>
			</div>
			<mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet" @click="openBottomSheet">
				<div style="background: #fff; padding: 16px">
					<span class="span-rule">计费规则</span>
					<span class="span-rule-header">起步范围：</span>
					ーーー起步价：{{initialPrice}} 公里<br>
					ーーー起步里程：{{initialMileage}} 元
					<hr>
					<span class="span-rule-header">超出起步范围，按照计价规则收取：</span>
					ーーー总费用 = 起步价 + 里程费 + 时长费<br>
					ーーー里程费：{{unitPricePerKilometer}} 元/公里<br>
					ーーー时长费：{{unitPricePerMinute}} 元/分钟
					<hr>
					<span class="span-rule-header">关于本次行程：</span>
					ーーー预估里程：{{predictMileage}} 公里<br>
					ーーー预估时长：{{predictDuration}} 分钟
				</div>
			</mu-bottom-sheet>
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
	import car from '../svg/car.svg'
	import SockJS from '../../static/utils/sockjs.js'
	import Stomp from 'stompjs'

	Vue.use(DatetimePicker)

	export default {
		data () {
			return {
				disable: false,
				bottomSheet: false,

				// localStorage信息
				ls_userinfo: null,
				ls_trip_outset: null,
				ls_trip_destination: null,
				selectTime: '',
				showTimePicker: true,
				carIcon: car,

				backgroundColor: '#4a4d5b',	// 按钮波纹效果的颜色
				rippleOpacity: 0.1,		// 按钮波纹效果的透明度

				timer: null,	// 定时器

				// 车费计费规则
				setupTime: null,		// 规则设定时间
				initialPrice: null,		// 起步价
				initialMileage: null,	// 起步里程
				unitPricePerKilometer: null,	// 里程费
				unitPricePerMinute: null,		// 时长费
				// predictMileage: null,	// 本次行程预估里程
				// predictDuration: null,	// 本次行程预估时长
			}
		},
		computed: {
			farePrediction () {
				let store1 = this.$store.state.predictFare;
				if (store1 == null) {
					return '车费预估中...';
				} else {
					return '车费预估：' + store1.totalCost + '元';
				}
			},
			predictMileage () {
				return this.$store.state.predictFare.duration;
			},
			predictDuration () {
				return this.$store.state.predictFare.mileage;
			}
		},
		created () {
			this.ls_userinfo = JSON.parse(window.localStorage.getItem('UserInfo'));
			this.ls_trip_outset = JSON.parse(window.localStorage.getItem('Outset'));
			this.ls_trip_destination = JSON.parse(window.localStorage.getItem('Destination'));
			if (window.localStorage.getItem('TripType') == 'REAL_TIME') {
				this.showTimePicker = false
			} else {
				let ls_rt = window.localStorage.getItem('ReserveTime');
				let date = new Date(ls_rt).toISOString().slice(0, 10);
				let dateTime = new Date(ls_rt).toISOString().slice(11, 16);
				this.isSelectTime = true;
				this.selectTime = date + ' ' + dateTime;
			}
		},
		mounted () {
			// 预估车费
			let _this = this;
			let ls_tripduration = window.localStorage.getItem('TripDuration');
			let ls_tripdistance = window.localStorage.getItem('TripDistance');
			console.log(ls_tripduration);
			console.log(ls_tripdistance);
		},
		methods: {
			havaDone () {
				// 变量
				let _this = this;
				let token = window.localStorage.getItem('Token');
				let userId = 7

				// 发布行程
				// 判断出行方式，进而决定出行时间是否为null
				let dt = null;
				let tmp = window.localStorage.getItem('TripType');
				if (tmp == 'RESERVED') {
					let ls_rt = window.localStorage.getItem('ReserveTime');
					let date = new Date(ls_rt).toISOString().slice(0, 10);
					let dateTime = new Date(ls_rt).toISOString().slice(11, 19);
					dt = date + ' ' + dateTime;
				} else {
					dt = null;
				}
				// 时间格式：yyyy-MM-dd HH:mm:ss
				_this.$axios.post('/api/hailingService/trip/publishTrip', {
					"departure": this.ls_trip_outset.title,
					"departureLocation": {lng: JSON.stringify(this.ls_trip_outset.point.lng), lat: JSON.stringify(this.ls_trip_outset.point.lat)},
					"destination": this.ls_trip_destination.title,
					"destinationLocation": {lng: JSON.stringify(this.ls_trip_destination.point.lng), lat: JSON.stringify(this.ls_trip_destination.point.lat)},
					"departureTime": dt,
					"tripType": window.localStorage.getItem('TripType'),
					"passengerId": _this.ls_userinfo.passengerId
				}).then((response) => {
					// 成功返回
					console.log(response)
					window.localStorage.setItem('TripDetail', JSON.stringify(response.data.data));
					window.localStorage.removeItem('Outset')	// 删除起点
					window.localStorage.removeItem('Destination')	// 删除终点
					_this.$store.dispatch('outset', null);		// 将状态改成null，下同
					_this.$store.dispatch('destination', null);
					_this.$router.push({path: '/trip/waiting', name: 'Waiting', params: {published: true}})
				}).catch((error) => {
					// post失败
					console.log(error)
					alert('出错！')
				})
			},
			closeBottomSheet () {
				this.bottomSheet = false;
			},
			openBottomSheet () {
				this.bottomSheet = true;
				this.$axios.get('/api/fareRule/' + this.$store.state.predictFare.fareRuleId)
				.then((response) => {
					console.log(response);
					this.initialPrice = response.data.data.initialPrice;
					this.initialMileage = response.data.data.initialMileage;
					this.setupTime = response.data.data.selectTime;
					this.unitPricePerKilometer = response.data.data.unitPricePerKilometer;
					this.unitPricePerMinute = response.data.data.unitPricePerMinute;
				})
				.catch((error) => {
					console.log(error)
				})
			}
		},
		destroyed () {
			clearTimeout(this.timer)
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
	.span-rule {
		display: block;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		color: #424242
	}
	.span-rule-header {
		display: block;
		font-size: 15px;
		font-weight: bold;
		color: #616161;
		margin-bottom: 6px;
	}
</style>
