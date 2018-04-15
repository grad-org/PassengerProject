
<template>
<<<<<<< HEAD
	<!-- 侧栏 -->
	<div>
		<mu-drawer :width="width" :zDepth="zDepth" :open="open_drawer" :docked="docked" @close="toggle()">
			<!-- <router-link to="login">
				<mu-list-item @itemClick="docked ? '' : toggle()" class="user-info" :title="nickname" >
						<mu-avatar slot="left" :src="avater" :size="30" />
				</mu-list-item>
			</router-link> -->
			<div class="user-info" :style="userStyle">
				<mu-paper class="paper" circle :zDepth="2" style="userAvater">
					<img :src="avater" style="width: 100%; height:100%" />
				</mu-paper>
				<mu-list-item class="user" :title="nickname" :describeText="username" @click="goUserInfo">
=======
	<div>
		<mu-drawer :width="width" :zDepth="zDepth" :open="open_drawer" :docked="docked" @close="toggle()">

			<div class="user-info" :style="userBackground">
				<mu-paper class="paper" circle :zDepth="2" >
					<img :src="avater" style="width: 100%; height: 100%"/>
				</mu-paper>
				<mu-list-item :title="nickname" :describeText="username" @click="goUserInfo">
>>>>>>> develop
					<mu-icon value="info" slot="right" color="#333"/>
				</mu-list-item>
			</div>
			<mu-list>
				<mu-list-item title="行程" rightIcon="keyboard_arrow_right">
					<mu-icon slot="left" value="local_taxi" />
				</mu-list-item>
				<mu-list-item title="钱包">
					<mu-icon slot="left" value="account_balance_wallet" />
				</mu-list-item>
				<mu-list-item title="设置">
					<mu-icon slot="left" value="settings" />
				</mu-list-item>
				<mu-list-item title="客服">
					<mu-icon slot="left" value="live_help"/>
				</mu-list-item>
				<mu-list-item title="退出" @click="logout">
					<mu-icon slot="left" value="close"/>
				</mu-list-item>
			</mu-list>
		</mu-drawer>
		<!-- 顶栏区域 -->
		<mu-appbar ref="barDiv" title="蔚蓝出行">
<<<<<<< HEAD
			<mu-icon-button icon="menu" slot="left" v-on:click="toggle(true)"/>
=======
			<mu-icon-button icon="menu" slot="left" @click="toggle(true)"/>
>>>>>>> develop
			<mu-flat-button color="#fff" :label="selectedCity" slot="right" @click="toCitySelector"/>
			<mu-icon-button icon="notifications" slot="right">
			</mu-icon-button>
		</mu-appbar>
	</div>
</template>

<script>
<<<<<<< HEAD

	import { Toast } from 'vant'
	import avater from "../assets/image/avater2.jpg";
	import avater3 from "../assets/image/avater3.jpg";
=======
	/**
	 * 设置背景图片，参考：https://blog.csdn.net/woyidingshijingcheng/article/details/72903800
	 */
	import avater from '../assets/image/avater.jpg'
>>>>>>> develop

	export default {
		data() {
			return {
				// Drawer
				open_drawer: false,
				docked: true,
				zDepth: 0,
				width: "60%",
<<<<<<< HEAD
				
				// user information
				nickname: '未知',
				username:'',
				avater: '',

				userStyle: {
					backgroundImage: 'url(' + require('../assets/image/avater2.jpg') + ')',
					backgroundRepeat: 'no-repeat',
					backgroundSize: '100% auto',
=======
				// avater
				avater: null,
				nickname: '',
				username: '',
				userBackground: {
					backgroundImage: 'url(' + require('../assets/image/bg.jpg') + ')',
					backgroundRepeat: "no-repeat",
					backgroundSize: "100% auto",
>>>>>>> develop
				}
			}
		},
		created () {
<<<<<<< HEAD
			this.$axios.get('/api/auth/user')
				.then( (response) => {
					console.log(response)
					this.nickname = response.data.data.nickname
					this.username = response.data.data.username
					this.$store.dispatch('getUserId', response.data.data.id)
					window.localStorage.nickname = response.data.data.nickname
				})
			this.$axios.get('/images/user/'+ this.$store.state.userId +'.jpg')
				.then( (response) => {
					console.log(response)
					if (response.state == 200) {
						this.avater = 'http://forcar.vip:8080/images/user/'+ this.$store.state.userId +'.jpg'
					}
				})
				.catch( (error) => {
					// 用户没设置头像就用默认的
					console.log(error)
					this.avater = avater3
					console.log("找不到头像")
				})
=======
			let _this = this;
			// 带上token，发送http请求，获得用户信息（包括ID、nickname、username等）
			_this.$axios.get('/api/auth/user')
			.then( (response) => {
				console.log(response);
				if (response.status == 200) {
					console.log('获取用户成功');
					_this.$store.dispatch('userId', response.data.data.id)
					_this.nickname = response.data.data.nickname
					_this.username = response.data.data.username
					window.localStorage.nickname = response.data.data.nickname
				}
			})
			.catch ( (error) => {
				console.log(error);
			})
			// 根据用户ID获取用户头像
			_this.$axios.get('/images/user/' + _this.$store.state.userId + '.jpg')
			.then( (response) => {
				console.log(response)
				if (response.status == 200) {
					this.avater = 'http://forcar.vip:8080/images/user/' + _this.$store.state.userId + '.jpg'
					_this.avater = 'http://forcar.vip:8080/images/user/2.jpg'
					// _this.avater = avater
				}
			})
			.catch( (error) => {
				console.log(error)
				_this.avater = avater
			})

>>>>>>> develop
		},
		mounted() {
			
		},
		computed: {
			selectedCity () {
				return this.$store.state.localCity
			}
		},
		methods: {
			toggle(flag) {
				this.open_drawer = !this.open_drawer;
				this.docked = !flag;
			},
			logout() {
<<<<<<< HEAD
				this.open_drawer = false
				const toast = Toast.loading('退出登录中…')
				let second = 1;
				const timer = setInterval(() => {
					second--;
					if (second) {
						toast.message = '退出登录中…';
					} else {
						clearInterval(timer);
						Toast.clear();
						this.$store.dispatch('logout');
						let redirect = decodeURIComponent(this.$route.query.redirect || "/login");
						this.$router.push({ path: redirect });
					}
				}, 1000);	
			},
			toCitySelector () {
				this.$router.push({ name: "CitySelect" });
			},
			goUserInfo () {
				this.open_drawer = false
=======
				// this.$store.commit(this.$types.LOGOUT);
				this.$store.dispatch('logout')
				this.$router.push({name: 'Login'});
			},
			toCitySelector: function() {
				this.$router.push({ name: "CitySelect" });
			},
			goUserInfo () {
>>>>>>> develop
				this.$router.push({name: 'User'})
			}
		}
	}
</script>

<style scoped>
	.user-info {
<<<<<<< HEAD
		height: auto;
=======
		width: 100%; 
		height: auto;
		background: #e0e0e0;
>>>>>>> develop
	}
	.mu-list {
		/* 默认padding为8px */
		padding: 0;
	}
	.paper {
		display: inline-block;
		height: 60px;
		width: 60px;
<<<<<<< HEAD
		margin: 16px 0 12px 16px;
		text-align: center;
		overflow: hidden;
	}
	.user {
		/* padding-left: -54px */
		/* color: rgba(255, 255, 255, 1) */
	}
=======
		margin: 16px 0 2px 16px;
		text-align: center;
		overflow: hidden;
	}

>>>>>>> develop
</style>


