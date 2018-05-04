<template>
	<div>
		<!-- 顶栏 -->
		<bar ref="barDiv" ></bar>
		<!-- 地图区域 -->
		<baidu-map ref="mapDiv" :style="{height: mapHeight}"></baidu-map>
		<!-- 选择区域 -->
		<selector ref="selectDiv" @heightChanged="updateSelectorHeight($event)"></selector>
	</div>
</template>

<script>

import Bar from './Bar'
import BaiduMap from './map/BaiduMap'
import Selector from './selector/Selector'

export default {
	name: 'Home',
	components: {
		BaiduMap, Selector, Bar
	},
	data () {
		return {

			// 首页组件高度控制
			fullHeight: document.documentElement.clientHeight,
			barHeight: '',
			selectHeight: '',
			mapHeight: ''

		}
	},
	created() {
		
	},
	mounted () {
		this.$nextTick (() =>{
			this.selectedCity = this.$store.state.localCity;
		});
		this.initHeight();
		this.setMapHeight();
	},
	methods: {
		initHeight () {
			let _this = this
			// 注：window.onresize只能在项目内触发1次
			// 通过捕获系统的onresize事件触发我们需要执行的事件
			// 参考：https://blog.csdn.net/bai_riqiang/article/details/78749667
			window.onresize = function () {
				return (()=> {
					// 浏览器内容可视高度
					window.fullHeight = document.documentElement.clientHeight
					_this.fullHeight = window.fullHeight
					_this.selectHeight = _this.$refs.selectDiv.$el.clientHeight
					// console.log('触发onresize事件，此时地图高度为：' + this.fullHeight)
					_this.mapHeight = (_this.fullHeight - _this.barHeight - _this.selectHeight) + 'px'
				}) ()
			}
		},
		updateSelectorHeight(event) {
			// console.log("updateSelectorHeight事件")
			this.setMapHeight()
			this.$nextTick (() =>{
				this.selectedCity = this.$store.state.localCity
			})
		},
		setMapHeight () {
			this.$nextTick (() => {
				this.barHeight = this.$refs.barDiv.$el.clientHeight
				this.selectHeight = this.$refs.selectDiv.$el.clientHeight
				
				// 页面加载后，对地图高度进行设置
				let h = this.fullHeight - this.barHeight - this.selectHeight
				// console.log('地图高度：' +h)
				this.mapHeight = h + 'px'
			})
		},
		logout () {
			this.$store.commit(this.$types.LOGOUT);
			let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
			this.$router.push({path: redirect})
		},
		toggle(flag) {
			this.open_drawer = !this.open_drawer;
			this.docked = !flag;
		},
		toCitySelector: function () {
			this.$router.push({name:'CitySelect'})
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
	.user-info {
		height: 30%;
		background: #e0e0e0
	}
	.mu-list {
		/* 默认padding为8px */
		padding: 0
	}
</style>
