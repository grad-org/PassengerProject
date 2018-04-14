
import axios from 'axios'
import store from './store/store'
import * as types from './store/types'
import router from './router'
import Vue from 'vue'

// axios 配置
axios.defaults.timeout = 5000	// 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.baseURL = 'http://forcar.vip:8080/api'

// https://segmentfault.com/q/1010000011171046 发起get、post请求自动添加token

// http request 拦截器
axios.interceptors.request.use(
	config => {
		if (store.state.token) {	// 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.Authorization = `Bearer ${store.state.token}`;
			// console.log("有token");
		} else {
			// console.log("没有token")
			// alert("登录失效，请重新登录！")
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
)

// http response 拦截器
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.response) {
			switch (error.response.status) {
				case 401: 
					// 401 清除token信息并跳转到登录界面
					alert("用户名或密码错误，请重新登录！")
					store.commit(types.LOGOUT);
					router.replace({
						path: '/login',
						query: {redirect: router.currentRoute.fullPath}
					})
			}
		}
		// console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
		return Promise.reject(error.response.data)
	}
)

export default axios;