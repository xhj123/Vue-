import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import apiUrl from './request/apiUrl'
// import {checkArray} from './common/array.js'
import './directive/index'

Vue.config.productionTip = false

Vue.prototype.$ApiUrl = apiUrl

//路由拦截 
//获取token 判断token是否还是有效的
let token = sessionStorage.getItem('token');
// console.log(token)
router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth) { //为true 需要通过验证才能跳入
    if(token) {
      next();
      console.log('我进入了路由')
    }else{
      next({
        path:'/login'
      })
    }
  }else {
    next()
    console.log('我是不需要验证的')
  }
})

//自定义指令配置权限
// Vue.directive('display-key', {
//   inserted:(el,binding) => {
//     let displayKey = binding.value;
//     // console.log(displayKey)
//     if(displayKey) {
//       let isHas = checkArray(displayKey);
//       if(!isHas) {
//         el.parentNode && el.parentNode.removeChild(el);
//       } else {
//         // throw new Error('你应该添加display-key')
//       }
//     }
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
