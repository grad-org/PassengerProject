<template>
	<div>
		<span @click="goHome"><logo id="logo" height="48px" ></logo></span>
		<div id="container">
			<mu-col width="100%" tablet="100" desktop="100">
				<label id="title">欢迎</label><br>
				<label id="info">{{info}}</label>
			</mu-col>
			<mu-col>
				<mu-text-field label="输入密码" type="password" labelFloat v-model="value_password" :errorText="errorText_password" :fullWidth="fullWidth" @focus="onFocusPassword"/>
			</mu-col>
			<mu-col style="margin: 24px 0">
				<label id="btn_left">忘记了密码？</label>
				<mu-raised-button label="完成" @click="haveDone"/>
			</mu-col>
		</div>
		<mu-dialog :open="dialog" title="错误提示">
<<<<<<< HEAD
			密码不正确，请重新输入！
=======
			{{errorTips}}
>>>>>>> develop
			<mu-flat-button label="确定" slot="actions" primary @click="closeDialog"/>
		</mu-dialog>
	</div>
</template>

<script>

	import Logo from '../../assets/Logo'
	import { Toast } from 'vant'
	import checkFormat from './js/CheckFormat.js'

	export default {
		name: 'LoginNext',
		components: {
			Logo
		},
		data () {
			return {
				fullWidth: true,
				value_password: '',
				errorText_password: '',
				info: '',
<<<<<<< HEAD
				dialog: false
				
=======
				dialog: false,
				errorTips: '',
>>>>>>> develop
			}
		},
		created () {
			// console.log('读取LoginNext的token：'+ this.$store.state.token)
			// console.log(this.$route.path)
		},
		mounted (){
			// 当直接在地址栏输入 /login/2 时，重定向返回登录
			if (this.$route.params.username == '' || this.$route.params.username == null || this.$route.params.username == undefined ) {
				this.info = '请先选择账号！'
				const toast = Toast.loading({
					mask: true,
					duration: 0,	// 持续展示 toast
					forbidClick: true,	// 禁用背景点击
					message: '出现错误…'
				});
<<<<<<< HEAD
				let second = 2;
=======
				let second = 1;
>>>>>>> develop
				const timer = setInterval(() => {
					second--;
					if (second == 0) {
						clearInterval(timer);
						Toast.clear();
						let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
						this.$router.push({path: redirect})
					}
				}, 1000);
			} else {
<<<<<<< HEAD
				this.info = "使用手机号码 " + this.$route.params.username + " 登录"
=======
				this.info = "使用账号 " + this.$route.params.username + " 登录"
>>>>>>> develop
			}
		},
		methods: {
			goHome () {
				this.$router.push({name: 'Home'});
			},
			haveDone () {
<<<<<<< HEAD
				this.errorText_password = checkFormat.checkPassword(this.value_password)
				let _this = this;
				if (this.errorText_password == '') {
					this.$axios.post("/api/auth/login",
=======
				let _this = this;
				_this.errorText_password = checkFormat.checkPassword(_this.value_password)
				if (_this.errorText_password == '') {
					_this.$axios.post("/api/auth/login",
>>>>>>> develop
						{
							// username: "ppp", 
							// password: "a123456"
							// username: "admin", 
							// password: "admin"
							username: _this.$route.params.username,
							password: _this.value_password
						},
						{
							headers: {'Content-Type': 'application/json'}
						}
					)
<<<<<<< HEAD
					.then(function (response) {
						console.log(response);
						if (response.status == 200) {
								_this.$store.dispatch('login', response.data.data.token)
								_this.$toast('登录成功');
								let second = 2;
								const timer = setInterval(() => {
									second--;
									if (second == 1) {
										_this.$toast('即将进入首页…');
									} 
									else {
										clearInterval(timer);
										Toast.clear();
										_this.$router.push({path: '/', name: 'Home'})
									}
								}, 1000);
						} else {
							alert("登录失败")
						}
					})
					.catch(function (error) {
						console.log(error);
						// if (error.status == 401) {
						// 	alert('密码错误，请重新输入密码！')
						// }

						if (error.status == 401) {
						 // muse ui Alert样式
							_this.dialog = true;
						}

						
					})
				} else {
					this.errorText_password = checkFormat.checkPassword(this.value_password)
=======
					.then( (response) => {
						console.log(response);
						if (response.status == 200) {
								_this.$store.dispatch('login', response.data.data.token)
								const toast = Toast.loading({
									duration: 0,
									forbidClick: true,
									message: '登录成功…'
								});
									let second = 2;
									const timer = setInterval(() => {
										second--;
										if (second == 1) {
											toast.message = '前往首页…';
										} else {
											clearInterval(timer);
											Toast.clear();
											_this.$router.push({name: 'Home'})
										}
								}, 1000);
						}
					})
					.catch((error) => {
						console.log(error);
						if (error.status == 401) {
							_this.errorTips = '密码错误，请重新输入！';
							_this.dialog = true;
						}
						if (error.status == 500) {
							_this.errorTips = '服务器内部错误（' + error.status +'）';
							_this.dialog = true;
						}
					})
				} else {
					_this.errorText_password = checkFormat.checkPassword(_this.value_password)
>>>>>>> develop
				}
				
			},
			onFocusPassword () {
				this.errorText_password = ''
			},
			closeDialog () {
				this.dialog = false
			}
		}
	}
</script>

<style scoped>
	@import url(./css/login.css);
</style>
