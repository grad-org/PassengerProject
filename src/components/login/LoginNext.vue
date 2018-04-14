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
		<mu-dialog :open="dialog" title="Alert Dialog">
			只有点击确定按钮才可以关闭对话框
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
				dialog: false
				
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
				// const toast = Toast.loading({
				// 	mask: true,
				// 	duration: 0,	// 持续展示 toast
				// 	forbidClick: true,	// 禁用背景点击
				// 	message: '出现错误…'
				// });
				// let second = 1;
				// const timer = setInterval(() => {
				// 	second--;
				// 	if (second == 0) {
				// 		clearInterval(timer);
				// 		Toast.clear();
				// 		let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
				// 		this.$router.push({path: redirect})
				// 	}
				// }, 1000);
			} else {
				this.info = "使用手机号码 " + this.$route.params.username + " 登录"
			}
		},
		methods: {
			goHome () {
				this.$router.push({name: 'Home'});
			},
			haveDone () {
				this.errorText_password = checkFormat.checkPassword(this.value_password)
				let that = this;
				if (this.errorText_password == '') {
					this.$axios.post("/auth/login",
						{
							username: "ppp", 
							password: "a123456"
							// username: "admin", 
							// password: "admin"
							// username: that.$route.params.username,
							// password: that.value_password
						},
						{
							headers: {'Content-Type': 'application/json'}
						}
					)
					.then(function (response) {
						console.log(response);
						// console.log('返回的token：' + response.data.token);
						if (response.status == 200) {
								store.commit(types.LOGIN, response.data.token)
								that.$store.commit(that.$types.LOGIN, response.data.token)
								// that.$router.push({path: '/', name: 'Home', params:{ userId: response.status }})
						} else {
							alert("登录失败")
						}
					})
					.catch(function (error) {
						console.log(error);
						// alert(error)
						// that.dialog = true;
					})
				} else {
					this.errorText_password = checkFormat.checkPassword(this.value_password)
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
