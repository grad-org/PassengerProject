<template>
	<div>
		<mu-appbar title="等待应答" titleClass="AppBar">
		</mu-appbar>
		<div style="margin-top: 200px">
			<h1>等待司机接单中…</h1>
			<mu-raised-button label="取消订单" class="raised-button" secondary @click="cancelTrip"/>
		</div>
	</div>
</template>

<script>

	import { Toast } from 'vant'
	import SockJS from '../../../static/utils/sockjs.js'
	import Stomp from 'stompjs'

	export default {
		data () {
			return {
				ls_tripdetail: null,
				// 建立连接用
				stompClient: null,
				listenOrderSubscription: null,
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
		destotyed () {
			window.localStorage.removeItem('TripDetail');	// 删除发布行程返回的数据
			this.closeSubscription();
			this.disconnect();
		},
		methods: {
			cancelTrip () {
				let _this = this;
				_this.$axios.post('api/hailingService/trip/cancelTrip', {
					tripId: _this.ls_tripdetail.tripId
				})
				.then((response) => {
					console.log(response);
					if (response.status == 200) {
						window.localStorage.removeItem('TripDetail');
						_this.$store.state.outset = null;
						_this.$store.state.destination = null;
						const toast1 = Toast.loading({
							duration: 0,
							forbidClick: true,
							message: '已取消订单…'
						});
						let second = 2;
						const time2 = setInterval(() => {
							second--;
							if (second == 1) {
								toast1.message = '已取消订单…';
							} else {
								clearInterval(time2);
								Toast.clear();
								_this.$router.replace({name: 'Home'});
							}
						}, 1000);
					}
				})
				.catch((error) => {
					console.log(error);
					if (error.status == 400) {
						Toast('本次行程不允许取消！')
					}
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
							let body = JSON.parse(tripOrder.body);
							if (body.message == 'acceptTripOrder') {
								window.localStorage.setItem('T1', JSON.stringify(body.data));
								const toast2 = Toast.loading({
									duration: 0,
									forbidClick: true,
									message: '司机已接单…'
								});
								let second = 2;
								const time2 = setInterval(() => {
									second--;
									if (second == 1) {
										toast2.message = '司机已接单…';
									} else {
										clearInterval(time2);
										Toast.clear();
										_this.$router.push({name: 'Progressing'});
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
			},
			closeSubscription () {
				if (this.listenOrderSubscription != null) {
					this.listenOrderSubscription.unsubscribe();
				}
			},
			disconnect () {
				this.stompClient.disconnect();
			}
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


