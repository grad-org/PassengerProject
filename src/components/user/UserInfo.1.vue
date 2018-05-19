
<template>
	<div>
		<div ref="barDiv" >


		<mu-appbar title="返回">
			<mu-icon-button icon="arrow_back" slot="left" @click="goBack"/>
			<mu-flat-button label="编辑资料" slot="right" @click="goEdit"/> 
		</mu-appbar>
		<div ref="avaterDiv"  style="text-align: center; position: relative">
			<div :style="userBackground" style="float: left; width: 100%; height: 250px; filter: blur(64px); -webkit-filter: blur(64px); -moz-filter: blur(64px); -o-filter: blur(64px); -ms-filter: blur(64px); overflow: hidden"></div>
			<div style="position: absolute; left: 0; right: 0; top: 0">
				<mu-paper class="paper" circle :zDepth="1" >
					<img :src="avater" style="width: 100%; height: 100%"/>
				</mu-paper>
				<span style="font-size: 24px">{{nickname}}</span>
				<span style="margin-top: 6px; font-size: 18px; color: #666">不爱吃鱼的猫…</span>
			</div>
		</div>

		</div>

		<div ref="settingsDiv" :style="{height: mapHeight}" style="background: #fff; postion: relative">
			<mu-list style="padding: 8px 0 0 0" >
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
			{{fullHeight}}、{{barHeight}}、{{mapHeight}}、{{selectHeight}}
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
				ls_userinfo: '',
				userBackground: {
					backgroundImage: 'url(http://forcar.vip:8080/images/user/6.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: 'auto 200%'
					// backgroundSize: "150% auto"
				},

				// 组件高度控制
				fullHeight: document.documentElement.clientHeight,
				barHeight: '',
				selectHeight: '',
				mapHeight: ''
			}
		},
		created () {
			// 用户数据直接在本地获取
			let _this = this;
			_this.ls_userinfo = JSON.parse(window.localStorage.getItem('UserInfo'))
			_this.nickname = _this.ls_userinfo.nickname;
			// _this.avater = avater;
			_this.avater = this.$serverUrl + '/images/user/' + this.$store.state.userId + '.jpg';
			_this.isDriver();
			this.initHeight();
			this.setMapHeight();
		},
		mounted() {
			
		},
		methods: {
			goBack () {
				this.$router.push({name: 'Home'});
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
			},
			initHeight () {
				let _this = this
				window.onresize = function () {
					return ( ()=> {
						// 浏览器内容可视高度
						window.fullHeight = document.documentElement.clientHeight;
						_this.fullHeight = window.fullHeight;
						_this.selectHeight = _this.$refs.settingsDiv.clientHeight;
						_this.mapHeight = (_this.fullHeight - _this.barHeight - _this.selectHeight) + 'px';
					}) ()
				}
			},
			setMapHeight () {
				this.$nextTick (() => {
					this.barHeight = this.$refs.barDiv.$el.clientHeight;
					this.selectHeight = this.$refs.settingsDiv.clientHeight;
					// 页面加载后，对地图高度进行设置
					let h = this.fullHeight - this.barHeight - this.selectHeight;
					// console.log('地图高度：' +h);
					this.mapHeight = h + 'px';
				})
			},
		},
		watch: {
			// 如果 fullHeight 发生改变，这个函数就会运行
			fullHeight (val) {
				if(!this.timer) {
					this.fullHeight = val
					this.timer = true
					let that = this
					setTimeout(function () {
						that.timer = false
					}, 1000)
				}
				// console.log("触发watch的fullHeight")
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


