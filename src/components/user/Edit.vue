
<template>
	<div>
		<van-nav-bar ref="NavBar" title="编辑资料" left-text="返回" right-text="完成" left-arrow fixed @click-left="goBack" @click-right="updateProfiles" />
		<div :style="FixedTop">
			<div class="block_title">
				用户头像
			</div>
			<div style="padding: 0 15px" class="van-cell-group van-hairline--top-bottom imageDiv">
				<div>
					<mu-paper class="paper" circle :zDepth="1">
						<img :src="avater" class="avaterClass" />
						<div class="maskClass" v-if="unUpload">
							<van-icon name="photograph" width="30px" class="iconClass"/>
						</div>
						<van-uploader class="uploaderClass" :after-read="uploadedImg" accept="image/gif, image/jpeg, image/png" multiple></van-uploader>
					</mu-paper>
					<div class="avaterTipsClass" @click="deleteImg">
						{{avaterTips}}
					</div>
				</div>
			</div>
			<div class="block_title">
				基本资料
			</div>
			<van-cell-group>
				<van-field v-model="nickname" label="昵称" type="textarea" :placeholder="nicknamePlaceholder" minlength="3" maxlength="12" rows="1" autosize @blur="checkNicknameBlur" @focus="checkNicknameFocus"/>
				<div class="van-cell van-cell__title van-hairline" @click="setAge">
					<div class="van-cell__title">
						<span class="van-cell__text">年龄</span>
					</div>
					<div class="van-cell__value" :style="ageStyle">{{age}}</div>
				</div>
				<div class="van-cell van-cell__title van-hairline" @click="setGender">
					<div class="van-cell__title">
						<span class="van-cell__text">性别</span>
					</div>
					<div class="van-cell__value" :style="ageStyle">{{gender}}</div>
				</div>
			</van-cell-group>
			<!-- 年龄选择器 -->
			<mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
				<!-- <div class="van-hairline--top-bottom van-picker__toolbar">
					<div class="van-picker__cancel" @click="closeBottomSheet">取消</div>
					<div class="van-picker__confirm" >确认</div>
				</div> -->
				<van-picker :columns="ageColumns" show-toolbar @cancel="closeBottomSheet" @confirm="onConfirmAge" v-if="age_picker"/>
				<van-picker :columns="genderColumns" show-toolbar @cancel="closeBottomSheet" @confirm="onConfirmGender" v-else/>
			</mu-bottom-sheet>
		</div>
	</div>
</template>

