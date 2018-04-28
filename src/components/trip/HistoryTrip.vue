<template>
	<div>
		<mu-appbar ref="barDiv" title="我的行程" style="position: fixed; top: 0">
			<mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack"/>
		</mu-appbar>
		<div :style="listStyle">
			<!-- 无行程，或者获取失败 -->
			<div v-if="!hasTrip">
				<p>无行程</p>
			</div>
			<!-- 有行程 -->
			<div v-else>
				<p>有行程</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				hasTrip: false,	// 判断是否有行程
				listStyle: {
					marginTop: ''	// 用于判断Bar高度
				},
			}
		},
		created () {
			let _this = this;
			// _this.$axios.get('/api/tripOrder/search/findAllByPassenger/' + window.localStorage.getItem('UserId'))
			_this.$axios.get('/api/tripOrder/search/findAllByPassenger/1')
			.then((response) => {
				console.log(response);
				_this.hasTrip = true;
			})
			.catch((error) => {
				console.log(error);
				_this.hasTrip = false;
			})
		},
		mounted () {
			this.listStyle.marginTop = this.$refs.barDiv.$el.clientHeight + 'px'
		},
		methods: {
			goBack () {
				this.$router.go(-1);
			}
		},
		computed: {

		}
	}
</script>

<style scoped>
	
</style>


