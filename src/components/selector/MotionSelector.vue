<template>
		<div ref="selectorDiv" class="container">
			<div style="padding: 18px 0 15px 0; text-align: center; font-size: 14px;">
				<img :src="carIcon" width="84px"/>
				<span style="display: block">车费：xxx元</span>
			</div>
			<div style="text-align: center">
				<mu-raised-button label="呼叫司机" class="raised-button" :backgroundColor="backgroundColor" :rippleOpacity="rippleOpacity" @click="havaDone"/>
			</div>
		</div>
</template>

<script>


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
				ls_userinfo: null,
				ls_trip_outset: null,
				ls_trip_destination: null,
				selectTime: '',
				carIcon: car,

				backgroundColor: '#4a4d5b',	// 按钮波纹效果的颜色
				rippleOpacity: 0.1			// 按钮波纹效果的透明度
			}
		},
		created () {
			this.ls_userinfo = JSON.parse(window.localStorage.getItem('UserInfo'));
			this.ls_trip_outset = JSON.parse(window.localStorage.getItem('Outset'));
			this.ls_trip_destination = JSON.parse(window.localStorage.getItem('Destination'));
			console.log('起点：',this.ls_trip_outset);
			console.log('终点：',this.ls_trip_destination);
				let ls_rt = window.localStorage.getItem('ReserveTime');
				let date = new Date(ls_rt).toISOString().slice(0, 10);
				let dateTime = new Date(ls_rt).toISOString().slice(11, 16);
				this.isSelectTime = true;
				this.selectTime = date + ' ' + dateTime;
			
		},
		mounted () {
			
		},
		methods: {
			test () {
				alert('测试')
			},
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
</style>
