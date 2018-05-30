<template>
	<div>
		<mu-appbar ref="barDiv" title="设置" style="position: fixed; top: 0; text-align: center;">
			<mu-icon-button icon="arrow_back" slot="left" @click="goBack"/>
			<mu-flat-button slot="right" style="width: 48px" disabled/> 
		</mu-appbar>
		<div :style="listStyle" >	
			<div class="block_title">
				个性化设置
			</div>
			<mu-tabs :value="theme" @change="changeTheme">
				<mu-tab title="紫色" value="light"/>
				<mu-tab title="炭黑" value="carbon"/>
				<mu-tab title="水鸭蓝" value="teal"/>
			</mu-tabs>
		</div>
	</div>
</template>

<script>

	import light from '!raw-loader!muse-ui/dist/theme-default.css'
	import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
	import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
	import teal from '!raw-loader!muse-ui/dist/theme-teal.css'

	export default {
		data () {
			return {
				theme: 'light',
				themes: {
					light,
					carbon,
					teal
				},
				listStyle: {
					marginTop: '',	// 用于判断Bar高度
					overFlow_y: 'auto'
				},
			}
		},
		computed: {

		},
		created () {

		},
		mounted () {
			this.listStyle.marginTop = this.$refs.barDiv.$el.clientHeight + 'px';
		},
		methods: {
			goBack () {
				// this.$router.go(-1);
				this.$router.push({name: 'Home'});
			},
			changeTheme (theme) {
				this.theme = theme;
				const styleEl = this.getThemeStyle();
				styleEl.innerHTML = this.themes[theme] || '';
			},
			getThemeStyle () {
				const themeId = 'muse-theme';
				let styleEl = document.getElementById(themeId);
				if (styleEl) return styleEl;
				styleEl = document.createElement('style');
				styleEl.id = themeId;
				document.body.appendChild(styleEl);
				return styleEl;
			}
		}
	}
</script>

<style scoped>
	@import './user/css/vant-style.css';
</style>