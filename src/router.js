
import Vue from 'vue'
import VueRouter from 'vue-router';
import store from './store'

import NotFoundComponent from '@/components/NotFoundComponent'
import Home from '@/components/Home'
import Login from '@/components/login/Login'
import LoginNext from '@/components/login/LoginNext'
import Register from '@/components/login/Register'
import CitySelector from '@/components/city/CitySelector'
import UserInfo from '@/components/user/UserInfo'
import Edit from '@/components/user/Edit'
import LocalSearch from '@/components/map/LocalSearch'
import Confirm from '@/components/Confirm'
import Waiting from '@/components/trip/Waiting'

Vue.use(VueRouter)

const routes = [
	{
		path: '*',
		component: NotFoundComponent
	},
	{
		path: '/',
		name: 'Home',
		meta: {
			requireAuth: true	// 添加这个字段，表示进入该路由是需要登录的
		},
		component: Home
	},
	{
		path: '/user/',
		name: 'User',
		meta: {
			requireAuth: true
		},
		component: UserInfo
	},
	{
		path: '/user/edit',
		name: 'Edit',
		meta: {
			requireAuth: true
		},
		component: Edit
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/login/2',
		name: 'LoginNext',
		component: LoginNext
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	},
	{
		path: '/city',
		name: 'CitySelect',
		component: CitySelector
	},
	{
		path: '/search',
		name: 'LocalSearch',
		meta: {
			requireAuth: true
		},
		component: LocalSearch
	},
	{
		path: '/confirm',
		name: 'ConfirmCalling',
		meta: {
			requireAuth: true
		},
		component: Confirm
	},
	{
		path: '/trip/waiting',
		name: 'Waiting',
		meta: {
			requireAuth: true
		},
		component: Waiting
	},
]


const router = new VueRouter({
	routes,
	// 使用 HTML5 history 模式，该模式下没有 # 前缀，而且可以使用 pushState 和 replaceState 来管理记录。
	// 否则就会使用默认的 hash 模式
	mode: 'history'
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('Token')) {
	let ls_userinfo = JSON.parse(window.localStorage.getItem('UserInfo'))
	store.dispatch('login', window.localStorage.getItem('Token'));
	store.dispatch('userId', ls_userinfo.userId);
}

if (window.localStorage.getItem('CurrentCity') == '' || window.localStorage.getItem('CurrentCity') == null || window.localStorage.getItem('CurrentCity') == undefined) {
	store.dispatch('city', '广州市');
	// console.log(window.localStorage.getItem('city'));
} else {
	store.dispatch('city', window.localStorage.getItem('CurrentCity'));
	// console.log(window.localStorage.getItem('city'));
}

/**
 * 定义完路由后，我们主要是利用vue-router提供的钩子函数beforeEach()对路由进行判断。
 * to: Route: 即将要进入的目标 路由对象
 * from: Route: 当前导航正要离开的路由
 * next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 * 		next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
 * 		next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
 * 		next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
 */
router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {		// 判断该路由是否需要登录权限
		if (store.state.token) {	// 通过vuex state获取当前的token是否存在
			next();
		} else {
			next({
				path: '/login',
				query: {redirect: to.fullPath}	 // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		next();
	}
})
// export default routers 必须写在文件底部，而且后面还需要接一空行，否则无法通过 ESlint 语法验证

export default router;