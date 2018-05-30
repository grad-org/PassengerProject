
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import http from './http'
import store from './store'

import App from './App'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import BaiduMap from 'vue-baidu-map'
import VueJsonp from 'vue-jsonp'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import VueSocketio from 'vue-socket.io'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
/**
 * 常用服务器地址：
 * 1. http://forcar.vip:8080
 * 2. http://online-ride-hailing.herokuapp.com
 * 3. http://138.128.215.194:8080
 */
Vue.prototype.$serverUrl = 'http://forcar.vip:8080'
Vue.use(MuseUI)
Vue.use(BaiduMap, {
	ak: '8yg5IA7svz9uCGoocOMDt6PSApHhQTF7'
})
Vue.use(VueJsonp)
Vue.use(Vant)
if (store.state.token != null) {
	Vue.use(VueSocketio, 'http://forcar.vip:8081?token='+ store.state.token + '&role=role_passenger')
}
/* eslint-disable no-new */
new Vue({
	el: '#app',
	http,
	router,
	store,
	// components: { App },		// Vue 1.x 写法
	render: h => h(App),		// Vue 2.x 写法，es6语法
	template: '<App/>'
})
