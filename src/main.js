
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
// Vue.prototype.$types = types
Vue.use(MuseUI)
Vue.use(BaiduMap, {
	ak: 'HxUj76nECj5KXXIaNjSo7juXodilpfAX'
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
