
<template>
	<div>
		<mu-appbar ref="barDiv" title="返回">
			<mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack"/>
			<mu-flat-button label="编辑资料" slot="right" @click="goEdit"/> 
		</mu-appbar>
		<div style="margin-bottom: 12px; text-align: center">
			<mu-paper class="paper" circle :zDepth="1" >
				<img :src="avater" style="width: 100%; height: 100%"/>
			</mu-paper>
			<span style="font-size: 24px">{{nickname}}</span>
			<span style="margin-top: 6px; font-size: 18px; color: #666">不爱吃鱼的猫…</span>
		</div>
		<mu-list>
			<mu-sub-header>基本设置</mu-sub-header>
			<mu-divider/>
			<mu-list-item title="实名认证" >
				<mu-avatar icon="folder" slot="leftAvatar"/>
				<mu-badge content="未认证" slot="after" v-if="true"/>
				<mu-badge content="已认证" primary slot="after" v-else/>
			</mu-list-item>
			<mu-divider/>
			<mu-list-item title="车主认证" >
				<mu-avatar icon="folder" slot="leftAvatar"/>
				<mu-badge content="未认证" slot="after" v-if="isDriver"/>
				<mu-badge content="已认证" primary slot="after" v-else/>
			</mu-list-item>
			<mu-divider/>
		</mu-list>
	</div>
</template>

<script>
	/**
	 * 设置背景图片，参考：https://blog.csdn.net/woyidingshijingcheng/article/details/72903800
	 * 
	 * 仍需解决问题： 本地获取头像，设置头像
	 * 如果认证回来，应该重新获取一次用户信息，用来覆盖localstorage信息，否则认证信息可能未更新！
	 */
	import avater from '../../assets/image/avater.jpg'

	export default {
		data() {
			return {
				avater: null,
				nickname: '',
				username: '',
				ls_userinfo: ''
			}
		},
		created () {
			// 用户数据直接在本地获取
			let _this = this;
			_this.ls_userinfo = JSON.parse(window.localStorage.getItem('UserInfo'))
			_this.nickname = _this.ls_userinfo.nickname;
			_this.avater = avater;
			_this.isDriver();
		},
		mounted() {
			
		},
		methods: {
			goBack () {
				this.$router.go(-1);
			},
			goEdit () {
				this.$router.push({name: 'Edit'})
			},
			isDriver () {
				let di = this.ls_userinfo.driverId;
				if ( di == '' || di == undefined || di == undefined) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
</script>

<style scoped>
	.paper {
		display: inline-block;
		height: 90px;
		width: 90px;
		margin: 30px 0 12px 0;
		text-align: center;
		overflow: hidden;
	}
	span {
		display: block
	}
</style>


