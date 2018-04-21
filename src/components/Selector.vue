<template>
		<div ref="selectorDiv" class="container">
			<!-- <div style="text-align: center">
				<mu-raised-button label="即时" class="raised-button" primary @click="GetUser"/>
				<mu-raised-button label="预约" class="raised-button" />
			</div> -->
			<div class="timeStyle" style="text-align: center" >
				<button @click="selectNow" :class="{active: isActiveN}">即时</button>
				<button @click="selectAppointment" :class="{active: isActiveA}">预约</button>
			</div>
			<div>
				<div style="padding: 0 0 6px 0; text-align: center; font-size: 14px" @click="openBottomSheet" v-show="showTimePicker">
					预约时间： {{date}} {{dateTime}}
				</div>
				<mu-divider shallowInset v-show="showTimePicker"/>
				<mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
					<mu-divider shallowInset/>
					
					<van-datetime-picker
						v-model="currentDate"
						type="datetime"
						:min-date="minDate"
						:max-date="maxDate"
						@confirm="confirm()"
					/>
				</mu-bottom-sheet>
			</div>
			<mu-list-item class="outset" :title="outsetTips" style="margin-left: -16px" @click="goSearchOutset">
				<mu-icon slot="left" value="lens" color="#009688" style="margin-left: 16px; font-size: 18px"/>
			</mu-list-item>
			<mu-divider shallowInset/>
			<mu-list-item class="destination" :title="destinationTips" style="margin-left: -16px" @click="goSearchDestination">
				<mu-icon slot="left" value="lens" color="#ffc107" style="margin-left: 16px; font-size: 18px"/>
			</mu-list-item>
			<mu-raised-button style="margin: 6px 16px 6px 16px; padding: 0; float:right" label="确定" class="raised-button" :disabled="disable" @click="havaDone" />
		</div>
</template>

<script>
	import Vue from 'vue'
	import { DatetimePicker } from 'vant';
	import store from '../store'
	Vue.use(DatetimePicker)
	export default {
		props: {
			yourOutset: {
				type: String
			},
			yourDestination: {
				type: String
			},
		},
		data () {
			return {
				
				disable: false,

				bottomSheet: false,
				bottomSheet_Outset: false,

				date: '4月5日',
				dateTime: '14:00',
				minHour: 10,
				maxHour: 20,
				minDate: new Date(),
				maxDate: new Date(2018, 10, 1),
				currentDate: new Date(),

				isActiveN: true,
				isActiveA: false,
				showTimePicker: false,

				selectorHeight: '',
			}
		},
		mounted () {
			
		},
		computed: {
			location () {
				return this.$store.state.localCity
			},
			outsetTips () {
				let _outset = this.$store.state.outset
				console.log(_outset)
				if (_outset == '' || _outset == null || _outset == undefined) {
					return '您在哪儿'
				} else {
					return this.$store.state.outset.title
				}
			},
			destinationTips () {
				let _destination = this.$store.state.destination
				console.log(_destination)
				if (_destination == '' || _destination == null || _destination == undefined) {
					return '您要去哪儿'
				} else {
					return this.$store.state.destination.title
				}
			}
		},
		methods: {
			havaDone () {
				// 后期需要判断是否存在outset、destination才会进行跳转
				this.$router.push({name: 'ConfirmCalling'})
			},
			// 选择出行方式
			selectNow () {
				this.isActiveN = true;
				this.isActiveA = false
				this.showTimePicker = false
				this.$nextTick (() => {
					// console.log('即时出行，高度：' + this.$refs.selectorDiv.clientHeight)
					this.$emit('heightChanged', this.$refs.selectorDiv.clientHeight)
				})
			},
			selectAppointment () {
				this.isActiveN = false;
				this.isActiveA = true
				this.showTimePicker = true
				// console.log(this.$refs.selectorDiv.clientHeight)
				this.$nextTick (() => {
					// console.log('预约出行，高度：' + this.$refs.selectorDiv.clientHeight)
					this.$emit('heightChanged', this.$refs.selectorDiv.clientHeight)
				})
			},
			goSearchOutset () {
				this.$router.push({path: '/search', name: 'LocalSearch', params: {style: 0}})
			},
			goSearchDestination () {
				this.$router.push({path: '/search', name: 'LocalSearch', params: {style: 1}})
			},
			closeBottomSheet () {
				this.bottomSheet = false
			},
			openBottomSheet () {
				this.bottomSheet = true
			},
			confirm (val) {
				console.log(val)
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
		margin: 0 
	}
	.destination {
		/* color: #ffc107; 只能改变按下时的背景颜色 */
		display: inline-block;
		width: 65%;
	}
	.picker-container{
		width: 256px;
	}
	.active {
		color: rgb(0, 0, 0);
		border: rgb(33, 150, 243) solid 0.5px;
		/* 2196f3 */
		border-radius: 16px;
	}
	.timeStyle button {
		margin: 6px 12px;
		padding: 4px 16px;
		color: rgb(70, 70, 70);
		/* border: rgb(230, 230, 230) solid 0.5px;
		border-radius: 16px; */
		background-color: #fff
	}
</style>
