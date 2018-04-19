
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
				}
			}
		},
		created () {
			// 当placeStyle为0时，表示起点；若为1，则为终点
			console.log(this.$route.params.style)
			window.localStorage.placeStyle = this.$route.params.style
		},
		mounted() {
			var temp = this.$refs.barDiv.$el.clientHeight
			console.log(temp)
			this.listStyle.marginTop = this.$refs.barDiv.$el.clientHeight + 'px'
		},
		computed: {
			location () {
				return this.$store.state.localCity
			}
		},
		methods: {
			cancal () {
				this.$router.go(-1);
			},
			searchResult (result) {
				if (result == null || result == undefined || result == '') {
					console.log('无搜索结果')
					this.arr = null
				} else {

				console.log(result.tr)
				this.arr = result.tr
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
				let _style = window.localStorage.getItem('placeStyle');
				console.log(_style);
				if ( _style == 0 ) {
					this.$store.dispatch('setOutset', {title: this.items.title, address: this.items.address, point: this.items.point});
					console.log('state', this.$store.state.outset);
					this.$router.replace({name: 'Home'});
				}
				if ( _style == 1 ) {
					this.$store.dispatch('setDestination', {title: this.items.title, address: this.items.address, point: this.items.point});
					console.log('state', this.$store.state.destination);
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


