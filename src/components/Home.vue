<template>
	<div>
		<!-- 顶栏 -->
		<bar ref="barDiv" ></bar>
		<!-- 地图区域 -->
		<baidu-map ref="mapDiv" :style="{height: mapHeight}" @getOutset="getOutset($event)" ></baidu-map>
		<!-- 选择区域 -->
		<selector ref="selectDiv" @heightChanged="updateSelectorHeight($event)"></selector>
	</div>
</template>

<script>

import Bar from './Bar'
<<<<<<< HEAD
import BaiduMap from './map/BaiduMap'
=======
import BaiduMap from './Map/BaiduMap'
>>>>>>> develop
import Selector from './Selector'

export default {
	name: 'Home',
	components: {
		BaiduMap, Selector, Bar
	},
	data () {
		return {
			yourOutset: "",
			yourDestination: "",

			// 首页组件高度控制
			fullHeight: document.documentElement.clientHeight,
			barHeight: '',
			selectHeight: '',
			mapHeight: ''

		}
	},
	created() {
<<<<<<< HEAD
		
=======
		// console.log('读取Home的token：'+ localStorage.getItem('token'))
		const str1 = '1'
		const str2 = '2'
		console.log(str1, str2)
		console.log('Home路由参数：', this.$route.params)
>>>>>>> develop
	},
	mounted () {
		this.$nextTick (() =>{
			this.selectedCity = this.$store.state.localCity
		})
<<<<<<< HEAD
=======

>>>>>>> develop
		this.initHeight()
		this.setMapHeight()
	},
	methods: {
		initHeight () {
<<<<<<< HEAD
			let _this = this
=======
			let that = this
>>>>>>> develop
			// 注：window.onresize只能在项目内触发1次
			// 通过捕获系统的onresize事件触发我们需要执行的事件
			// 参考：https://blog.csdn.net/bai_riqiang/article/details/78749667
			window.onresize = function () {
				return (()=> {
					// 浏览器内容可视高度
					window.fullHeight = document.documentElement.clientHeight
<<<<<<< HEAD
					_this.fullHeight = window.fullHeight
					_this.selectHeight = _this.$refs.selectDiv.$el.clientHeight
					// console.log('触发onresize事件，此时地图高度为：' + this.fullHeight)
					_this.mapHeight = (_this.fullHeight - _this.barHeight - _this.selectHeight) + 'px'
=======
					that.fullHeight = window.fullHeight
					that.selectHeight = that.$refs.selectDiv.$el.clientHeight
					// console.log('触发onresize事件，此时地图高度为：' + this.fullHeight)
					that.mapHeight = (that.fullHeight - that.barHeight - that.selectHeight) + 'px'
>>>>>>> develop
				}) ()
			}
		},
		updateSelectorHeight(event) {
			console.log("updateSelectorHeight事件")
			this.setMapHeight()
			this.$nextTick (() =>{
				this.selectedCity = this.$store.state.localCity
			})
		},
		setMapHeight () {
			this.$nextTick (() => {
<<<<<<< HEAD
=======
				console.log("调用$nextTick函数");
>>>>>>> develop
				this.barHeight = this.$refs.barDiv.$el.clientHeight
				this.selectHeight = this.$refs.selectDiv.$el.clientHeight
				
				// 页面加载后，对地图高度进行设置
				let h = this.fullHeight - this.barHeight - this.selectHeight
<<<<<<< HEAD
				console.log('地图高度：' + h +'px')
				this.mapHeight = h + 'px'
			})
		},
=======
				console.log('地图高度：' +h)
				this.mapHeight = h + 'px'
				console.log(this.mapHeight)
			})
		},
		logout () {
			this.$store.commit(this.$types.LOGOUT);
			let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
			this.$router.push({path: redirect})
		},
>>>>>>> develop
		toggle(flag) {
			this.open_drawer = !this.open_drawer;
			this.docked = !flag;
		},
		getOutset: function(outset) {
			this.yourOutset = outset
		},
		toCitySelector: function () {
			this.$router.push({name:'CitySelect'})
		},
	},
	watch: {
<<<<<<< HEAD
		// 如果 `fullHeight` 发生改变，这个函数就会运行
=======
		// 如果 fullHeight 发生改变，这个函数就会运行
>>>>>>> develop
		fullHeight (val) {
			if(!this.timer) {
				this.fullHeight = val
				this.timer = true
<<<<<<< HEAD
				let _this = this
				setTimeout(function () {
					_this.timer = false
				}, 1000)
			}
			console.log("触发watch的fullHeight")
=======
				let that = this
				setTimeout(function () {
					that.timer = false
				}, 1000)
			}
			// console.log("触发watch的fullHeight")
>>>>>>> develop
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
