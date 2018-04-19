
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

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(MuseUI)
Vue.use(BaiduMap, {
	ak: '8yg5IA7svz9uCGoocOMDt6PSApHhQTF7'
})

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
