
<template>
	<div>
		<mu-appbar >
			<mu-text-field icon="search" class="appbar-search-field" v-model="keyword" slot="left" hintText="请输入搜索内容"/>
			<mu-flat-button label="取消" slot="right" @click="cancal"/>
		</mu-appbar>
		<ul>
			<li v-for="a in arr">
				{{a.address}}
				<mu-divider/>
			</li>
		</ul>
		<baidu-map>
			<bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false" :location="location" forceLocal="true" :pageCapacity="30" @searchcomplete="searchResult2" @resultshtmlset="searchResult"></bm-local-search>
		</baidu-map>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				keyword: '',
				items: [
					{title: '', address: '', point: {lng: '', lat: ''}}
				],
				address: null,
				arr: null
			}
		},
		created () {
			console.log(this.$route.params)
		},
		mounted() {
			
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
				// console.log(result)
			},
			searchResult2 (result) {
				console.log(result.tr)
				console.log(result.tr.length)
				this.address = result.tr.address
				this.arr = result.tr
				for (var i = 0; i < arr.length; i++) {
					this.items.title = arr.title;
					this.items.address = arr.address;
					this.items.point.lng = arr.point.lng;
					this.items.point.lat = arr.point.lat;
				}
			}
		}
	}
</script>

<style scoped>
	.appbar-search-field{
	color: #FFF;
	margin-bottom: 0;
	}
	.focus-state {
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
</style>


