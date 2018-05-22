<template>
	<div>
		<mu-appbar ref="barDiv" title="设置" style="position: fixed; top: 0">
			<mu-icon-button icon="arrow_back" slot="left" @click="goBack"/>
		</mu-appbar>
		<div :style="listStyle" >	
			<h2>内容</h2>
			<mu-tabs :value="theme" @change="changeTheme">
				<mu-tab title="LIGHT (DEFAULT)" value="light"/>
				<mu-tab title="CARBON" value="carbon"/>
				<mu-tab title="TEAL" value="teal"/>
			</mu-tabs>
		</div>
	</div>
</template>

<script>

	// import light from '!raw!muse-ui/dist/theme-default.css'
	// import dark from '!raw!muse-ui/dist/theme-dark.css'
	// import carbon from '!raw!muse-ui/dist/theme-carbon.css'
	// import teal from '!raw!muse-ui/dist/theme-teal.css'
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
					dark,
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
	
</style>