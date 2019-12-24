import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import Json from './Json' //测试用数据

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const json=type=>{
	// 模拟异步请求
	return new Promise((resolve,reject) =>{
		setTimeout(() =>{
			resolve(Json[type])
		},500)
	})
}

Vue.prototype.$api = {json}

const app = new Vue({
    ...App
})
app.$mount()
