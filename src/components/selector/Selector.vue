<template>
		<div ref="selectorDiv" class="container">
			<div class="timeStyle" style="text-align: center" >
				<button @click="selectNow" :class="{active: isActiveN}">即时</button>
				<button @click="selectReserve" :class="{active: isActiveR}">预约</button>
			</div>
			<div>
				<div style="padding: 6px 0 10px 0; text-align: center; font-size: 14px; color: rgb(177, 177, 177);" @click="openBottomSheet" v-show="showTimePicker">
					<span style="font-weight: bold" v-if="!isSelectTime">预约时间 ＞</span>
					<span style="font-weight: bold" v-else>出行时间：{{selectTime}}</span>
				</div>
				<mu-divider shallowInset v-show="showTimePicker"/>
				<mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
					<mu-divider shallowInset/>
					
					<van-datetime-picker
						v-model = "currentDate"
						type = "datetime"
						:min-date = "minDate"
						:max-date = "maxDate"
						@confirm = "confirmSelect"
						@cancel = "cancelSelect"
					/>
				</mu-bottom-sheet>
			</div>
			<mu-list-item :titleClass="{titleclass_ouset: notActive_o}" :title="outsetTips" style="margin-left: -16px" @click="goSearchOutset">
				<mu-icon slot="left" value="lens" color="#009688" style="margin-left: 16px; font-size: 18px"/>
			</mu-list-item>
			<mu-divider shallowInset/>
			<mu-list-item class="destination" :titleClass="{titleclass_destination: notActive_d}" :title="destinationTips" style="margin-left: -16px" @click="goSearchDestination">
				<mu-icon slot="left" value="lens" color="#ffc107" style="margin-left: 16px; font-size: 18px"/>
			</mu-list-item>
			<mu-raised-button style="margin: 6px 16px 6px 16px; padding: 0; float:right" label="确定" class="raised-button" :disabled="btn_disabled" @click="havaDone" />
		</div>
</template>

