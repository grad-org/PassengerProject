<template>
	<div>
		<h1>等待司机接单中…</h1>
		<mu-raised-button label="取消订单" class="raised-button" secondary @click="cancelTrip"/>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				ls_tripdetail: null
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
					_this.$router.replace({name: 'Home'});
				})
				.catch((error) => {
					console.log(error);
				})
			}
		},
		computed: {

		}
	}
</script>

<style scoped>
	* {
		text-align: center;
	}
	.raised-button {
		margin: 12px;
	}
</style>


