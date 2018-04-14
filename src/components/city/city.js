
const cityList = {
	
	cityData () {

	var city_data = [
		{ "cityId": "1301", "cityName": "石家庄市", "cityFirstLetter":" S","provinceCode": "13" },
		{ "cityId": "1302", "cityName": "唐山市", "cityFirstLetter":"T","provinceCode": "13" },
		{ "cityId": "1303", "cityName": "秦皇岛市", "cityFirstLetter":"Q","provinceCode": "13" },
		{ "cityId": "1304", "cityName": "邯郸市", "cityFirstLetter":"H","provinceCode": "13" },
		{ "cityId": "1305", "cityName": "邢台市", "cityFirstLetter":"X","provinceCode": "13" },
		{ "cityId": "1306", "cityName": "保定市", "cityFirstLetter":"B","provinceCode": "13" },
		{ "cityId": "1307", "cityName": "张家口市", "cityFirstLetter":"Z","provinceCode": "13" },
		{ "cityId": "1308", "cityName": "承德市", "cityFirstLetter":"C","provinceCode": "13" },
		{ "cityId": "1309", "cityName": "沧州市", "cityFirstLetter":"C","provinceCode": "13" },
		{ "cityId": "1310", "cityName": "廊坊市", "cityFirstLetter":"L","provinceCode": "13" },
		{ "cityId": "1311", "cityName": "衡水市", "cityFirstLetter":"H","provinceCode": "13" },
		{ "cityId": "1401", "cityName": "太原市", "cityFirstLetter":"T","provinceCode": "14" },
		{ "cityId": "1402", "cityName": "大同市", "cityFirstLetter":"D","provinceCode": "14" },
		{ "cityId": "1403", "cityName": "阳泉市", "cityFirstLetter":"Y","provinceCode": "14" },
		{ "cityId": "1404", "cityName": "长治市", "cityFirstLetter":"C","provinceCode": "14" },
		{ "cityId": "1405", "cityName": "晋城市", "cityFirstLetter":"J","provinceCode": "14" },
		{ "cityId": "1406", "cityName": "朔州市", "cityFirstLetter":"S","provinceCode": "14" },
		{ "cityId": "1407", "cityName": "晋中市", "cityFirstLetter":"J","provinceCode": "14" },
		{ "cityId": "1408", "cityName": "运城市", "cityFirstLetter":"Y","provinceCode": "14" },
		{ "cityId": "1409", "cityName": "忻州市", "cityFirstLetter":"Q","provinceCode": "14" },
		{ "cityId": "1410", "cityName": "临汾市", "cityFirstLetter":"L","provinceCode": "14" },
		{ "cityId": "1411", "cityName": "吕梁市", "cityFirstLetter":"L","provinceCode": "14" },
		{ "cityId": "1501", "cityName": "呼和浩特市", "cityFirstLetter":"H","provinceCode": "15" },
		{ "cityId": "1502", "cityName": "包头市", "cityFirstLetter":"B","provinceCode": "15" },
		{ "cityId": "1503", "cityName": "乌海市", "cityFirstLetter":"W","provinceCode": "15" },
		{ "cityId": "1504", "cityName": "赤峰市", "cityFirstLetter":"C","provinceCode": "15" },
		{ "cityId": "1505", "cityName": "通辽市", "cityFirstLetter":"T","provinceCode": "15" },
		{ "cityId": "1506", "cityName": "鄂尔多斯市", "cityFirstLetter":"E","provinceCode": "15" },
		{ "cityId": "1507", "cityName": "呼伦贝尔市", "cityFirstLetter":"H","provinceCode": "15" },
		{ "cityId": "1508", "cityName": "巴彦淖尔市", "cityFirstLetter":"B","provinceCode": "15" },
		{ "cityId": "1509", "cityName": "乌兰察布市", "cityFirstLetter":"W","provinceCode": "15" },
		{ "cityId": "1522", "cityName": "兴安盟", "cityFirstLetter":"X","provinceCode": "15" },
		{ "cityId": "1525", "cityName": "锡林郭勒盟", "cityFirstLetter":"X","provinceCode": "15" },
		{ "cityId": "1529", "cityName": "阿拉善盟", "cityFirstLetter":"A","provinceCode": "15" },
		{ "cityId": "2101", "cityName": "沈阳市", "cityFirstLetter":"C","provinceCode": "21" },
		{ "cityId": "2102", "cityName": "大连市", "cityFirstLetter":"D","provinceCode": "21" },
		{ "cityId": "2103", "cityName": "鞍山市", "cityFirstLetter":"A","provinceCode": "21" },
		{ "cityId": "2104", "cityName": "抚顺市", "cityFirstLetter":"F","provinceCode": "21" },
		{ "cityId": "2105", "cityName": "本溪市", "cityFirstLetter":"B","provinceCode": "21" },
		{ "cityId": "2106", "cityName": "丹东市", "cityFirstLetter":"D","provinceCode": "21" },
		{ "cityId": "2107", "cityName": "锦州市", "cityFirstLetter":"J","provinceCode": "21" },
		{ "cityId": "2108", "cityName": "营口市", "cityFirstLetter":"Y","provinceCode": "21" },
		{ "cityId": "2109", "cityName": "阜新市", "cityFirstLetter":"F","provinceCode": "21" },
		{ "cityId": "2110", "cityName": "辽阳市", "cityFirstLetter":"L","provinceCode": "21" },
		{ "cityId": "2111", "cityName": "盘锦市", "cityFirstLetter":"P","provinceCode": "21" },
		{ "cityId": "2112", "cityName": "铁岭市", "cityFirstLetter":"T","provinceCode": "21" },
		{ "cityId": "2113", "cityName": "朝阳市", "cityFirstLetter":"C","provinceCode": "21" },
		{ "cityId": "2114", "cityName": "葫芦岛市", "cityFirstLetter":"H","provinceCode": "21" },
		{ "cityId": "2201", "cityName": "长春市", "cityFirstLetter":"C","provinceCode": "22" },
		{ "cityId": "2202", "cityName": "吉林市", "cityFirstLetter":"J","provinceCode": "22" },
		{ "cityId": "2203", "cityName": "四平市", "cityFirstLetter":"S","provinceCode": "22" },
		{ "cityId": "2204", "cityName": "辽源市", "cityFirstLetter":"L","provinceCode": "22" },
		{ "cityId": "2205", "cityName": "通化市", "cityFirstLetter":"T","provinceCode": "22" },
		{ "cityId": "2206", "cityName": "白山市", "cityFirstLetter":"B","provinceCode": "22" },
		{ "cityId": "2207", "cityName": "松原市", "cityFirstLetter":"S","provinceCode": "22" },
		{ "cityId": "2208", "cityName": "白城市", "cityFirstLetter":"B","provinceCode": "22" },
		{ "cityId": "2224", "cityName": "延边朝鲜族自治州", "cityFirstLetter":"Y","provinceCode": "22" },
		{ "cityId": "2301", "cityName": "哈尔滨市", "cityFirstLetter":"H","provinceCode": "23" },
		{ "cityId": "2302", "cityName": "齐齐哈尔市", "cityFirstLetter":"Q","provinceCode": "23" },
		{ "cityId": "2303", "cityName": "鸡西市", "cityFirstLetter":"J","provinceCode": "23" },
		{ "cityId": "2304", "cityName": "鹤岗市", "cityFirstLetter":"H","provinceCode": "23" },
		{ "cityId": "2305", "cityName": "双鸭山市", "cityFirstLetter":"S","provinceCode": "23" },
		{ "cityId": "2306", "cityName": "大庆市", "cityFirstLetter":"D","provinceCode": "23" },
		{ "cityId": "2307", "cityName": "伊春市", "cityFirstLetter":"Y","provinceCode": "23" },
		{ "cityId": "2308", "cityName": "佳木斯市", "cityFirstLetter":"J","provinceCode": "23" },
		{ "cityId": "2309", "cityName": "七台河市", "cityFirstLetter":"Q","provinceCode": "23" },
		{ "cityId": "2310", "cityName": "牡丹江市", "cityFirstLetter":"M","provinceCode": "23" },
		{ "cityId": "2311", "cityName": "黑河市", "cityFirstLetter":"H","provinceCode": "23" },
		{ "cityId": "2312", "cityName": "绥化市", "cityFirstLetter":"S","provinceCode": "23" },
		{ "cityId": "2327", "cityName": "大兴安岭地区", "cityFirstLetter":"D","provinceCode": "23" },
		{ "cityId": "3201", "cityName": "南京市", "cityFirstLetter":"N","provinceCode": "32" },
		{ "cityId": "3202", "cityName": "无锡市", "cityFirstLetter":"W","provinceCode": "32" },
		{ "cityId": "3203", "cityName": "徐州市", "cityFirstLetter":"X","provinceCode": "32" },
		{ "cityId": "3204", "cityName": "常州市", "cityFirstLetter":"C","provinceCode": "32" },
		{ "cityId": "3205", "cityName": "苏州市", "cityFirstLetter":"S","provinceCode": "32" },
		{ "cityId": "3206", "cityName": "南通市", "cityFirstLetter":"N","provinceCode": "32" },
		{ "cityId": "3207", "cityName": "连云港市", "cityFirstLetter":"L","provinceCode": "32" },
		{ "cityId": "3208", "cityName": "淮安市", "cityFirstLetter":"H","provinceCode": "32" },
		{ "cityId": "3209", "cityName": "盐城市", "cityFirstLetter":"Y","provinceCode": "32" },
		{ "cityId": "3210", "cityName": "扬州市", "cityFirstLetter":"Y","provinceCode": "32" },
		{ "cityId": "3211", "cityName": "镇江市", "cityFirstLetter":"Z","provinceCode": "32" },
		{ "cityId": "3212", "cityName": "泰州市", "cityFirstLetter":"T","provinceCode": "32" },
		{ "cityId": "3213", "cityName": "宿迁市", "cityFirstLetter":"S","provinceCode": "32" },
		{ "cityId": "3301", "cityName": "杭州市", "cityFirstLetter":"H","provinceCode": "33" },
		{ "cityId": "3302", "cityName": "宁波市", "cityFirstLetter":"N","provinceCode": "33" },
		{ "cityId": "3303", "cityName": "温州市", "cityFirstLetter":"W","provinceCode": "33" },
		{ "cityId": "3304", "cityName": "嘉兴市", "cityFirstLetter":"J","provinceCode": "33" },
		{ "cityId": "3305", "cityName": "湖州市", "cityFirstLetter":"H","provinceCode": "33" },
		{ "cityId": "3306", "cityName": "绍兴市", "cityFirstLetter":"S","provinceCode": "33" },
		{ "cityId": "3307", "cityName": "金华市", "cityFirstLetter":"J","provinceCode": "33" },
		{ "cityId": "3308", "cityName": "衢州市", "cityFirstLetter":"Q","provinceCode": "33" },
		{ "cityId": "3309", "cityName": "舟山市", "cityFirstLetter":"Z","provinceCode": "33" },
		{ "cityId": "3310", "cityName": "台州市", "cityFirstLetter":"T","provinceCode": "33" },
		{ "cityId": "3311", "cityName": "丽水市", "cityFirstLetter":"L","provinceCode": "33" },
		{ "cityId": "3401", "cityName": "合肥市", "cityFirstLetter":"H","provinceCode": "34" },
		{ "cityId": "3402", "cityName": "芜湖市", "cityFirstLetter":"W","provinceCode": "34" },
		{ "cityId": "3403", "cityName": "蚌埠市", "cityFirstLetter":"B","provinceCode": "34" },
		{ "cityId": "3404", "cityName": "淮南市", "cityFirstLetter":"H","provinceCode": "34" },
		{ "cityId": "3405", "cityName": "马鞍山市", "cityFirstLetter":"M","provinceCode": "34" },
		{ "cityId": "3406", "cityName": "淮北市", "cityFirstLetter":"H","provinceCode": "34" },
		{ "cityId": "3407", "cityName": "铜陵市", "cityFirstLetter":"T","provinceCode": "34" },
		{ "cityId": "3408", "cityName": "安庆市", "cityFirstLetter":"A","provinceCode": "34" },
		{ "cityId": "3410", "cityName": "黄山市", "cityFirstLetter":"H","provinceCode": "34" },
		{ "cityId": "3411", "cityName": "滁州市", "cityFirstLetter":"C","provinceCode": "34" },
		{ "cityId": "3412", "cityName": "阜阳市", "cityFirstLetter":"F","provinceCode": "34" },
		{ "cityId": "3413", "cityName": "宿州市", "cityFirstLetter":"S","provinceCode": "34" },
		{ "cityId": "3415", "cityName": "六安市", "cityFirstLetter":"L","provinceCode": "34" },
		{ "cityId": "3416", "cityName": "亳州市", "cityFirstLetter":"H","provinceCode": "34" },
		{ "cityId": "3417", "cityName": "池州市", "cityFirstLetter":"C","provinceCode": "34" },
		{ "cityId": "3418", "cityName": "宣城市", "cityFirstLetter":"X","provinceCode": "34" },
		{ "cityId": "3501", "cityName": "福州市", "cityFirstLetter":"F","provinceCode": "35" },
		{ "cityId": "3502", "cityName": "厦门市", "cityFirstLetter":"X","provinceCode": "35" },
		{ "cityId": "3503", "cityName": "莆田市", "cityFirstLetter":"P","provinceCode": "35" },
		{ "cityId": "3504", "cityName": "三明市", "cityFirstLetter":"S","provinceCode": "35" },
		{ "cityId": "3505", "cityName": "泉州市", "cityFirstLetter":"Q","provinceCode": "35" },
		{ "cityId": "3506", "cityName": "漳州市", "cityFirstLetter":"Z","provinceCode": "35" },
		{ "cityId": "3507", "cityName": "南平市", "cityFirstLetter":"N","provinceCode": "35" },
		{ "cityId": "3508", "cityName": "龙岩市", "cityFirstLetter":"L","provinceCode": "35" },
		{ "cityId": "3509", "cityName": "宁德市", "cityFirstLetter":"N","provinceCode": "35" },
		{ "cityId": "3601", "cityName": "南昌市", "cityFirstLetter":"N","provinceCode": "36" },
		{ "cityId": "3602", "cityName": "景德镇市", "cityFirstLetter":"J","provinceCode": "36" },
		{ "cityId": "3603", "cityName": "萍乡市", "cityFirstLetter":"P","provinceCode": "36" },
		{ "cityId": "3604", "cityName": "九江市", "cityFirstLetter":"J","provinceCode": "36" },
		{ "cityId": "3605", "cityName": "新余市", "cityFirstLetter":"X","provinceCode": "36" },
		{ "cityId": "3606", "cityName": "鹰潭市", "cityFirstLetter":"Y","provinceCode": "36" },
		{ "cityId": "3607", "cityName": "赣州市", "cityFirstLetter":"G","provinceCode": "36" },
		{ "cityId": "3608", "cityName": "吉安市", "cityFirstLetter":"J","provinceCode": "36" },
		{ "cityId": "3609", "cityName": "宜春市", "cityFirstLetter":"Y","provinceCode": "36" },
		{ "cityId": "3610", "cityName": "抚州市", "cityFirstLetter":"F","provinceCode": "36" },
		{ "cityId": "3611", "cityName": "上饶市", "cityFirstLetter":"S","provinceCode": "36" },
		{ "cityId": "3701", "cityName": "济南市", "cityFirstLetter":"J","provinceCode": "37" },
		{ "cityId": "3702", "cityName": "青岛市", "cityFirstLetter":"Q","provinceCode": "37" },
		{ "cityId": "3703", "cityName": "淄博市", "cityFirstLetter":"Z","provinceCode": "37" },
		{ "cityId": "3704", "cityName": "枣庄市", "cityFirstLetter":"Z","provinceCode": "37" },
		{ "cityId": "3705", "cityName": "东营市", "cityFirstLetter":"D","provinceCode": "37" },
		{ "cityId": "3706", "cityName": "烟台市", "cityFirstLetter":"Y","provinceCode": "37" },
		{ "cityId": "3707", "cityName": "潍坊市", "cityFirstLetter":"W","provinceCode": "37" },
		{ "cityId": "3708", "cityName": "济宁市", "cityFirstLetter":"J","provinceCode": "37" },
		{ "cityId": "3709", "cityName": "泰安市", "cityFirstLetter":"T","provinceCode": "37" },
		{ "cityId": "3710", "cityName": "威海市", "cityFirstLetter":"W","provinceCode": "37" },
		{ "cityId": "3711", "cityName": "日照市", "cityFirstLetter":"R","provinceCode": "37" },
		{ "cityId": "3712", "cityName": "莱芜市", "cityFirstLetter":"L","provinceCode": "37" },
		{ "cityId": "3713", "cityName": "临沂市", "cityFirstLetter":"L","provinceCode": "37" },
		{ "cityId": "3714", "cityName": "德州市", "cityFirstLetter":"D","provinceCode": "37" },
		{ "cityId": "3715", "cityName": "聊城市", "cityFirstLetter":"L","provinceCode": "37" },
		{ "cityId": "3716", "cityName": "滨州市", "cityFirstLetter":"B","provinceCode": "37" },
		{ "cityId": "3717", "cityName": "菏泽市", "cityFirstLetter":"H","provinceCode": "37" },
		{ "cityId": "4101", "cityName": "郑州市", "cityFirstLetter":"Z","provinceCode": "41" },
		{ "cityId": "4102", "cityName": "开封市", "cityFirstLetter":"K","provinceCode": "41" },
		{ "cityId": "4103", "cityName": "洛阳市", "cityFirstLetter":"L","provinceCode": "41" },
		{ "cityId": "4104", "cityName": "平顶山市", "cityFirstLetter":"P","provinceCode": "41" },
		{ "cityId": "4105", "cityName": "安阳市", "cityFirstLetter":"A","provinceCode": "41" },
		{ "cityId": "4106", "cityName": "鹤壁市", "cityFirstLetter":"H","provinceCode": "41" },
		{ "cityId": "4107", "cityName": "新乡市", "cityFirstLetter":"X","provinceCode": "41" },
		{ "cityId": "4108", "cityName": "焦作市", "cityFirstLetter":"J","provinceCode": "41" },
		{ "cityId": "4109", "cityName": "濮阳市", "cityFirstLetter":"P","provinceCode": "41" },
		{ "cityId": "4110", "cityName": "许昌市", "cityFirstLetter":"X","provinceCode": "41" },
		{ "cityId": "4111", "cityName": "漯河市", "cityFirstLetter":"L","provinceCode": "41" },
		{ "cityId": "4112", "cityName": "三门峡市", "cityFirstLetter":"S","provinceCode": "41" },
		{ "cityId": "4113", "cityName": "南阳市", "cityFirstLetter":"N","provinceCode": "41" },
		{ "cityId": "4114", "cityName": "商丘市", "cityFirstLetter":"S","provinceCode": "41" },
		{ "cityId": "4115", "cityName": "信阳市", "cityFirstLetter":"X","provinceCode": "41" },
		{ "cityId": "4116", "cityName": "周口市", "cityFirstLetter":"Z","provinceCode": "41" },
		{ "cityId": "4117", "cityName": "驻马店市", "cityFirstLetter":"Z","provinceCode": "41" },
		{ "cityId": "4201", "cityName": "武汉市", "cityFirstLetter":"W","provinceCode": "42" },
		{ "cityId": "4202", "cityName": "黄石市", "cityFirstLetter":"H","provinceCode": "42" },
		{ "cityId": "4203", "cityName": "十堰市", "cityFirstLetter":"S","provinceCode": "42" },
		{ "cityId": "4205", "cityName": "宜昌市", "cityFirstLetter":"Y","provinceCode": "42" },
		{ "cityId": "4206", "cityName": "襄阳市", "cityFirstLetter":"X","provinceCode": "42" },
		{ "cityId": "4207", "cityName": "鄂州市", "cityFirstLetter":"E","provinceCode": "42" },
		{ "cityId": "4208", "cityName": "荆门市", "cityFirstLetter":"J","provinceCode": "42" },
		{ "cityId": "4209", "cityName": "孝感市", "cityFirstLetter":"X","provinceCode": "42" },
		{ "cityId": "4210", "cityName": "荆州市", "cityFirstLetter":"J","provinceCode": "42" },
		{ "cityId": "4211", "cityName": "黄冈市", "cityFirstLetter":"H","provinceCode": "42" },
		{ "cityId": "4212", "cityName": "咸宁市", "cityFirstLetter":"X","provinceCode": "42" },
		{ "cityId": "4213", "cityName": "随州市", "cityFirstLetter":"S","provinceCode": "42" },
		{ "cityId": "4228", "cityName": "恩施土家族苗族自治州", "cityFirstLetter":"E","provinceCode": "42" },
		{ "cityId": "4301", "cityName": "长沙市", "cityFirstLetter":"C","provinceCode": "43" },
		{ "cityId": "4302", "cityName": "株洲市", "cityFirstLetter":"Z","provinceCode": "43" },
		{ "cityId": "4303", "cityName": "湘潭市", "cityFirstLetter":"X","provinceCode": "43" },
		{ "cityId": "4304", "cityName": "衡阳市", "cityFirstLetter":"H","provinceCode": "43" },
		{ "cityId": "4305", "cityName": "邵阳市", "cityFirstLetter":"S","provinceCode": "43" },
		{ "cityId": "4306", "cityName": "岳阳市", "cityFirstLetter":"Y","provinceCode": "43" },
		{ "cityId": "4307", "cityName": "常德市", "cityFirstLetter":"C","provinceCode": "43" },
		{ "cityId": "4308", "cityName": "张家界市", "cityFirstLetter":"Z","provinceCode": "43" },
		{ "cityId": "4309", "cityName": "益阳市", "cityFirstLetter":"Y","provinceCode": "43" },
		{ "cityId": "4310", "cityName": "郴州市", "cityFirstLetter":"B","provinceCode": "43" },
		{ "cityId": "4311", "cityName": "永州市", "cityFirstLetter":"Y","provinceCode": "43" },
		{ "cityId": "4312", "cityName": "怀化市", "cityFirstLetter":"H","provinceCode": "43" },
		{ "cityId": "4313", "cityName": "娄底市", "cityFirstLetter":"L","provinceCode": "43" },
		{ "cityId": "4331", "cityName": "湘西土家族苗族自治州", "cityFirstLetter":"X","provinceCode": "43" },
		{ "cityId": "4401", "cityName": "广州市", "cityFirstLetter":"G","provinceCode": "44" },
		{ "cityId": "4402", "cityName": "韶关市", "cityFirstLetter":"S","provinceCode": "44" },
		{ "cityId": "4403", "cityName": "深圳市", "cityFirstLetter":"S","provinceCode": "44" },
		{ "cityId": "4404", "cityName": "珠海市", "cityFirstLetter":"Z","provinceCode": "44" },
		{ "cityId": "4405", "cityName": "汕头市", "cityFirstLetter":"S","provinceCode": "44" },
		{ "cityId": "4406", "cityName": "佛山市", "cityFirstLetter":"F","provinceCode": "44" },
		{ "cityId": "4407", "cityName": "江门市", "cityFirstLetter":"J","provinceCode": "44" },
		{ "cityId": "4408", "cityName": "湛江市", "cityFirstLetter":"Z","provinceCode": "44" },
		{ "cityId": "4409", "cityName": "茂名市", "cityFirstLetter":"M","provinceCode": "44" },
		{ "cityId": "4412", "cityName": "肇庆市", "cityFirstLetter":"Z","provinceCode": "44" },
		{ "cityId": "4413", "cityName": "惠州市", "cityFirstLetter":"H","provinceCode": "44" },
		{ "cityId": "4414", "cityName": "梅州市", "cityFirstLetter":"M","provinceCode": "44" },
		{ "cityId": "4415", "cityName": "汕尾市", "cityFirstLetter":"S","provinceCode": "44" },
		{ "cityId": "4416", "cityName": "河源市", "cityFirstLetter":"H","provinceCode": "44" },
		{ "cityId": "4417", "cityName": "阳江市", "cityFirstLetter":"Y","provinceCode": "44" },
		{ "cityId": "4418", "cityName": "清远市", "cityFirstLetter":"Q","provinceCode": "44" },
		{ "cityId": "4419", "cityName": "东莞市", "cityFirstLetter":"D","provinceCode": "44" },
		{ "cityId": "4420", "cityName": "中山市", "cityFirstLetter":"Z","provinceCode": "44" },
		{ "cityId": "4451", "cityName": "潮州市", "cityFirstLetter":"C","provinceCode": "44" },
		{ "cityId": "4452", "cityName": "揭阳市", "cityFirstLetter":"J","provinceCode": "44" },
		{ "cityId": "4453", "cityName": "云浮市", "cityFirstLetter":"Y","provinceCode": "44" },
		{ "cityId": "4501", "cityName": "南宁市", "cityFirstLetter":"N","provinceCode": "45" },
		{ "cityId": "4502", "cityName": "柳州市", "cityFirstLetter":"L","provinceCode": "45" },
		{ "cityId": "4503", "cityName": "桂林市", "cityFirstLetter":"G","provinceCode": "45" },
		{ "cityId": "4504", "cityName": "梧州市", "cityFirstLetter":"W","provinceCode": "45" },
		{ "cityId": "4505", "cityName": "北海市", "cityFirstLetter":"B","provinceCode": "45" },
		{ "cityId": "4506", "cityName": "防城港市", "cityFirstLetter":"F","provinceCode": "45" },
		{ "cityId": "4507", "cityName": "钦州市", "cityFirstLetter":"Q","provinceCode": "45" },
		{ "cityId": "4508", "cityName": "贵港市", "cityFirstLetter":"G","provinceCode": "45" },
		{ "cityId": "4509", "cityName": "玉林市", "cityFirstLetter":"Y","provinceCode": "45" },
		{ "cityId": "4510", "cityName": "百色市", "cityFirstLetter":"B","provinceCode": "45" },
		{ "cityId": "4511", "cityName": "贺州市", "cityFirstLetter":"H","provinceCode": "45" },
		{ "cityId": "4512", "cityName": "河池市", "cityFirstLetter":"H","provinceCode": "45" },
		{ "cityId": "4513", "cityName": "来宾市", "cityFirstLetter":"L","provinceCode": "45" },
		{ "cityId": "4514", "cityName": "崇左市", "cityFirstLetter":"C","provinceCode": "45" },
		{ "cityId": "4601", "cityName": "海口市", "cityFirstLetter":"H","provinceCode": "46" },
		{ "cityId": "4602", "cityName": "三亚市", "cityFirstLetter":"S","provinceCode": "46" },
		{ "cityId": "4603", "cityName": "三沙市", "cityFirstLetter":"S","provinceCode": "46" },
		{ "cityId": "4604", "cityName": "儋州市", "cityFirstLetter":"D","provinceCode": "46" },
		{ "cityId": "5101", "cityName": "成都市", "cityFirstLetter":"C","provinceCode": "51" },
		{ "cityId": "5103", "cityName": "自贡市", "cityFirstLetter":"Z","provinceCode": "51" },
		{ "cityId": "5104", "cityName": "攀枝花市", "cityFirstLetter":"F","provinceCode": "51" },
		{ "cityId": "5105", "cityName": "泸州市", "cityFirstLetter":"L","provinceCode": "51" },
		{ "cityId": "5106", "cityName": "德阳市", "cityFirstLetter":"D","provinceCode": "51" },
		{ "cityId": "5107", "cityName": "绵阳市", "cityFirstLetter":"M","provinceCode": "51" },
		{ "cityId": "5108", "cityName": "广元市", "cityFirstLetter":"G","provinceCode": "51" },
		{ "cityId": "5109", "cityName": "遂宁市", "cityFirstLetter":"S","provinceCode": "51" },
		{ "cityId": "5110", "cityName": "内江市", "cityFirstLetter":"N","provinceCode": "51" },
		{ "cityId": "5111", "cityName": "乐山市", "cityFirstLetter":"L","provinceCode": "51" },
		{ "cityId": "5113", "cityName": "南充市", "cityFirstLetter":"N","provinceCode": "51" },
		{ "cityId": "5114", "cityName": "眉山市", "cityFirstLetter":"M","provinceCode": "51" },
		{ "cityId": "5115", "cityName": "宜宾市", "cityFirstLetter":"Y","provinceCode": "51" },
		{ "cityId": "5116", "cityName": "广安市", "cityFirstLetter":"G","provinceCode": "51" },
		{ "cityId": "5117", "cityName": "达州市", "cityFirstLetter":"D","provinceCode": "51" },
		{ "cityId": "5118", "cityName": "雅安市", "cityFirstLetter":"Y","provinceCode": "51" },
		{ "cityId": "5119", "cityName": "巴中市", "cityFirstLetter":"B","provinceCode": "51" },
		{ "cityId": "5120", "cityName": "资阳市", "cityFirstLetter":"Z","provinceCode": "51" },
		{ "cityId": "5132", "cityName": "阿坝藏族羌族自治州", "cityFirstLetter":"E","provinceCode": "51" },
		{ "cityId": "5133", "cityName": "甘孜藏族自治州", "cityFirstLetter":"G","provinceCode": "51" },
		{ "cityId": "5134", "cityName": "凉山彝族自治州", "cityFirstLetter":"Q","provinceCode": "51" },
		{ "cityId": "5201", "cityName": "贵阳市", "cityFirstLetter":"G","provinceCode": "52" },
		{ "cityId": "5202", "cityName": "六盘水市", "cityFirstLetter":"L","provinceCode": "52" },
		{ "cityId": "5203", "cityName": "遵义市", "cityFirstLetter":"Z","provinceCode": "52" },
		{ "cityId": "5204", "cityName": "安顺市", "cityFirstLetter":"A","provinceCode": "52" },
		{ "cityId": "5205", "cityName": "毕节市", "cityFirstLetter":"B","provinceCode": "52" },
		{ "cityId": "5206", "cityName": "铜仁市", "cityFirstLetter":"T","provinceCode": "52" },
		{ "cityId": "5223", "cityName": "黔西南布依族苗族自治州", "cityFirstLetter":"Q","provinceCode": "52" },
		{ "cityId": "5226", "cityName": "黔东南苗族侗族自治州", "cityFirstLetter":"Q","provinceCode": "52" },
		{ "cityId": "5227", "cityName": "黔南布依族苗族自治州", "cityFirstLetter":"Q","provinceCode": "52" },
		{ "cityId": "5301", "cityName": "昆明市", "cityFirstLetter":"K","provinceCode": "53" },
		{ "cityId": "5303", "cityName": "曲靖市", "cityFirstLetter":"Q","provinceCode": "53" },
		{ "cityId": "5304", "cityName": "玉溪市", "cityFirstLetter":"Y","provinceCode": "53" },
		{ "cityId": "5305", "cityName": "保山市", "cityFirstLetter":"B","provinceCode": "53" },
		{ "cityId": "5306", "cityName": "昭通市", "cityFirstLetter":"S","provinceCode": "53" },
		{ "cityId": "5307", "cityName": "丽江市", "cityFirstLetter":"L","provinceCode": "53" },
		{ "cityId": "5308", "cityName": "普洱市", "cityFirstLetter":"P","provinceCode": "53" },
		{ "cityId": "5309", "cityName": "临沧市", "cityFirstLetter":"L","provinceCode": "53" },
		{ "cityId": "5323", "cityName": "楚雄彝族自治州", "cityFirstLetter":"C","provinceCode": "53" },
		{ "cityId": "5325", "cityName": "红河哈尼族彝族自治州", "cityFirstLetter":"H","provinceCode": "53" },
		{ "cityId": "5326", "cityName": "文山壮族苗族自治州", "cityFirstLetter":"W","provinceCode": "53" },
		{ "cityId": "5328", "cityName": "西双版纳傣族自治州", "cityFirstLetter":"X","provinceCode": "53" },
		{ "cityId": "5329", "cityName": "大理白族自治州", "cityFirstLetter":"D","provinceCode": "53" },
		{ "cityId": "5331", "cityName": "德宏傣族景颇族自治州", "cityFirstLetter":"D","provinceCode": "53" },
		{ "cityId": "5333", "cityName": "怒江傈僳族自治州", "cityFirstLetter":"N","provinceCode": "53" },
		{ "cityId": "5334", "cityName": "迪庆藏族自治州", "cityFirstLetter":"D","provinceCode": "53" },
		{ "cityId": "5401", "cityName": "拉萨市", "cityFirstLetter":"L","provinceCode": "54" },
		{ "cityId": "5402", "cityName": "日喀则市", "cityFirstLetter":"R","provinceCode": "54" },
		{ "cityId": "5403", "cityName": "昌都市", "cityFirstLetter":"C","provinceCode": "54" },
		{ "cityId": "5404", "cityName": "林芝市", "cityFirstLetter":"L","provinceCode": "54" },
		{ "cityId": "5405", "cityName": "山南市", "cityFirstLetter":"S","provinceCode": "54" },
		{ "cityId": "5424", "cityName": "那曲地区", "cityFirstLetter":"N","provinceCode": "54" },
		{ "cityId": "5425", "cityName": "阿里地区", "cityFirstLetter":"A","provinceCode": "54" },
		{ "cityId": "6101", "cityName": "西安市", "cityFirstLetter":"X","provinceCode": "61" },
		{ "cityId": "6102", "cityName": "铜川市", "cityFirstLetter":"T","provinceCode": "61" },
		{ "cityId": "6103", "cityName": "宝鸡市", "cityFirstLetter":"B","provinceCode": "61" },
		{ "cityId": "6104", "cityName": "咸阳市", "cityFirstLetter":"X","provinceCode": "61" },
		{ "cityId": "6105", "cityName": "渭南市", "cityFirstLetter":"W","provinceCode": "61" },
		{ "cityId": "6106", "cityName": "延安市", "cityFirstLetter":"Y","provinceCode": "61" },
		{ "cityId": "6107", "cityName": "汉中市", "cityFirstLetter":"H","provinceCode": "61" },
		{ "cityId": "6108", "cityName": "榆林市", "cityFirstLetter":"Y","provinceCode": "61" },
		{ "cityId": "6109", "cityName": "安康市", "cityFirstLetter":"A","provinceCode": "61" },
		{ "cityId": "6110", "cityName": "商洛市", "cityFirstLetter":"S","provinceCode": "61" },
		{ "cityId": "6201", "cityName": "兰州市", "cityFirstLetter":"L","provinceCode": "62" },
		{ "cityId": "6202", "cityName": "嘉峪关市", "cityFirstLetter":"J","provinceCode": "62" },
		{ "cityId": "6203", "cityName": "金昌市", "cityFirstLetter":"J","provinceCode": "62" },
		{ "cityId": "6204", "cityName": "白银市", "cityFirstLetter":"B","provinceCode": "62" },
		{ "cityId": "6205", "cityName": "天水市", "cityFirstLetter":"T","provinceCode": "62" },
		{ "cityId": "6206", "cityName": "武威市", "cityFirstLetter":"W","provinceCode": "62" },
		{ "cityId": "6207", "cityName": "张掖市", "cityFirstLetter":"Z","provinceCode": "62" },
		{ "cityId": "6208", "cityName": "平凉市", "cityFirstLetter":"P","provinceCode": "62" },
		{ "cityId": "6209", "cityName": "酒泉市", "cityFirstLetter":"J","provinceCode": "62" },
		{ "cityId": "6210", "cityName": "庆阳市", "cityFirstLetter":"Q","provinceCode": "62" },
		{ "cityId": "6211", "cityName": "定西市", "cityFirstLetter":"D","provinceCode": "62" },
		{ "cityId": "6212", "cityName": "陇南市", "cityFirstLetter":"L","provinceCode": "62" },
		{ "cityId": "6229", "cityName": "临夏回族自治州", "cityFirstLetter":"L","provinceCode": "62" },
		{ "cityId": "6230", "cityName": "甘南藏族自治州", "cityFirstLetter":"G","provinceCode": "62" },
		{ "cityId": "6301", "cityName": "西宁市", "cityFirstLetter":"X","provinceCode": "63" },
		{ "cityId": "6302", "cityName": "海东市", "cityFirstLetter":"H","provinceCode": "63" },
		{ "cityId": "6322", "cityName": "海北藏族自治州", "cityFirstLetter":"H","provinceCode": "63" },
		{ "cityId": "6323", "cityName": "黄南藏族自治州", "cityFirstLetter":"H","provinceCode": "63" },
		{ "cityId": "6325", "cityName": "海南藏族自治州", "cityFirstLetter":"H","provinceCode": "63" },
		{ "cityId": "6326", "cityName": "果洛藏族自治州", "cityFirstLetter":"G","provinceCode": "63" },
		{ "cityId": "6327", "cityName": "玉树藏族自治州", "cityFirstLetter":"Y","provinceCode": "63" },
		{ "cityId": "6328", "cityName": "海西蒙古族藏族自治州", "cityFirstLetter":"H","provinceCode": "63" },
		{ "cityId": "6401", "cityName": "银川市", "cityFirstLetter":"Y","provinceCode": "64" },
		{ "cityId": "6402", "cityName": "石嘴山市", "cityFirstLetter":"S","provinceCode": "64" },
		{ "cityId": "6403", "cityName": "吴忠市", "cityFirstLetter":"W","provinceCode": "64" },
		{ "cityId": "6404", "cityName": "固原市", "cityFirstLetter":"G","provinceCode": "64" },
		{ "cityId": "6405", "cityName": "中卫市", "cityFirstLetter":"Z","provinceCode": "64" },
		{ "cityId": "6501", "cityName": "乌鲁木齐市", "cityFirstLetter":"W","provinceCode": "65" },
		{ "cityId": "6502", "cityName": "克拉玛依市", "cityFirstLetter":"K","provinceCode": "65" },
		{ "cityId": "6504", "cityName": "吐鲁番市", "cityFirstLetter":"T","provinceCode": "65" },
		{ "cityId": "6505", "cityName": "哈密市", "cityFirstLetter":"H","provinceCode": "65" },
		{ "cityId": "6523", "cityName": "昌吉回族自治州", "cityFirstLetter":"C","provinceCode": "65" },
		{ "cityId": "6527", "cityName": "博尔塔拉蒙古自治州", "cityFirstLetter":"B","provinceCode": "65" },
		{ "cityId": "6528", "cityName": "巴音郭楞蒙古自治州", "cityFirstLetter":"B","provinceCode": "65" },
		{ "cityId": "6529", "cityName": "阿克苏地区", "cityFirstLetter":"A","provinceCode": "65" },
		{ "cityId": "6530", "cityName": "克孜勒苏柯尔克孜自治州", "cityFirstLetter":"K","provinceCode": "65" },
		{ "cityId": "6531", "cityName": "喀什地区", "cityFirstLetter":"K","provinceCode": "65" },
		{ "cityId": "6532", "cityName": "和田地区", "cityFirstLetter":"H","provinceCode": "65" },
		{ "cityId": "6540", "cityName": "伊犁哈萨克自治州", "cityFirstLetter":"Y","provinceCode": "65" },
		{ "cityId": "6542", "cityName": "塔城地区", "cityFirstLetter":"T","provinceCode": "65" },
		{ "cityId": "6543", "cityName": "阿勒泰地区", "cityFirstLetter":"A","provinceCode": "65" }
	];
	return city_data;
}
}

export default cityList