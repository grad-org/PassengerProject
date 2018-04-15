
<template>
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
			<mu-icon-button icon="menu" slot="left" v-on:click="toggle(true)"/>
			<mu-flat-button color="#fff" :label="selectedCity" slot="right" @click="toCitySelector"/>
			<mu-icon-button icon="notifications" slot="right">
			</mu-icon-button>
		</mu-appbar>
	</div>
</template>

<script>

	import { Toast } from 'vant'
	import avater from "../assets/image/avater2.jpg";
	import avater3 from "../assets/image/avater3.jpg";

	export default {
		data() {
			return {
				// Drawer
				open_drawer: false,
				docked: true,
				zDepth: 0,
				width: "60%",
				
				// user information
				nickname: '未知',
				username:'',
				avater: '',

				userStyle: {
					backgroundImage: 'url(' + require('../assets/image/avater2.jpg') + ')',
					backgroundRepeat: 'no-repeat',
					backgroundSize: '100% auto',
				}
			}
		},
		created () {
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
				this.$router.push({name: 'User'})
			}
		}
	}
</script>

<style scoped>
	.user-info {
		height: auto;
	}
	.mu-list {
		/* 默认padding为8px */
		padding: 0;
	}
	.paper {
		display: inline-block;
		height: 60px;
		width: 60px;
		margin: 16px 0 12px 16px;
		text-align: center;
		overflow: hidden;
	}
	.user {
		/* padding-left: -54px */
		/* color: rgba(255, 255, 255, 1) */
	}
</style>


