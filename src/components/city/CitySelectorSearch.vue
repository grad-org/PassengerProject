<template>
		<city 
			:is-show.sync='city.isShow'
			:on-choose='city.onChoose'
			:city-data='city.cityData'
			:local-city='city.localCity'
			:star-city='city.starCity'
			:close="closeCitySelector">
		</city>
</template>

<script>
	/**
	 * 城市数据，上海、北京暂时没有，需要加上去
	 */

	import City from 'vue-city'
	import cityList from './city.js'
	import hotCityList from './hotCity.js'
	
	export default {
		name: "CitySelector",
		components: {
			City
		},
		data () {
			return {
				city: {
					isShow: true,
					cityData: [],
					onChoose: null,
					localCity: {},
					starCity: []
				}
			}
		},
		created () {
			
		},
		mounted(){
			this.city.cityData = cityList.cityData();
			this.city.cityData = cityList.cityData();
			this.city.starCity = hotCityList.hotCityData();
			if (window.localStorage.getItem('PlaceStyle') == 'destination') {
				this.city.localCity = {cityId: "", cityName: window.localStorage.getItem('TempDestinationCity'), citySpell: "", cityFirstLetter: ""}
			} else {
				this.city.localCity = {cityId: "", cityName: this.$store.state.currentCity, citySpell: "", cityFirstLetter: ""};
			}
			let _this = this;	// onChoose 返回的this并不是指向Vue实例
			this.city.onChoose = function(res){
				_this.city.isShow = false;
				if (window.localStorage.getItem('PlaceStyle') == 'destination') {
					_this.$emit('destinationSelect', res.cityName);
					window.localStorage.setItem('TempDestinationCity', res.cityName);
				} else {
					console.log('56666666合理？？？？？')
					_this.$emit('outsetSelect', res.cityName);
					// _this.$store.dispatch('city', res.cityName);
				}
				_this.$emit('switchMode');
			}
			
		},
		methods: {
			choiceCity: function(){
				this.city.isShow = true;
			},
			// 关闭城市选择器
			closeCitySelector () {
				this.city.isShow = false;
				this.$emit('switchMode');
			},
		}
	}
</script>

<style scoped>
	html{
		font-size: 100%;
		background: #fff;
	}
	body{
		padding: 0.2rem 0.1rem !important;
		box-sizing: border-box;
	}
	.choice{
		font-size: 0.14rem;
		padding: 10px;
		border-radius: 3px;
		background: #fff;
		margin-bottom: 10px;
		border: solid 1px #e5e5e5;
		background: rgba(237, 85, 101, 0.8)!important;
		color: #fff;
	}
</style>
