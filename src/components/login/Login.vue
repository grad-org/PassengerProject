<template>
	<div>
		<!-- <button @click="goHome"><logo id="logo" height="48px" ></logo></button> -->
		<span @click="goHome"><logo id="logo" height="48px" ></logo></span>
		<div id="container">
			<mu-col width="100%" tablet="100" desktop="100">
				<label id="title">登录</label><br>
				<label id="info">使用您的网约车账号</label>
			</mu-col>
			<mu-col>
				<mu-text-field label="输入手机号码" labelFloat v-model="value_username" :errorText="errorText_username" :fullWidth="fullWidth" @focus="onFocusUsername"/>
				<!-- 您所输入的是：{{value_username}} -->
			</mu-col>
			<mu-col style="margin: 24px 0">
				<!-- <mu-raised-button label="创建账号" /> -->
				<label id="btn_left" @click="goRegister">创建账号</label>
				<mu-raised-button label="下一步" @click="loginNext" />
			</mu-col>
		</div>
	</div>
</template>

<script>
	
	import Logo from '../../assets/Logo'
	import checkFormat from './js/CheckFormat.js';
	
	export default {
		name: 'Login',
		components: {
			Logo
		},
		data () {
			return {
				fullWidth: true,
				value_username: '',
				errorText_username: ''
			}
		},
		created () {
			// console.log('读取Login的token：' + this.$store.state.token)
		},
		methods: {
			goHome () {
				this.$router.push({name: 'Home'});
			},
			goRegister () {
				this.$router.push({name: 'Register'});
			},
			onFocusUsername () {
				this.errorText_username = ''
			},
			loginNext () {
				this.errorText_username = checkFormat.checkUsername(this.value_username);
				if (this.errorText_username == '') {
					this.$router.push({path: '/login/2', name: 'LoginNext', params: { username: this.value_username }});
				} else {
					this.errorText_username = checkFormat.checkUsername(this.value_username);
				}
				
			}
		}
	}
</script>


<style scoped>
	@import url(./css/login.css);
</style>
