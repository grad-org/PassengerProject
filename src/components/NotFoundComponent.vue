<template>
	<div :style="{height: fullHeight}" class="all">
		<div style="height: 200px"></div>
		<h1>Page Not Found，404！</h1>
		<mu-raised-button label="返回首页" class="demo-raised-button" @click="goHome"/>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				fullHeight: document.documentElement.clientHeight + 'px',
			}
		},
		created () {
			this.initHeight();
			this.setMapHeight();
			this.$router.push({name: 'Home'});
		},
		methods: {
			goHome () {
				this.$router.push({name: 'Home'})
			},
			initHeight () {
				let _this = this;
				window.onresize = function () {
					return (()=> {
						// 浏览器内容可视高度
						window.fullHeight = document.documentElement.clientHeight;
						_this.fullHeight = window.fullHeight + 'px';
					}) ()
				}
			},
			setMapHeight () {
				this.$nextTick (() => {
					this.fullHeight = document.documentElement.clientHeight + 'px';
				})
			},
		}
	}
</script>

<style scoped>
	* {
		text-align: center;
	}
	.all {
		background: #fff
	}
</style>


