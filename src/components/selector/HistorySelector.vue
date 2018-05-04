<template>
		<div ref="selectorDiv" class="container">
			<mu-row gutter style="text-align: center; align-items:center">
				<!-- 其中width指百分百 -->
				<mu-col width="40" tablet="33" desktop="33">
					<span>{{carPlateNo}}</span>
					<span>{{carColor}} • {{carBrand}}{{carSeries}}</span>
				</mu-col>
				<mu-col width="20" tablet="34" desktop="33">
					<mu-paper class="paper" circle :zDepth="1" >
						<img :src="avater" style="width: 100%; height: 100%"/>
					</mu-paper>
				</mu-col>
				<mu-col width="40" tablet="33" desktop="33">
					<span>{{driverName.substr(0,1)}}师傅</span>
					<span>{{driverEvaluate}}</span>
				</mu-col>
			</mu-row>
			<mu-divider shallowInset />
			<mu-row gutter style="text-align: center; align-items:center">
				<!-- 其中width指百分百 -->
				<mu-col width="33" tablet="33" desktop="33">
					<mu-flat-button label="打电话" class="flat-button"/>
				</mu-col>
				<mu-col width="34" tablet="34" desktop="33">
					<mu-flat-button label="发消息" class="flat-button"/>
				</mu-col>
				<mu-col width="33" tablet="33" desktop="33">
					<mu-flat-button label="联系客服" class="flat-button"/>
				</mu-col>
			</mu-row>
			<mu-divider shallowInset />
			<div style="padding: 18px 0 15px 0; text-align: center; font-size: 16px;">
				<span style="display: inline-block; font-size: 36px; font-weight: bold">{{totalCost}}</span>元
				<div>
					<span class="span1">车费明细 ＞</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span class="span1">计费规则 ＞</span>
				</div>
			</div>
			<div style="text-align: center">
				<mu-raised-button label="评价本次服务" class="raised-button" :backgroundColor="backgroundColor" :rippleOpacity="rippleOpacity" @click="evaluateTrip"/>
			</div>
		</div>
</template>

<script>

	/**
	 * 仍需解决问题：车主头像，现阶段是采用本地头像
	 * 高度不固定div，内容垂直居中：https://zhidao.baidu.com/question/717236354301077285.html
	 */

	import { Toast } from 'vant'
	import avater from '../../assets/image/avater.jpg'

	export default {
		data () {
			return {
				disable: false,
				selectorHeight: '',

				backgroundColor: '#4a4d5b',	// 按钮波纹效果的颜色
				rippleOpacity: 0.1,			// 按钮波纹效果的透明度

				// 订单详情
				totalCost: null,	// 车费

				// 车信息
				carBrand: null,		// 品牌
				carSeries: null,	// 系列
				carColor: null,		// 车身颜色
				carPlateNo: null,	// 车牌号码

				// 车主信息
				avater: avater,		// 头像
				driverName: null,	// 车主名字
				driverEvaluate: '评分：4.0'	// 车主评分
			}
		},
		created () {
			let _this = this;
			let ls_tripdetail = JSON.parse(window.localStorage.getItem('HistoryTripDetail'));
			let ls_driverinfo = JSON.parse(window.localStorage.getItem('DriverInfo')) ;
			// 获取订单相关
			_this.totalCost = ls_tripdetail.totalCost;

			// 获取车主相关
			if (ls_driverinfo == null) {
				console.log('要获取DriverInfo')
				_this.$axios.get('/api/driver/' + ls_tripdetail.driverId)
				.then((response) => {
					console.log(response);
					// 车辆信息
					_this.carBrand = response.data.data.carDTO.brand;
					_this.carSeries = response.data.data.carDTO.series;
					_this.carColor = response.data.data.carDTO.color;
					_this.carPlateNo = response.data.data.carDTO.plateNo;
					// 车主信息
					_this.driverName = response.data.data.drivingLicenseDTO.driverName;
					window.localStorage.setItem('DriverInfo', JSON.stringify(response.data.data))
				})
				.catch((error) => {
					console.log(error);
				})
			} else {
				// 车辆信息
				_this.carBrand = ls_driverinfo.carDTO.brand;
				_this.carSeries = ls_driverinfo.carDTO.series;
				_this.carColor = ls_driverinfo.carDTO.color;
				_this.carPlateNo = ls_driverinfo.carDTO.plateNo;
				// 车主信息
				_this.driverName = ls_driverinfo.drivingLicenseDTO.driverName;
			}
				
			
			
		},
		mounted () {
			
		},
		methods: {
			evaluateTrip () {
				
			}
		}
	}
</script>

<style scoped>
	.container{
		/* display: flex; */
		flex-wrap: wrap;
		margin: 0 auto;
	}
	.flat-button {
		margin: 0;
	}
	.raised-button {
		margin: 6px 0 12px 0;
		width: 72%;
	}
	.mu-divider {
		margin: 0
	}
	.call {
		background: #4a4d5b;
		color: #fff;
		width: 100%;
		height: 56px;
		text-align: center;
		line-height: 56px;
		font-size: 15px;
		font-weight: bold;
	}
	.paper {
		display: inline-block;
		height: 50px;
		height: 50px;
		width: 50px;
		margin: 8px 0 3px 0;
		text-align: center;
		overflow: hidden;
	}
	span {
		display: block;
		padding: 2px;
	}
	.span1 {
		display: inline-block;
		font-size: 14px;
		color: #757575
	}
</style>
