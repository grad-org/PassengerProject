
<template>
	<div>
		<!-- <mu-appbar ref="barDiv" title="取消">
			<mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack"/>
			<mu-flat-button label="完成" slot="right" @click="updateProfiles"/> 
		</mu-appbar> -->
		<van-nav-bar
			title="编辑资料"
			left-text="返回"
			right-text="完成"
			left-arrow
			fixed
			@click-left="goBack"
			@click-right="updateProfiles"
			ref="NavBar"
		/>
		<div :style="FixedTop">
			<div class="block_title">
				用户头像
			</div>
			<div style="padding: 0 15px" class="van-cell-group van-hairline--top-bottom imageDiv">
				<!-- <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple style="z-index: 3">
					<mu-paper class="paper" circle :zDepth="1" style="position: relative">
						<img :src="avater" style="width: 100%; height: 100%; z-index: 1;"/>
						<div style="background: rgba(0,0,0,0.2); z-index: 2; position: absolute; left: 0; right: 0; top: 0; bottom: 0"><van-icon name="photograph" width="30px" style="position: absolute; left: 0; right: 0; bottom: 31px; font-size: 20px; color: rgba(255,255,255,0.8)"/></div>
					</mu-paper>
				</van-uploader> -->
				<div >
					<mu-paper class="paper" circle :zDepth="1" style="position: relative; float: left">
						<img :src="avater" style="width: 100%; height: 100%; z-index: 1;"/>
						<div style="background: rgba(0,0,0,0.15); z-index: 2; position: absolute; left: 0; right: 0; top: 0; bottom: 0" v-if="unUpload"><van-icon name="photograph" width="30px" style="position: absolute; left: 0; right: 0; bottom: 27px; font-size: 20px; color: rgba(255,255,255,0.8)"/></div>
						<van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png" multiple style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 3"></van-uploader>
					</mu-paper>
					<div style="height: 98px; line-height: 98px; margin-left: 92px; font-size: 16px; color: rgba(102, 102, 102, 1);" >上传头像</div>
				</div>
					<!-- <div>上传头像</div> -->
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
				<div class="van-cell van-cell__title van-hairline" @click="setAge">
					<div class="van-cell__title">
						<span class="van-cell__text">性别</span>
					</div>
					<div class="van-cell__value" :style="ageStyle">{{gender}}</div>
				</div>
			</van-cell-group>
			<!-- 年龄选择器 -->
			<mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
				222222222222
				45555555
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
	import avater from '../../assets/image/avater.jpg'

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
			this.avater = avater;
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
				let reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]{3,12}$/;
				if (this.nickname == null || this.nickname == undefined || this.nickname == '') {
				}
				else if (!reg.test(this.nickname)) {
					this.nickname = '';
					this.nicknamePlaceholder = '长度至少为3，且不含特殊符号！'
				} else {
					
				}
			},
			// 聚焦输入框
			checkNicknameFocus () {
				if (this.nickname == null || this.nickname == undefined || this.nickname == '') {
					this.nicknamePlaceholder = '起个有个性的名字吧 ^_^'
				}
			},
			updateProfiles () {
				this.$axios.post('/api/user/6',
				{
					'nickname': '越前君噢',
					'gender': '男',
					'age': '21',
					'userImage': this.userImage
				}).then((response) => {
					console.log(response);
				}).catch((error) => {
					console.log(error);
				})
			},
			onRead(file) {
				console.log(file);
				// console.log(file.content);
				this.userImage = file.content;
				this.avater = file.content;
				this.unUpload = false;	// 已上传图片，把遮罩层去掉
			},
			setAge () {
				this.ageStyle = {color: '#000'};
				this.bottomSheet = true;
			},
			closeBottomSheet () {
				this.bottomSheet = false;
			}
		}
	}
</script>

<style scoped>
	.block_title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, 0.6);
		padding: 15px 15px 8px 15px;
	}
	span {
		display: block
	}
	.van-cell__title {
		min-width: 90px;
	}
	.van-cell__value {
		text-align: left;
	}
	.imageDiv {
		background: #fff;
	}
	.paper {
		display: inline-block;
		height: 72px;
		width: 72px;
		margin: 12px 0 12px 0;
		text-align: center;
		overflow: hidden;
	}
</style>


