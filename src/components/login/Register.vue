<template>
	<div>
		<span @click="goHome"><logo id="logo" height="48px" ></logo></span>
		<div id="container" style="height: 250px">
			<mu-col width="100%" tablet="100" desktop="100">
				<label id="info">创建您的网约车账号</label><br>
			</mu-col>
			<mu-col>
				<mu-text-field label="昵称" labelFloat v-model="value_nickname" :errorText="errorText_nickname" :fullWidth="fullWidth"  @focus="onFocusNickname" />
				<!-- 您所输入的是：{{value_nickname}} -->
			</mu-col>
			<mu-col>
				<mu-text-field label="手机号码" labelFloat v-model="value_username" :errorText="errorText_username" :fullWidth="fullWidth"  @focus="onFocusUsername"/>
				<!-- 您所输入的是：{{value_username}} -->
			</mu-col>
			<mu-col>
				<mu-text-field label="设置密码" type="password" labelFloat v-model="value_password" :errorText="errorText_password" :fullWidth="fullWidth" @focus="onFocusPassword"/>
				<!-- 您所输入的是：{{value_password}} -->
			</mu-col>
			<mu-col>
				<mu-text-field label="确定密码" type="password" labelFloat v-model="value_password_verify" :errorText="errorText_password_verify" :fullWidth="fullWidth" @focus="onFocusPasswordVerify"/>
				<!-- 您所输入的是：{{value_password_verify}} -->
			</mu-col>
			<mu-col style="margin: 24px 0">
				<label id="btn_left" @click="goLogin">已有账号，立即登录！</label>
				<mu-raised-button label="注册" @click="haveDone" />
			</mu-col>
		</div>
	</div>
</template>

<script>

	// 注册字段：username、password、nickname
	// post方法，接口：/api/auth/register

	import Logo from '../../assets/Logo'
	import checkFormat from './js/CheckFormat.js'
	import { Toast } from 'vant'

	export default {
		name: 'Register',
		components: {
			Logo
		},
		data () {
			return {
				fullWidth: true,

				value_nickname: '',
				value_username: '',
				value_password: '',
				value_password_verify: '',
				errorText_nickname: '',
				errorText_username: '',
				errorText_password: '',
				errorText_password_verify: ''
			}
		},
		methods: {
			goHome () {
				this.$router.push({name: 'Home'});
			},
			goLogin () {
				this.$router.push({name: 'Login'})
			},
			check () {
				let obj = checkFormat.registerVerify(this.value_nickname, this.value_username, this.value_password, this.value_password_verify)
				// console.log(obj)
				this.errorText_nickname = obj.errorText_nickname;
				this.errorText_username = obj.errorText_username;
				this.errorText_password = obj.errorText_password;
				this.errorText_password_verify = obj.errorText_password_verify;
			},
			haveDone () {
				let _this = this;
				this.check();
				if (this.errorText_nickname == '' && this.errorText_username == '' && this.errorText_password == '' && this.errorText_password_verify == '' ){
					console.log("信息正确，提交注册")
					_this.$store.dispatch('logout')
					this.$axios.post("/api/auth/register", {
						username: this.value_username,
						password: this.value_password,
						nickname: this.value_nickname
					})
					.then(function (response) {
						console.log(response);
						if (response.status == 200) {
							const toast = Toast.loading('注册成功…')
							let second = 2;
							const timer = setInterval(() => {
								second--;
								if (second == 1) {
									toast.message = '前往登录页面…';
								} else {
									clearInterval(timer);
									Toast.clear();
									let redirect = decodeURIComponent(_this.$route.query.redirect || "/login");
									_this.$router.push({ path: redirect });
								}
							}, 1000);
						}
					})
					.catch(function (error) {
						console.log(error);
						if (error.status == 400) {
								alert("该用户已存在！")
								// console.log("该用户已存在！")
							}
					})	//axios结束
				} else {
					this.check();
				}
			},

			// 当聚焦到相应输入框就将错误提示去掉
			onFocusNickname () {
				this.errorText_nickname = ''
			},
			onFocusUsername () {
				this.errorText_username = ''
			},
			onFocusPassword () {
				this.errorText_password = ''
				let verify = this.errorText_password_verify
				if (verify != '' || verify != null || verify != undefined) {
					this.value_password_verify = ''
					this.errorText_password_verify = ''
				}
			},
			onFocusPasswordVerify () {
				this.errorText_password_verify = ''
			},
		}
	}
</script>

<style scoped>
	@import url(./css/login.css);
</style>