<template>
	<div>
		<mu-appbar ref="barDiv" title="确认呼叫">
			<mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack"/>
			<mu-icon-button icon="notifications" slot="right"/>
		</mu-appbar>
		<baidu-map-confirm ref="mapDiv" :style="{height: mapHeight}"></baidu-map-confirm>
		<confirm-selector ref="selectDiv"></confirm-selector>
	</div>
</template>

<script>
	/**
	 * 取消行程：需要删除一些东西：localstorage中的outset、destination、tripType，并且返回操作是不可逆的
	 */

	import BaiduMapConfirm from './map/BaiduMapConfirm'
	import ConfirmSelector from './selector/ConfirmSelector'

	export default {
		components: {
			BaiduMapConfirm, ConfirmSelector
		},
		data () {
			return {
				// 组件高度控制
				fullHeight: document.documentElement.clientHeight,
				barHeight: '',
				selectHeight: '',
				mapHeight: '',
			}
		},
		created () {
			// 后期需要作一个判断，如果outset、destination不存在，则会返回首页！
			// 还要考虑刷新页面，store.state会消失导致的问题！
			// this.ls_outset = JSON.parse(window.localStorage.getItem('Outset'));
			// this.outsetPoint = this.ls_outset.point;
			// this.zoom = 12
		},
		mounted () {
			this.initHeight();
			this.setMapHeight();
		},
		destroyed () {
			window.localStorage.removeItem('TripDistance');
			window.localStorage.removeItem('TripDuration');
			this.$store.dispatch('predictFare', null);
		},
		methods: {
			goBack () {
				this.$router.go(-1)
				// 返回上一页需要删除的东西
				window.localStorage.removeItem('ReservedTime');
			},
			initHeight () {
				let _this = this
				window.onresize = function () {
					return ( ()=> {
						// 浏览器内容可视高度
						window.fullHeight = document.documentElement.clientHeight
						_this.fullHeight = window.fullHeight
						_this.selectHeight = _this.$refs.selectDiv.$el.clientHeight
						// console.log('触发onresize事件，此时地图高度为：' + this.fullHeight)
						_this.mapHeight = (_this.fullHeight - _this.barHeight - _this.selectHeight) + 'px'
					}) ()
				}
			},
			setMapHeight () {
				this.$nextTick (() => {
					this.barHeight = this.$refs.barDiv.$el.clientHeight;
					this.selectHeight = this.$refs.selectDiv.$el.clientHeight;
					// 页面加载后，对地图高度进行设置
					let h = this.fullHeight - this.barHeight - this.selectHeight;
					// console.log('地图高度：' +h)
					this.mapHeight = h + 'px';
				})
			},
		},
		computed: {

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
			}
		}
	}
</script>

<style scoped>
	
</style>


