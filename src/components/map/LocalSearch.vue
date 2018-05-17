
<template>
	<div>
		<div v-if="citySelectorClose"> 
			<div ref="barDiv" style="position: fixed; top: 0; width: 100%; padding: 4px 0; background: #fff">
				<!-- <form action="/">
					<van-search
						v-model="keyword"
						placeholder="搜索地址..."
						show-action
						@search=""
						@cancel="cancal"
						style="background: #fff"
					/>
				</form> -->
				<mu-row >
					<mu-col width="20" tablet="20" desktop="20">
						<div style=" overflow: hidden; text-align: center; padding: 6px 0 6px 14px">
							<van-button size="small" @click="openSelector" style="height: 34px; margin: -2px 0">{{location}}</van-button>
						</div>
					</mu-col>
					<mu-col width="80" tablet="80" desktop="80">
						<div style="background:#abcdef; overflow: hidden">
							<!-- <mu-text-field hintText="提示文字"/><br/> -->
							<form action="/">
								<van-search
									v-model="keyword"
									placeholder="搜索地址..."
									show-action
									@search=""
									@cancel="cancal"
									style="background: #fff"
								/>
							</form>
						</div>
					</mu-col>
					<!-- <mu-col width="30" tablet="20" desktop="33">
						<div style="background: #abcdef; overflow: hidden">
							<mu-flat-button label="取消"/>
						</div>
					</mu-col> -->
				</mu-row>
			</div>
			<!-- 空的Div用于抵消padding -->
			<div></div>
			<div :style="listStyle">
				<div v-if="arr == null" style="text-align: center; height: 500px; line-height: 500px" >
					<!-- <van-icon name="location" /> -->
					<h1>{{searchResultTips}}</h1>
				</div>
				<!-- 若当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。想避免这情况可以将 v-if 置于外层元素 -->
				<!-- 使用v-for时，如有warning提示：component lists rendered with v-for should have explicit keys，说明没有添加 key 属性，官方建议加上 -->
				<div v-else>
					<div style="padding: 8px 8px 8px 8px;">
						<div v-for="(a, index) in arr"  :key="index">
							<van-cell-group class="block1" >
								<van-cell :title="a.title" is-link style="font-size: 16px; font-weight: bold" @click="itemClick(index)"/>
								<van-cell icon="location" :title="a.address" :clickable="true" style="color: #757575" @click="itemClick(index)"/>
							</van-cell-group>
							<div style="height: 8px"></div>
						</div>
					</div>
				</div>
				<!-- panel="false"将搜索返回结果隐藏 -->
				<baidu-map>
					<bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false" :location="location" :forceLocal="true" :pageCapacity="30" @searchcomplete="searchResult" ></bm-local-search>
				</baidu-map>
			</div>
		</div>
		<div v-else>
			<city-selector-search @switchMode="closeSelector" @destinationSelect="destinationSelect($event)" @outsetSelect="outsetSelect($event)"></city-selector-search>
		</div>
	</div>
</template>

<script>

	// 还需要考虑的问题，选择的地点是存在store.state还是localStorage

	import { Toast } from 'vant'
	import { Search } from 'vant'
	import { Cell} from 'vant'
	import { CellGroup } from 'vant'
	import { Button } from 'vant'
	// import { Icon } from 'vant'
	import CitySelectorSearch from '../city/CitySelectorSearch'

	export default {
		components: {
			[Toast.name]: Toast,
			[Search.name]: Search,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Button.name]: Button,
			// [Icon.name]: Icon,
			CitySelectorSearch,
		},
		data() {
			return {
				keyword: '',
				location: '',
				items: [
					{title: '', address: '', point: ''}
				],
				arr: null,
				searchResultTips: '请输入关键词进行搜索...',
				listStyle: {
					marginTop: '',
				},
				// 用来判断是终点还是起点
				placeStyle: '',

				city: {
					isShow: false,
					cityData: [],
					onChoose: null,
					localCity: {},
					starCity: []
				},
				citySelectorClose: true,	// 城市选择器关闭状态
			}
		},
		computed: {
			listenLocation () {
				if (window.localStorage.getItem('PlaceStyle') == 'destination') {
					if (window.localStorage.getItem('TempDestinationCity') == null) {
						console.log('终点，这里！')
						console.log(window.localStorage.getItem('TempDestinationCity'));
						this.location = this.$store.state.currentCity;
					} else {
						console.log('起点11111111111，这里！')
						this.location = window.localStorage.getItem('TempDestinationCity');
					}
				} else {
					this.location = this.$store.state.currentCity
				}
			}
		},
		created () {
			// 当placeStyle为0时，表示起点；若为1，则为终点
			// 加载页面先判断style是否为空？如果为空，则读取本地的PlaceStyle；若不空则读取参数
			this.location = this.$store.state.currentCity;
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
			this.listStyle.marginTop = this.$refs.barDiv.clientHeight + 'px';
		},
		destoryed () {
			// 选择一次清空一次
			window.localStorage.removeItem('TempDestinationCity');
		},
		methods: {
			cancal () {
				this.$router.replace({path: '/', name: 'Home', params: {searchStatus: true}});
			},
			searchResult (result) {
				if (result == null || result == undefined || result == '') {
					console.log('无搜索结果');
					this.arr = null;
					if (this.keyword == '' || this.keyword == null) {
						this.searchResultTips = '请输入关键词搜索...';
					} else {
						this.searchResultTips = '抱歉！搜索不到(／_＼)';
					}
				} else {
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
					this.$router.replace({path: '/', name: 'Home', params: {searchStatus: true}});
					this.$store.dispatch('city', this.location);
				}
				if ( this.placeStyle == 'destination' ) {
					this.$store.dispatch('setDestination', {title: this.items.title, address: this.items.address, point: this.items.point});
					window.localStorage.setItem('Destination', JSON.stringify(this.$store.state.destination));
					this.$router.replace({path: '/', name: 'Home', params: {searchStatus: true}});
				}
			},
			// 打开城市选择器
			openSelector () {
				this.citySelectorClose = false;
			},
			// 关闭城市选择器
			closeSelector () {
				this.citySelectorClose = true;
			},
			destinationSelect (event) {
				this.location = event;
			},
			outsetSelect(event) {
				this.location = event;
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
	.block1 {
		background: #eee;
		-webkit-box-shadow: #eee 0px 0px 4px 4px;
		-moz-box-shadow: #eee 0px 0px 4px 4px;
		box-shadow: #eee 0px 0px 4px 4px;
	}
	.van-search__action-text {
		color: #000
	}
</style>


