<template>
	<div >
		<mu-appbar ref="barDiv" title="我的行程" style="position: fixed; top: 0">
			<mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack"/>
		</mu-appbar>
		<div :style="listStyle">	
			<van-pull-refresh v-model="isLoading" pulling-text="下拉即可刷新..." loosing-text="释放即可刷新..." loading-text="加载中..."  @refresh="onRefresh">					
				<!-- 无行程，或者获取失败 -->
				<div style="padding: 16px; font-size: 16px; text-align: center" v-if="!hasTrip" >
					<div v-show="notTripTips">
						<p style="height: 400px">您暂无行程，可下拉刷新！</p>
					</div>
					<div v-show="serviceError">
						<p style="height: 400px">内部网络服务出错，可尝试下拉刷新！</p>
					</div>
				</div>
				<!-- 有行程 -->
				<div style=" font-size: 16px; " v-else >
					<van-cell-group v-for="(tripList, index) in tripLists" :key="index" :border="false" style="padding: 12px 8px 0 8px; background: #eee">
						<van-cell :title="tripList.departureTime" :value="orderStatus(index)" :center="true" :is-link="true" @click="itemClick(index, tripList.tripId)" style="font-size: 15px; font-weight: bold"/>
						<van-cell :title="'出发地：'+ tripList.departure" icon="location" :center="true" :border="false" style="color: #757575"/>
						<van-cell :title="'目的地：'+ tripList.destination" icon="location" :center="true" :border="false" style="color: #757575" />
					</van-cell-group>
				</div>
			</van-pull-refresh>
		</div>
	</div>
</template>

<script>
	/**
	 * 订单状态未完全判断完，如已取消等
	 */

	import { PullRefresh } from 'vant'
	import { List } from 'vant';
	import { Cell, CellGroup } from 'vant';

	export default {
		components: {
			[PullRefresh.name]: PullRefresh,
			[List.name]: List,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup
		},
		data () {
			return {
				hasTrip: true,	// 判断是否有行程
				listStyle: {
					marginTop: '',	// 用于判断Bar高度
				},
				
				// 无行程，上拉刷新
				isLoading: true,	// 刷新操作完成后，将isLoading设置为false，表示加载完成
				notTripTips: true,	// 没有历史行程的提示
				serviceError: false,	// 内部服务出错的提示

				// vant list
				tripLists: null,
				loading: false,
				finished: true
			}
		},
		created () {
			let _this = this;
			let userinfo = JSON.parse(window.localStorage.getItem('UserInfo'));
			// _this.$axios.get('/api/tripOrder/search/findAllByPassenger/' + window.localStorage.getItem('UserId'))
			// 根据乘客id查询历史行程
			_this.$axios.get('/api/tripOrder/search/findAllByPassenger?passengerId=' + userinfo.passengerId)
			// _this.$axios.get('/api/tripOrder/search/findAllByPassenger?passengerId=1')
			.then((response) => {
				console.log(response.data.data);
				_this.tripLists = response.data.data;
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
			},
			// 上拉刷新
			onRefresh() {
				let _this = this;
				setTimeout(() => {
					this.$toast('刷新成功');
					this.isLoading = false;
					_this.$axios.get('/api/tripOrder/search/findAllByPassenger/1')
					.then((response) => {
						console.log(response.data.data);
						_this.tripLists = response.data.data;
						_this.hasTrip = true;
					})
					.catch((error) => {
						console.log(error);
						_this.hasTrip = false;
						if (error.status == 404) {
							_this.notTripTips = true;
							_this.serviceError = false;
						};
						if (error.status == 500) {
							_this.notTripTips = false;
							_this.serviceError = true;
						}
					})
				}, 500);
			},
			// 下拉加载
			onLoad() {
				setTimeout(() => {
					// for (let i = 0; i < 10; i++) {
					// 	this.tripLists.push(this.list.length + 1);
					// }
					// this.loading = false;

					// if (this.tripLists.length >= this.tripLists) {
					// 	this.finished = true;
					// }
					this.finished = true
				}, 500);
			},
			itemClick (index, tripId) {
				// 先判断是否进行中，如果是点击会进入行车页面，否则进入历史行程的详细页面
				// 
				console.log(this.tripLists[index]);
				if (this.tripLists[index].orderStatus == 'PROCESSING') {
					console.log('进入车辆行驶中的页面');
					window.localStorage.setItem('ProcessingTrip', JSON.stringify(this.tripLists[index]));
					this.$router.push({name: 'CarDriving'})
				} else {
					window.localStorage.setItem('HistoryTripDetail', JSON.stringify(this.tripLists[index]))
					this.$axios.get('/api/tripOrder/' + tripId).then((response) => {
						console.log(response)
						if (response.status == 200) {
							window.localStorage.setItem('HistoryTripDetail', JSON.stringify(response.data.data))
							this.$router.push({path: '/trip/history/detail', name: 'TripDetail', params: {tripId: tripId}})
						}
					}).catch((error) => {
						console.log(error)
					})
				}
				
			},
			orderStatus (index) {
				let ts = this.tripLists[index].orderStatus;
				if (ts == 'PAYMENT_COMPLETED') {
					return '已完成'
				};
				if (ts == 'PROCESSING') {
					return '进行中'
				}
			}
		},
		computed: {

		}
	}
</script>

<style scoped>
	#all {
		/* background: #f7f7f7 */
		/* background: #999 */
		background: green
	}
</style>