<script>
	/**
	 * 设置背景图片，参考：https://blog.csdn.net/woyidingshijingcheng/article/details/72903800
	 * 
	 * 仍需解决问题： 本地获取头像，设置头像
	 * 如果认证回来，应该重新获取一次用户信息，用来覆盖localstorage信息，否则认证信息可能未更新！
	 */
	import Avater from '../../assets/image/avater.jpg'
	import CheckFormat from './js/CheckNicknameFormat.js'

	export default {
		data() {
			return {
				avater: null,
				nickname: '',
				username: '',
				age: '',
				gender: '',
				userImage: null,
				ls_userinfo: '',
				unUpload: true,
				genderColumns: ['男', '女'],
				ageColumns: [],
				age_picker: true,
				avaterTips: '上传头像',
				// 置顶值
				FixedTop: {
					marginTop: ''
				},
				ageStyle: {
					// color: 'red !important'
					// opacity: 0.9,
					// filter:'alpha(opacity=70)',
					// color: '#666',
					// backgroundColor: 'transparent'
				},
				
				bottomSheet: false,
				nicknamePlaceholder: '起个有个性的名字吧 ^_^'
			}
		},
		created () {
			// 用户数据直接在本地获取
			this.ls_userinfo = JSON.parse(window.localStorage.getItem('UserInfo'))
			this.nickname = this.ls_userinfo.nickname;
			this.age = this.ls_userinfo.age;
			this.gender = this.ls_userinfo.gender;
			this.avater = this.$serverUrl + '/images/user/' + this.$store.state.userId + '.jpg';
			let currentYear = new Date().getFullYear();
			for (let i = 0, beginY = 1899; beginY < currentYear; i++) {
				this.ageColumns.push(currentYear - i)
				beginY++;
			}
		},
		mounted() {
			this.FixedTop.marginTop = this.$refs.NavBar.$el.clientHeight + 'px';
		},
		methods: {
			goBack () {
				this.$router.go(-1);
			},
			// 离开输入框检查用户昵称格式
			checkNicknameBlur () {
				let obj = CheckFormat.checkNickname(this.nickname);
				this.nickname = obj.nickname;
				this.nicknamePlaceholder = obj.nicknamePlaceholder;
			},
			// 聚焦输入框
			checkNicknameFocus () {
				if (this.nickname == null || this.nickname == undefined || this.nickname == '') {
					this.nicknamePlaceholder = '起个有个性的名字吧 ^_^'
				}
			},
			updateProfiles () {
				this.$axios.post('/api/user/' + this.$store.state.userId,
				{
					'nickname': this.nickname,
					'gender': this.gender,
					'age': this.age,
					'userImage': this.userImage
				}).then((response) => {
					console.log('更新资料返回：', response);
					if (response.status == 200) {
						// 资料更新成功，重新设置用户资料和头像
						window.localStorage.setItem('UserInfo', JSON.stringify(response.data.data));
						const toast = this.$toast.loading({
							duration: 0,
							forbidClick: true,
							message: '资料更新成功'
						});
						let second = 2;
						const timer = setInterval(() => {
							second--;
							if (second == 1) {
								toast.message = '返回上一页…';
							} else {
								clearInterval(timer);
								this.$toast.clear();
								this.$router.push({name: 'User'})
							}
						}, 1000);
					}
				}).catch((error) => {
					console.log(error);
					if (error.status == 405) {
						alert(error.message)
					}
				})
			},
			uploadedImg (file) {
				// console.log(file);
				this.userImage = file.content;
				this.avater = file.content;
				this.unUpload = false;	// 已上传图片，把遮罩层去掉
				this.avaterTips = '已选图片，点击这里可删除！'
			},
			deleteImg () {
				this.avater = this.$serverUrl + '/images/user/' + this.$store.state.userId + '.jpg';
				this.unUpload = true;
				this.avaterTips = '上传头像'
			},
			setAge () {
				this.ageStyle = {color: '#000'};
				this.bottomSheet = true;
				this.age_picker = true;
			},
			setGender () {
				this.bottomSheet = true;
				this.age_picker = false;
			},
			closeBottomSheet () {
				this.bottomSheet = false;
			},
			onConfirmGender (value, index) {
				this.gender = value;
				this.bottomSheet = false;
			},
			onConfirmAge (value, index) {
				let temp = new Date().getFullYear();
				this.age = temp - parseInt(value);
				this.bottomSheet = false;
			}
		}
	}
</script>

<style scoped>
	@import './css/vant-style.css';
	span {
		display: block
	}
	.imageDiv {
		background: #fff;
	}
	.paper {
		/* display: inline-block; */
		display: block;
		height: 72px;
		width: 72px;
		margin: 12px 0 12px 0;
		text-align: center;
		overflow: hidden;
		position: relative;
		float: left;
	}
	.avaterClass {
		width: 100%;
		height: 100%;
		z-index: 1
	}
	.maskClass {
		background: rgba(0,0,0,0.15);
		z-index: 2;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0
	}
	.iconClass {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 27px;
		font-size: 20px;
		color: rgba(255,255,255,0.8)
	}
	.uploaderClass {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 3
	}
	.avaterTipsClass {
		height: 98px;
		line-height: 98px;
		margin-left: 92px;
		font-size: 14px; color:
		rgba(102, 102, 102, 1);
	}
</style>


