
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	// 将状态映射到组件this.$store.state.user
	// 组件中调用该方法的属性或者方法，一般写在computed中，页面渲染之后，就能将获取到的user值
	// 这种方法官方不推荐使用，因为无法跟踪每一个状态的变化

	// 定义状态
	state: {
		token: null,
		currentCity: null,
		userId: null,
		outset: null,
		destination: null
	},
	mutations: {
		// 其中第一个参数 state 就是 $store.state，第二个参数 payload 需要另外传入
		login: (state, payload) => {
			window.localStorage.Token = payload;
			state.token = payload;
		},
		logout: (state) => {
			window.localStorage.removeItem('Token');
			window.localStorage.removeItem('UserId');
			window.localStorage.removeItem('Nickname');
			window.localStorage.removeItem('UserInfo')
			state.token = null;
			state.userId = null;
			state.outset = null;
			state.destination = null
		},
		city: (state, payload) => {
			window.localStorage.CurrentCity = payload;
			state.currentCity = payload;
		},
		userId: (state, payload) => {
			window.localStorage.UserId = payload;
			state.userId = payload;
		},
		setOutset: (state, payload) => {
			state.outset = payload
		},
		setDestination: (state, payload) => {
			state.destination = payload
		}
	},
	actions: {
		login: (context, token) => {
			context.commit('login', token);
		},
		logout: (context) => {
			context.commit('logout');
		},
		city: (context, city) => {
			context.commit('city', city);
		},
		userId: (context, userId) => {
			context.commit('userId', userId);
		},
		setOutset: (context, outset) => {
			context.commit('setOutset', outset)
		},
		setDestination: (context, destination) => {
			context.commit('setDestination', destination)
		}
	}
})

export default store