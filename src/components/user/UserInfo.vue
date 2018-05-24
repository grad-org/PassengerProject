
<template>
	<div>
		<mu-appbar ref="barDiv" title="返回">
			<mu-icon-button icon="arrow_back" slot="left" @click="goBack"/>
			<mu-flat-button label="编辑资料" slot="right" @click="goEdit"/> 
		</mu-appbar>
		<div ref="avaterDiv" style="text-align: center">
			<mu-paper class="paper" circle :zDepth="1" >
				<img :src="avater" style="width: 100%; height: 100%"/>
			</mu-paper>
			<span style="font-size: 20px; display: block">{{nickname}}</span>
			<span style="margin: 6px 0 12px 0; display: block; font-size: 14px; color: #666">不爱吃鱼的猫…</span>
		</div>
		<div ref="settingsDiv" :style="{height: settingsHeight}" style="background: #fff">
			<div class="block_title_userinfo">
				基本设置
			</div>
			<!-- 实名认证 -->
			<div class="van-cell-group van-hairline--top-bottom">
				<div class="van-cell van-hairline van-cell--clickable">
					<mu-badge content="已认证" color="#58b99d" style="right: 30px; position: absolute; top: 14px;" v-show="isVerified"/>
					<div class="van-cell__title">
						<i class="van-icon van-icon-shop"></i>
						<span class="van-cell__text">实名认证</span>
						<!-- <span class="van-tag van-hairline--surround van-tag--danger">标签</span> -->
						<i class="van-icon van-cell__right-icon van-icon-arrow icon-cover"></i>
					</div>
					<div class="van-cell__value van-cell__value--link link-color-cover" v-show="!isVerified">
						<span>去认证</span>
					</div>
				</div>
			</div>
			<!-- 车主认证 -->
			<div class="van-cell-group van-hairline--bottom" @click="goApply">
				<div class="van-cell van-hairline van-cell--clickable">
					<mu-badge content="已认证" color="#5aa479" style="right: 30px; position: absolute; top: 14px;" v-show="isDriverApproved"/>
					<mu-badge content="审核中" color="#52b4f8" style="right: 30px; position: absolute; top: 14px;" v-show="isDriverPendingReview"/>
					<mu-badge content="未通过" color="#ff4444" style="right: 30px; position: absolute; top: 14px;" v-show="isDriverUnapproved"/>
					<div class="van-cell__title">
						<i class="van-icon van-icon-shop"></i>
						<span class="van-cell__text">车主认证</span>
						<span class="van-tag van-hairline--surround van-tag--danger">认证车主，享更多优惠</span>
						<i class="van-icon van-cell__right-icon van-icon-arrow icon-cover"></i>
					</div>
					<div class="van-cell__value van-cell__value--link link-color-cover" v-show="isDriverUnapply">
						<span>去申请</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/**
	 * 设置背景图片，参考：https://blog.csdn.net/woyidingshijingcheng/article/details/72903800
	 */
	// import avater from '../../assets/image/avater.jpg'
	import passengerAvater from '../../assets/image/passengerdefault.png'
	import { Toast } from 'vant'

	export default {
		data() {
			return {
				avater: null,
				nickname: '',
				username: '',
				ls_userinfo: '',
				isDriverUnapply: true,	// 未申请车主认证
				isDriverApproved: false,	// 车主认证成功
				isDriverPendingReview: false,	// 车主认证审核中
				isDriverUnapproved: false,	// 车主认证未通过
				isVerified: false,	// 是否已实名认证
				driverStatus: 'unapply',	// 用于判断是否能否前往认证车主

				// 组件高度控制
				fullHeight: document.documentElement.clientHeight,
				barHeight: '',
				settingsHeight: '',
				avaterHeight: ''
			}
		},
		created () {
			// 用户数据直接在本地获取
			let _this = this;
			_this.ls_userinfo = JSON.parse(window.localStorage.getItem('UserInfo'))
			_this.nickname = _this.ls_userinfo.nickname;
			// 获取用户头像
			_this.$axios.get('/images/user/' + this.$store.state.userId + '.jpg').then(
				(response) => {
					_this.avater = this.$serverUrl + '/images/user/' + ls_userinfo.userId + '.jpg';
				}
			).catch((error) => {
				_this.avater = passengerAvater;
				// console.log(error);
				if (error.status == 404) {
					console.log('当前用户没有设置头像！');
				}
			});
			// 根据是否存在driverId，判断是否已认证车主
			if (_this.ls_userinfo.driverId == null || _this.ls_userinfo.driverId == '' || _this.ls_userinfo.driverId == undefined) {
				_this.isDriverUnapply = true;
			} else {
				let driverId = _this.ls_userinfo.driverId;
				_this.$axios.get('/api/driver/' + driverId).then(
					(response) => {
						console.log('获取车主资料返回数据：', response);
						let status = response.data.data.driverStatus;	// 获取当前认证车主的状态
						if (status == 'PENDING_REVIEW') {
							_this.isDriverUnapply = false;
							_this.isDriverApproved = false;
							_this.isDriverPendingReview = true;		// 认证审核中
							_this.isDriverUnapproved = false;
							_this.driverStatus = 'pendingReview';
						} else if (status == 'UNAPPROVED') {
							_this.isDriverUnapply = false;
							_this.isDriverApproved = false;
							_this.isDriverPendingReview = false;
							_this.isDriverUnapproved = true;		// 认证未通过
							_this.driverStatus = 'unapproved';
						} else {
							_this.isDriverUnapply = false;
							_this.isDriverApproved = true;		// 认证通过
							_this.isDriverPendingReview = false;
							_this.isDriverUnapproved = false;
							_this.driverStatus = 'approved';
						}
					}
				).catch((error) => {
						console.log('获取车主资料错误返回：', error);
						alert('获取信息错误，请重新刷新');
				});
			}
			this.initHeight();
			this.setSetttingsHeight();
		},
		mounted() {
			
		},
		methods: {
			goBack () {
				this.$router.push({name: 'Home'});
			},
			// 更新资料
			goEdit () {
				this.$router.push({name: 'Edit'});
			},
			// 申请车主认证
			goApply () {
				console.log(this.driverStatus == 'unapply' || this.driverStatus == 'unapproved');
				if (this.driverStatus == 'unapply' || this.driverStatus == 'unapproved') {
					// 未申请认证或未通过
					this.$router.push({name: 'Welcome'});
				} else if (this.driverStatus == 'pendingReview') {
					// 审核中
					Toast('已提交申请，正在审核中...');
				} else {
					// 审核通过
					Toast('已通过车主认证！');
				}
			},
			initHeight () {
				let _this = this
				window.onresize = function () {
					return (()=> {
						// 浏览器内容可视高度
						window.fullHeight = document.documentElement.clientHeight;
						_this.fullHeight = window.fullHeight;
						_this.avaterHeight = _this.$refs.avaterDiv.clientHeight;
						_this.barHeight = _this.$refs.barDiv.$el.clientHeight;
						_this.settingsHeight = (_this.fullHeight - _this.barHeight - _this.avaterHeight) + 'px';
						// console.log(_this.settingsHeight);
					}) ()
				}
			},
			setSetttingsHeight () {
				this.$nextTick (() => {
					this.barHeight = this.$refs.barDiv.$el.clientHeight;
					this.avaterHeight = this.$refs.avaterDiv.clientHeight;
					this.settingsHeight = (this.fullHeight - this.barHeight - this.avaterHeight) + 'px';
					// console.log(this.settingsHeight);
				})
			},
		},
		
	}
</script>

<style scoped>
	@import './css/vant-style.css';
	.paper {
		display: inline-block;
		height: 90px;
		width: 90px;
		margin: 30px 0 12px 0;
		text-align: center;
		overflow: hidden;
	}
</style>


