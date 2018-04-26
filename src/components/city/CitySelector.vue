<template>
	<div id="app">
			<!-- <div class="choice" @click="choiceCity()">{{youChoiceCityName}}</div> -->
			<city 
				:is-show.sync='city.isShow'
				:on-choose='city.onChoose'
				:city-data='city.cityData'
				:local-city='city.localCity'
				:star-city='city.starCity'
				:close="close">
			</city>
		</div>
</template>

<script>
	/**
	 * 城市数据，上海、北京暂时没有，需要加上去
	 */

	import City from 'vue-city'
	import cityList from './city.js'
	
	export default {
		name: "CitySelector",
		components: {
			City
		},
		data () {
			return {
				youChoiceCityName: '请选择城市...',
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
			this.city.cityData = cityList.cityData()
			let that = this;
			this.getCityInfo();
			this.city.onChoose = function(res){
				//ToDo: 选完城市后......
				console.log(res);
				that.city.isShow = false;
				that.youChoiceCityName = '你选的城市是：' + res.cityName;
				this.$store.dispatch('city', res.cityName)
				this.$router.push({path:'/', name: 'Home', params: {selectStatus: true}});
			}
			
		},
		methods: {
			getCityInfo: function(){
				this.city.starCity = [
					{
						"cityId": "4401",
						"cityName": "广州市",
						"cityFirstLetter": "G",
						"provinceCode": "44"
						},{
						"cityId": "4403",
						"cityName": "深圳市",
						"cityFirstLetter": "S",
						"provinceCode": "44"
						},{
						"cityId": "5101",
						"cityName": "成都市",
						"cityFirstLetter": "C",
						"provinceCode": "51"
						}
				]
					
				this.city.localCity = {
					cityId: "",
					cityName: this.$store.state.currentCity,
					citySpell: "",
					cityFirstLetter: "",
				}
			},
            choiceCity: function(){
                this.city.isShow = true;
			},
			// 点击取消
			close(){
				this.city.isShow = false;
				this.$router.push({path:'/', name: 'Home', params: {selectStatus: true}});
			}
		}
	}
</script>

<style scoped>
        html{
        font-size: 100%;
        background: #fff;
    }
    body{
        padding: 0.2rem 0.1rem!important;
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
