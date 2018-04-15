
import axios from 'axios'
<<<<<<< HEAD
import store from './store/store'
import * as types from './store/types'
=======
import store from './store'
>>>>>>> 优化代码，把响应拦截器401错误注释，以防一些特殊情况出现拦截
import router from './router'
import Vue from 'vue'

// axios 配置
axios.defaults.timeout = 5000	// 如果请求话费了超过 `timeout` 的时间，请求将被中断
<<<<<<< HEAD
axios.defaults.baseURL = 'http://forcar.vip:8080/api'

// https://segmentfault.com/q/1010000011171046 发起get、post请求自动添加token

// http request 拦截器
axios.interceptors.request.use(
=======
axios.defaults.baseURL = 'http://forcar.vip:8080/'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// https://segmentfault.com/q/1010000011171046 发起get、post请求自动添加token

// http request 请求拦截器
axios.interceptors.request.use(
	// 在发送请求之前做些什么
>>>>>>> 优化代码，把响应拦截器401错误注释，以防一些特殊情况出现拦截
	config => {
		if (store.state.token) {	// 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.Authorization = `Bearer ${store.state.token}`;
			// console.log("有token");
<<<<<<< HEAD
		} else {
			// console.log("没有token")
			// alert("登录失效，请重新登录！")
		}
		return config;
	},
=======
		}
		return config;
	},
	// 对请求错误做些什么
>>>>>>> 优化代码，把响应拦截器401错误注释，以防一些特殊情况出现拦截
	error => {
		return Promise.reject(error);
	}
)

<<<<<<< HEAD
// http response 拦截器
=======
// http response 响应拦截器
>>>>>>> 优化代码，把响应拦截器401错误注释，以防一些特殊情况出现拦截
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.response) {
			switch (error.response.status) {
				case 401: 
					// 401 清除token信息并跳转到登录界面
<<<<<<< HEAD
					alert("用户名或密码错误，请重新登录！")
					store.commit(types.LOGOUT);
					router.replace({
						path: '/login',
						query: {redirect: router.currentRoute.fullPath}
					})
=======
					// store.commit(types.LOGOUT);
					// router.replace({
					// 	path: '/login',
					// 	query: {redirect: router.currentRoute.fullPath}
					// })
>>>>>>> 优化代码，把响应拦截器401错误注释，以防一些特殊情况出现拦截
			}
		}
		// console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
		return Promise.reject(error.response.data)
	}
)

export default axios;