<script>
	/**
	 * vue中慎用style的scoped属性：https://2ue.github.io/2017/11/15/vue-style-scoped/
	 * new Date() 参考：https://blog.csdn.net/liaozhongping/article/details/51139854
	 * 
	 * 仍需完善的问题：预约最早时间有问题、起点终点一样的情况
	 */

	// import Vue from 'vue'
	// import { DatetimePicker } from 'vant';
	// Vue.use(DatetimePicker)

	export default {
		data () {
			return {
				btn_disabled: true,		// 确定按钮，是否可见
				bottomSheet: false,		// 控制弹出，是否可见

				// TimePicker选择器属性值
				minDate: new Date(),	// 可选最小日期
				maxDate: new Date(2019, 10, 1),		// 可选最大日期
				currentDate: new Date(),	// 当前时间

				isActiveN: true,	// 选择即时出行，用来控制样式
				isActiveR: false,	// 选择预约出行，同样是用来控制样式
				showTimePicker: false,	// 控制预约时间弹出框
				isSelectTime: false,	// 用来判断是否已选择预约时间，来控制页面显示
				selectTime: null,		// 预约时间
				tripType: null,	// 出行方式，默认即时

				selectorHeight: '',		// 组件高度
			}
		},
		created () {
			// 进入首页，默认选择【即时】叫车，接下来是判断刷新情况
			let ls_tripType = window.localStorage.getItem('TripType')
			if ( ls_tripType == null || ls_tripType == undefined || ls_tripType == '' ) {
				this.tripType = 'REAL_TIME'
				window.localStorage.setItem('TripType', 'REAL_TIME');
			} else if ( ls_tripType == 'REAL_TIME' ) {
				this.selectNow();
			} else {
				this.selectReserve();
			}
			// 判断是否显示预约时间
			let ls_rt = window.localStorage.getItem('ReserveTime');
			console.log(new Date(ls_rt))
			if ( ls_rt == '' || ls_rt == null || ls_rt == undefined) {
				this.selectTime = null;
			} else {
				// 判断缓存时间是否小于当前时间
				if (new Date(ls_rt) < new Date()) {
					console.log('本地缓存预约时间小于当前时间，需要重新选择预约时间！');
					window.localStorage.removeItem('ReserveTime');
				} else {
					let date = new Date(ls_rt).toISOString().slice(0, 10);
					let dateTime = new Date(ls_rt).toISOString().slice(11, 16);
					this.isSelectTime = true;
					this.selectTime = date + ' ' + dateTime;
				}
			}
		},
		mounted () {
			let condition1 = this.$store.state.outset;
			let condition2 = this.$store.state.destination;
			if (condition1 == null) {
				console.log('未选起点');
				this.btn_disabled = true
			} else if (condition2 == null) {
				console.log('未选终点');
				this.btn_disabled = true
			} else {
				this.btn_disabled = false
				console.log('已选起点终点')
			}
		},
		computed: {
			location () {
				return this.$store.state.localCity;
			},
			notActive_o () {
				let _outset = this.$store.state.outset;
				if (_outset == '' || _outset == null || _outset == undefined) {
					return true
				} else {
					return false
				}
			},
			notActive_d () {
				let _destination = this.$store.state.destination;
				if (_destination == '' || _destination == null || _destination == undefined) {
					return true
				} else {
					return false
				}
			},
			outsetTips () {
				let _outset = this.$store.state.outset;
				if (_outset == '' || _outset == null || _outset == undefined) {
					return '您在哪儿'
				} else if (_outset === '正在获取上车地点…') {
					return '正在获取上车地点…'
				} else {
					return this.$store.state.outset.title;
				}
			},
			destinationTips () {
				let _destination = this.$store.state.destination;
				if (_destination == '' || _destination == null || _destination == undefined) {
					return '您要去哪儿';
				} else {
					return this.$store.state.destination.title;
					this.titleclass_destination.color = '#000'
				}
			}
		},
		methods: {
			havaDone () {
				// 判断出行类型
				if ( window.localStorage.getItem('TripType') == 'REAL_TIME') {
					// 即时出行
					this.$router.push({path: '/confirm', name: 'ConfirmCalling'});
				} else {
					// 预约出行
					if (window.localStorage.getItem('ReserveTime') == undefined || window.localStorage.getItem('ReserveTime') == null) {
						console.log('预约时间未选');
					} else {
						this.$router.push({path: '/confirm', name: 'ConfirmCalling'});
						window.localStorage.removeItem('PlaceStyle');	// 删除localstorage中的搜索地点判断状态
						console.log('预约时间已选');
					}
				}
			},
			// 选择出行方式
			selectNow () {
				this.isActiveN = true;
				this.isActiveR = false;
				this.showTimePicker = false;
				this.tripType = 'REAL_TIME'
				this.$nextTick (() => {
					// console.log('即时出行，高度：' + this.$refs.selectorDiv.clientHeight);
					this.$emit('heightChanged', this.$refs.selectorDiv.clientHeight)
				});
				window.localStorage.setItem('TripType', 'REAL_TIME');
			},
			selectReserve () {
				this.isActiveN = false;
				this.isActiveR = true;
				this.showTimePicker = true;
				this.tripType = 'RESERVED';
				// console.log(this.$refs.selectorDiv.clientHeight);
				this.$nextTick (() => {
					// console.log('预约出行，高度：' + this.$refs.selectorDiv.clientHeight);
					this.$emit('heightChanged', this.$refs.selectorDiv.clientHeight);
				});
				window.localStorage.setItem('TripType', 'RESERVED');
			},
			goSearchOutset () {
				this.$router.push({path: '/search', name: 'LocalSearch', params: {style: 'outset'}})
			},
			goSearchDestination () {
				this.$router.push({path: '/search', name: 'LocalSearch', params: {style: 'destination'}})
			},
			closeBottomSheet () {
				this.bottomSheet = false
			},
			openBottomSheet () {
				this.bottomSheet = true
			},
			confirmSelect (val) {
				this.isSelectTime = true;
				this.bottomSheet = false;
				let date = new Date(val).toISOString().slice(0, 10);
				let dateTime = new Date(val).toISOString().slice(11, 16);
				let dateTime2 = new Date(val).toISOString().slice(11, 19);
				console.log(new Date(val).toISOString());
				let rt = date + ' ' + dateTime;
				let rt2 = date + ' ' + dateTime2;
				this.selectTime = rt;
				window.localStorage.setItem('ReserveTime', new Date(val));
			},
			cancelSelect () {
				this.bottomSheet = false;
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
	.raised-button {
		margin: 12px;
	}·
	* {
		z-index: 2;
	}
	.mu-divider {
		margin: 0;
		color: rgb(187, 187, 187);
		vertical-align: middle
	}
	.destination {
		/* color: #ffc107; 只能改变按下时的背景颜色 */
		/* color: aqua; */
		display: inline-block;
		width: 65%;
	}
	.picker-container{
		width: 256px;
	}

	.timeStyle button {
		margin: 6px 12px;
		padding: 4px 16px;
		color: #999;
		/* border: rgb(230, 230, 230) solid 0.5px;
		border-radius: 16px; */
		background-color: #fff
	}
</style>
<style>
	.titleclass_ouset {
		color: #999
	}
	.titleclass_destination {
		color: #999
	}
	.active {
		color: #000 !important;
		border: rgb(202, 202, 202) solid 0.5px;
		/* border: rgb(33, 150, 243) solid 0.5px; */
		/* 2196f3 */
		border-radius: 16px;
	}
</style>

