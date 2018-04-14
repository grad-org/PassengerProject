
<template>
	<!-- 侧栏 -->
	<div>
		<mu-drawer :width="width" :zDepth="zDepth" :open="open_drawer" :docked="docked" @close="toggle()">
			<router-link to="login">
				<mu-list-item @itemClick="docked ? '' : toggle()" class="user-info" title="越前君" >
						<mu-avatar slot="left" :src="avater" :size="30" />
				</mu-list-item>
			</router-link>
			<mu-list>
				<mu-list-item title="行程" rightIcon="keyboard_arrow_right">
					<mu-icon slot="left" value="local_taxi" />
				</mu-list-item>
				<mu-list-item title="钱包">
					<mu-icon slot="left" value="account_balance_wallet" />
				</mu-list-item>
				<mu-list-item title="设置">
					<mu-icon slot="left" value="settings" />
				</mu-list-item>
				<mu-list-item title="客服">
					<mu-icon slot="left" value="live_help"/>
				</mu-list-item>
				<mu-list-item title="退出" @click="logout">
					<mu-icon slot="left" value="close"/>
				</mu-list-item>
			</mu-list>
		</mu-drawer>
		<!-- 顶栏区域 -->
		<mu-appbar ref="barDiv" title="蔚蓝出行">
			<mu-icon-button icon="menu" slot="left" v-on:click="toggle(true)"/>
			<mu-flat-button color="#fff" :label="selectedCity" slot="right" @click="toCitySelector"/>
			<mu-icon-button icon="notifications" slot="right">
			</mu-icon-button>
		</mu-appbar>
	</div>
</template>

<script>

	import avater from "../assets/image/avater.jpg";

	export default {
		data() {
			return {
				// Drawer
				open_drawer: false,
				docked: true,
				zDepth: 0,
				width: "60%",
				// avater
				avater: avater,
			}
		},
		mounted() {
			
		},
		computed: {
			selectedCity () {
				return this.$store.state.localCity
			}
		},
		methods: {
			toggle(flag) {
				this.open_drawer = !this.open_drawer;
				this.docked = !flag;
			},
			logout() {
				this.$store.commit(this.$types.LOGOUT);
				let redirect = decodeURIComponent(this.$route.query.redirect || "/login");
				this.$router.push({ path: redirect });
			},
			toCitySelector: function() {
				this.$router.push({ name: "CitySelect" });
			}
		}
	}
</script>

<style scoped>
	.user-info {
		height: 30%;
		background: #e0e0e0;
	}
	.mu-list {
		/* 默认padding为8px */
		padding: 0;
	}
</style>


