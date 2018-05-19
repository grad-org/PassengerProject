
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
			<div class="van-cell-group van-hairline--bottom">
				<div class="van-cell van-hairline van-cell--clickable">
					<mu-badge content="已认证" color="#52b4f8" style="right: 30px; position: absolute; top: 14px;" v-show="isDriver"/>
					<div class="van-cell__title">
						<i class="van-icon van-icon-shop"></i>
						<span class="van-cell__text">车主认证</span>
						<span class="van-tag van-hairline--surround van-tag--danger">认证车主，享更多优惠</span>
						<i class="van-icon van-cell__right-icon van-icon-arrow icon-cover"></i>
					</div>
					<div class="van-cell__value van-cell__value--link link-color-cover" v-show="!isDriver">
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
	import avater from '../../assets/image/avater.jpg'

	export default {
		data() {
			return {
				avater: null,
				nickname: '',
				username: '',
				ls_userinfo: '',
				isDriver: false,	// 是否已认证车主
				isVerified: false,	// 是否已实名认证

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
			_this.avater = this.$serverUrl + '/images/user/' + this.$store.state.userId + '.jpg';
			// 根据是否存在driverId，判断是否已认证车主
			if (_this.ls_userinfo.driverId == null || _this.ls_userinfo.driverId == '' || _this.ls_userinfo.driverId == undefined) {
				_this.isDriver = false;
			} else {
				_this.isDriver = true;
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
			goEdit () {
				this.$router.push({name: 'Edit'})
			},
			initHeight () {
				let _this = this
				window.onresize = function () {
					return ( ()=> {
						// 浏览器内容可视高度
						window.fullHeight = document.documentElement.clientHeight;
						_this.fullHeight = window.fullHeight;
						_this.avaterHeight = _this.$refs.avaterDiv.clientHeight;
						_this.barHeight = _this.$refs.barDiv.$el.clientHeight;
						_this.settingsHeight = (_this.fullHeight - _this.barHeight - _this.avaterHeight) + 'px';
						console.log(_this.settingsHeight)
					}) ()
				}
			},
			setSetttingsHeight () {
				this.$nextTick (() => {
					this.barHeight = this.$refs.barDiv.$el.clientHeight;
					this.avaterHeight = this.$refs.avaterDiv.clientHeight;
					this.settingsHeight = (this.fullHeight - this.barHeight - this.avaterHeight) + 'px';
					console.log(this.settingsHeight)
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


