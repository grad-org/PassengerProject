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
		},
		mounted () {
			this.checkOrder();
		},
		destotyed () {
			window.localStorage.removeItem('TripDetail');	// 删除发布行程返回的数据
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
						_this.$store.dispatch('setOutset', null);
						_this.$store.dispatch('setDestination', null);

						let trip = response.data.data;
						_this.$socket.emit('cancelTrip', trip);

						// 跳转动画
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
						this.$router.push({name: 'HistoryTrip'})
					}
				})
			},
			checkOrder () {
				let _this = this;
				_this.$socket.on('acceptTrip', function (tripOrder) {
					console.log('车主接单返回：', tripOrder);
					window.localStorage.removeItem('TripDetail');
					window.localStorage.setItem('T1', JSON.stringify(tripOrder));
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
				})
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


