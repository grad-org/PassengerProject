
<template>
	<div>
		<mu-appbar title="取消">
			<mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack"/>
			<mu-flat-button color="#fff" label="完成" slot="right"/>
		</mu-appbar>
		
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

