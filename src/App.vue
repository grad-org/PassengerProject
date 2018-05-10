
<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

	import SockJS from '../static/utils/sockjs.js'
	import Stomp from 'stompjs'

	export default {
		name: 'App',
		data () {
			return {
				// stompClient: null,
			}
		},
		created () {
			// // 当token不存在时，不进行连接
			// if (window.localStorage.getItem('Token') != null) {
				
			// 	let sock = new SockJS('http://online-ride-hailing.herokuapp.com/orh');
			// 	this.stompClient = Stomp.over(sock);
			// 	this.connect();
			// }
		},
		methods: {
			// onConnected (frame) {
			// 	// 连接成功回调，进行订阅
			// 	// console.log('服务器连接成功');
			// 	this.$store.dispatch('setStompClient', {obj: this.stompClient, status: true});
			// },
			// onError (frame) {
			// 	// 连接失败回调，打印错误
			// 	console.log('Failed：', frame);
			// },
			// connect () {
			// 	// 进行连接
			// 	let token = window.localStorage.getItem('Token');
			// 	this.stompClient.connect({'Auth-Token': token}, this.onConnected, this.onError);
			// },
			// onSend () {
			// 	// 发送消息
			// }
		}
	}
</script>

<style>

</style>
