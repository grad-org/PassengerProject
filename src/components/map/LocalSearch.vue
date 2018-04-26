
<template>
	<div>
		<mu-appbar ref="barDiv" style="position: fixed; top: 0">
			<mu-text-field icon="search" class="appbar-search-field" v-model="keyword" slot="left" hintText="请输入搜索关键词"/>
			<mu-flat-button label="取消" slot="right" @click="cancal"/>
		</mu-appbar>
		<div :style="listStyle">
			<div v-if="arr == null" style="text-align: center" >
				<h1>无搜索结果</h1>
			</div>
			<!-- 若当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。想避免这情况可以将 v-if 置于外层元素 -->
			<!-- 使用v-for时，如有warning提示：component lists rendered with v-for should have explicit keys，说明没有添加 key 属性，官方建议加上 -->
			<div v-else>
				<mu-list v-for="(a, index) in arr"  @itemClick="itemClick(index)" :key="index">
					<mu-list-item  :title="a.title" :describeText="a.address" >
						<mu-icon value="grade" slot="left" />
						<mu-icon value="info" slot="right"/>
					</mu-list-item>
					<mu-divider/>
				</mu-list>
			</div>
			<!-- panel="false"将搜索返回结果隐藏 -->
			<baidu-map>
				<bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false" :location="location" :forceLocal="true" :pageCapacity="30" @searchcomplete="searchResult" ></bm-local-search>
			</baidu-map>
		</div>
	</div>
</template>

<script>

	// 还需要考虑的问题，选择的地点是存在store.state还是localStorage

	import { Toast } from 'vant'

	export default {
		data() {
			return {
				keyword: '',
				items: [
					{title: '', address: '', point: ''}
				],
				arr: null,
				marginTop: '',
				listStyle: {
					marginTop: ''
				},
				// 用来判断是终点还是起点
				placeStyle: ''
			}
		},
		created () {
			// 当placeStyle为0时，表示起点；若为1，则为终点
			// 加载页面先判断style是否为空？如果为空，则读取本地的PlaceStyle；若不空则读取参数
			let s = this.$route.params.style;
			if ( s == undefined || s == null || s =='') {
				// 判断localstorage中是否存在PlaceStyle字段，
				// 若不存在，则表示第一次直接输入路由进入该页面，这种情况会出错，返回首页！
				// 若存在，则可以解决刷新页面导致的问题
				let ls_ps = window.localStorage.getItem('PlaceStyle');
				if (ls_ps == undefined || ls_ps == null || ls_ps == '') {
					const toast = Toast.loading({
						duration: 0,
						forbidClick: true,
						message: '操作有误！'
					});
					let second = 2;
					const timer = setInterval( () => {
						second--;
						if (second == 1) {
							toast.message = '返回首页…';
						} else {
							clearInterval(timer);
							Toast.clear();
							this.$router.push({name: 'Home'});
						}
					})
				} else {
					this.placeStyle = window.localStorage.getItem('PlaceStyle')
				}
			} else {
				this.placeStyle = this.$route.params.style;
				window.localStorage.PlaceStyle = this.$route.params.style
			}
		},
		mounted() {
			var temp = this.$refs.barDiv.$el.clientHeight
			console.log(temp)
			this.listStyle.marginTop = this.$refs.barDiv.$el.clientHeight + 'px'
		},
		computed: {
			location () {
				return this.$store.state.currentCity
			}
		},
		methods: {
			cancal () {
				this.$router.go(-1);
			},
			searchResult (result) {
				console.log(result)
				if (result == null || result == undefined || result == '') {
					console.log('无搜索结果')
					this.arr = null
				} else {

				console.log(result.Br)
				this.arr = result.Br
				}
			},
			itemClick (index) {
				// console.log(index)
				// console.log('触发itemClick()事件')
				this.selectAddress(index)
			},
			selectAddress (index) {
				this.items.title = this.arr[index].title
				this.items.address = this.arr[index].address
				this.items.point = this.arr[index].point

				// 当placeStyle为0时，表示起点；若为1，则为终点
				if ( this.placeStyle == 'outset' ) {
					this.$store.dispatch('setOutset', {title: this.items.title, address: this.items.address, point: this.items.point});
					window.localStorage.setItem('Outset', JSON.stringify(this.$store.state.outset));
					this.$router.replace({name: 'Home'});
				}
				if ( this.placeStyle == 'destination' ) {
					this.$store.dispatch('setDestination', {title: this.items.title, address: this.items.address, point: this.items.point});
					window.localStorage.setItem('Destination', JSON.stringify(this.$store.state.destination));
					this.$router.replace({name: 'Home'});
				}
			}
		}
	}
</script>

<style lang="less" >
	.mu-list {
		/* 默认padding为8px */
		padding: 0;
	}
	.appbar-search-field{
		color: #FFF;
		margin-bottom: 0;
		&.focus-state {
			color: #FFF;
		}
		.mu-text-field-hint {
			color: fade(#FFF, 54%);
		}
		.mu-text-field-input {
			color: #FFF;
		}
		.mu-text-field-focus-line {
			background-color: #FFF;
		}
	}
</style>


