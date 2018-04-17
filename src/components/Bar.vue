
<template>
	<div>
		<mu-drawer :width="width" :zDepth="zDepth" :open="open_drawer" :docked="docked" @close="toggle()">

			<div class="user-info" :style="userBackground">
				<mu-paper class="paper" circle :zDepth="2" >
					<img :src="avater" style="width: 100%; height: 100%"/>
				</mu-paper>
				<mu-list-item :title="nickname" :describeText="username" @click="goUserInfo">
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
			<mu-icon-button icon="menu" slot="left" @click="toggle(true)"/>
			<mu-flat-button color="#fff" :label="selectedCity" slot="right" @click="toCitySelector"/>
			<mu-icon-button icon="notifications" slot="right">
			</mu-icon-button>
		</mu-appbar>
	</div>
</template>

<script>
	/**
	 * 设置背景图片，参考：https://blog.csdn.net/woyidingshijingcheng/article/details/72903800
	 */
	import avater from '../assets/image/avater.jpg'

	export default {
		data() {
			return {
				// Drawer
				open_drawer: false,
				docked: true,
				zDepth: 0,
				width: "60%",
				// avater
				avater: null,
				nickname: '',
				username: '',
				userBackground: {
					backgroundImage: 'url(' + require('../assets/image/bg.jpg') + ')',
					backgroundRepeat: "no-repeat",
					backgroundSize: "100% auto",
				}
			}
		},
		created () {
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
				console.log(response);
				if (response.status == 200) {
					this.avater = 'http://forcar.vip:8080/images/user/' + _this.$store.state.userId + '.jpg'
					// _this.avater = 'http://forcar.vip:8080/images/user/2.jpg'
				}
			})
			.catch( (error) => {
				console.log(error)
				_this.avater = avater
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
				let _this = this
				// this.$router.push({name: 'User',})
				_this.$router.push({ name: 'User', params: { id: _this.$store.state.userId} })
			}
		}
	}
</script>

<style scoped>
	.user-info {
		width: 100%; 
		height: auto;
		background: #e0e0e0;
	}
	.mu-list {
		/* 默认padding为8px */
		padding: 0;
	}
	.paper {
		display: inline-block;
		height: 60px;
		width: 60px;
		margin: 16px 0 2px 16px;
		text-align: center;
		overflow: hidden;
	}

</style>


