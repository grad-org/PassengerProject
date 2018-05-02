<template>
	<div>
		<mu-appbar title="等待应答" titleClass="AppBar">
		</mu-appbar>
		<h1>等待司机接单中…</h1>
		<mu-raised-button label="取消订单" class="raised-button" secondary @click="cancelTrip"/>
	</div>
</template>

<script>

	import SockJS from '../../../static/utils/sockjs.js'
	import Stomp from 'stompjs'

	export default {
		data () {
			return {
				ls_tripdetail: null,
				// 建立连接用
				stompClient: null,
			}
		},
		created () {
			if (typeof window.localStorage.getItem('TripDetail') === 'string') {
				this.ls_tripdetail = JSON.parse(window.localStorage.getItem('TripDetail'));
			} else {
				this.ls_tripdetail = window.localStorage.getItem('TripDetail');
				// this.$router.push({name: 'Home'});
				let redirect = decodeURIComponent(this.$route.query.redirect || '/');
				this.$router.push({path: redirect})
			}
			this.checkOrder();
		},
		mounted () {
			
		},
		methods: {
			cancelTrip () {
				let _this = this;
				_this.$axios.post('api/hailingService/trip/cancelTrip', {
					tripId: _this.ls_tripdetail.tripId
				})
				.then((response) => {
					console.log(response);
					window.localStorage.removeItem('TripDetail');
					_this.$store.state.outset = null;
					_this.$store.state.destination = null;
					_this.$router.replace({name: 'Home'});
				})
				.catch((error) => {
					console.log(error);
				})
			},
			checkOrder () {
				let _this = this;
				let token = window.localStorage.getItem('Token')

				let socket = new SockJS('http://online-ride-hailing.herokuapp.com/orh');
				_this.stompClient = Stomp.over(socket);

				// 创建连接
				_this.stompClient.connect(
					// headers
					{'Auth-Token': token},
					// 连接成功的回调函数
					function connectCallback (frame) {
						_this.listenOrderSubscription = _this.stompClient.subscribe('/user/queue/hailingService/tripOrder/acceptance-notification', function (tripOrder) {
							console.log(tripOrder.body);
							window.localStorage.setItem('T1', tripOrder.body);
							_this.$router.push({name: 'Progressing'});
						})
					},
					// 连接失败的回调函数
					function errorCallback (error) {
						console.log(error);
						console.log('失败回调',error);
					}
				)
			},
		},
		computed: {

		},
		watch: {
			
		}
	}
</script>

<style scoped>
	* {
		text-align: center;
	}
	.AppBar {
		text-align: center
	}
	.raised-button {
		margin: 12px;
	}
</style>


