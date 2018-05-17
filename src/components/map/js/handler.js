/**
 * 百度地图异步回调函数
 */
var selectStatus1 = '';
var searchStatus1 = '';
var autoLocationPoint = null;
var centerIconPoint = null;

const handler = {

	// 测试用
	test () {
		return 'test';
	},

	// 处理百度地图事件
	handle (BMap, map, selectStatus, searchStatus) {
		let _this = this;
		selectStatus1 = selectStatus;
		searchStatus1 = searchStatus;
		console.log(this)
		if (selectStatus1 == undefined && searchStatus1 == undefined) {
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(result) {
				console.log('执行这里，，，，，，，，，，，，，，，，！！！！！！！！！！！！！！！！！！！！！');
				console.log('②自动定位');
				var rs_lng = parseFloat(result.longitude);
				var rs_lat = parseFloat(result.latitude);
				// _this.center = {lng: rs_lng, lat: rs_lat};		// 设置center属性值
				map.centerAndZoom(new BMap.Point(rs_lng, rs_lat), 12)
				_this.autoLocationPoint = {lng: rs_lng, lat: rs_lat};		// 自定义覆盖物
				_this.centerIconPoint = {lng: rs_lng, lat: rs_lat};		// 地图中心覆盖物
				console.log('①①①①①①')
				// 上车点
				// _this.$axios.get('http://api.map.baidu.com/parking/search?location='+ rs_lng +',' + rs_lat + '&coordtype=bd09ll&ak=8yg5IA7svz9uCGoocOMDt6PSApHhQTF7')
				// // _this.$axios.get('http://api.map.baidu.com/parking/search?location='+ rs_lng +',' + rs_lat + '&ak=8yg5IA7svz9uCGoocOMDt6PSApHhQTF7')
				// .then((response) => {
				// 	console.log(response);
				// }).catch((error) => {
				// 	console.log(error);
				// })
				
				// _this.initLocation = true;
				// _this.$store.dispatch('city', result.address.city);

				// 当定位完成，进行搜索附近位置，如果放在getCurrentPosition外面是不可以的，因为只是异步操作。
				// var geocoder = new BMap.Geocoder();
				// geocoder.getLocation(new BMap.Point(_this.center.lng, _this.center.lat), function(rs) {
				// 	if (rs.surroundingPois.length > 0) {
				// 		_this.$store.dispatch('setOutset', {title: rs.surroundingPois[0].title, address: rs.surroundingPois[0].address, point: rs.surroundingPois[0].point});
				// 		window.localStorage.setItem('Outset', JSON.stringify(_this.$store.state.outset));
				// 	} else {
						
				// 	}
				// 	// clearTimeout(timer)		// 清除定时器
				// 	console.log('定位附近的地点',rs.surroundingPois)
				// })
				
			}, {enableHighAccuracy: true})
		};
		if (searchStatus1) {
			// 搜索起（终）点返回首页时，自动定位到起点
			var tmp1 = null;
			if (typeof window.localStorage.getItem('Outset') === 'string') {
				tmp1 = JSON.parse(window.localStorage.getItem('Outset'));
			} else {
				tmp1 = window.localStorage.getItem('Outset');
			}
			if (tmp1 != null) {
				// _this.center = {lng: 110.396533, lat: 21.197716};
				var p1 = new BMap.Point(tmp1.point.lng, tmp1.point.lat);
				setTimeout(function() {
					map.panTo(p1);
					_this.centerIconPoint = {lng: tmp1.point.lng, lat: tmp1.point.lat}
				}, 500)
			} else {
				console.log('localstorage中Outset为null');
			}
		}
		console.log(autoLocationPoint, '②②②②②②②')
		return {
			'autoLocationPoint': _this.autoLocationPoint,
			'centerIconPoint': _this.centerIconPoint,
		}
	}
}

export default handler