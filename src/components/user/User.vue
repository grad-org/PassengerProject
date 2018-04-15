
<template>
	<div>
		<mu-appbar title="返回">
			<mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack"/>
			<mu-flat-button color="#fff" label="编辑资料" slot="right"/>
		</mu-appbar>
		<div style="text-align: center; margin-bottom: 32px">
			<mu-paper class="paper" circle :zDepth="1" style="userAvater">
					<img :src="avater" style="width: 100%; height:100%" />
			</mu-paper>
			<br>
			<span style="font-size: 24px">{{nickname}}</span>
			<br>
			<span style="margin-top:6px; font-size: 16px; color: #777">不爱吃鱼的猫…</span>
		</div>
		<mu-list>
			<mu-sub-header>基本设置</mu-sub-header>
			<mu-divider />
			<mu-list-item title="实名认证" >
				<mu-avatar icon="folder" slot="leftAvatar"/>
				<mu-icon value="keyboard_arrow_right" slot="right"/>
			</mu-list-item>
			<mu-divider />
			<mu-list-item title="车主认证" >
				<mu-avatar icon="folder" slot="leftAvatar"/>
				<mu-icon value="keyboard_arrow_right" slot="right"/>
			</mu-list-item>
			<mu-divider />
		</mu-list>
	</div>
</template>

<script>

	import avater3 from "../../assets/image/avater3.jpg";

	export default {
		data () {
			return {
				username: '',
				nickname: '',
				avater: ''
			}
		},
		components: {
		},
		created () {
			this.nickname = window.localStorage.getItem('nickname')
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
		methods: {
			goBack () {
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.paper {
		display: inline-block;
		height: 90px;
		width: 90px;
		margin: 16px auto;
		text-align: center;
		overflow: hidden;
	}
	span {
		display: inline-block;
	}
</style>

