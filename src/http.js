
import axios from 'axios'
import store from './store'
import router from './router'
import Vue from 'vue'

// axios 配置
axios.defaults.timeout = 2500	// 覆写库的超时默认值。在超时前，所有请求都会等待 2.5 秒
axios.defaults.baseURL = 'http://forcar.vip:8080/'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// https://segmentfault.com/q/1010000011171046 发起get、post请求自动添加token

// http request 请求拦截器
axios.interceptors.request.use(
	// 在发送请求之前做些什么
	config => {
		if (store.state.token) {	// 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.Authorization = `Bearer ${store.state.token}`;
		}
		return config;
	},
	// 对请求错误做些什么
	error => {
		return Promise.reject(error);
	}
)

// http response 响应拦截器
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.response) {
			switch (error.response.status) {
				case 401: 
					// 401 清除token信息并跳转到登录界面
					store.dispatch('logout');
					router.replace({
						path: '/login',
						query: {redirect: router.currentRoute.fullPath}
					});
			};
		};
		// console.log(JSON.stringify(error));		//console : Error: Request failed with status code 402
		// return Promise.reject(error);
		return Promise.reject(error.response.data);
		// let errorInfo = error.response.data ? error.response.data : (error.response ? error.response : error);
		// return Promise.reject(errorInfo);
	}
)

export default axios;