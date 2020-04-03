import Vue from 'vue'
import Router from 'vue-router'
// import Login from './router/login.routes'

// import Home from './views/Home.vue'
import Login from './views/login/login'
// import Index from './views/index/index'

Vue.use(Router)

const subRoutesList = [];
function importAll(r) {
  r.keys().forEach((key) => {
    subRoutesList.push(r(key).default)
  });
}

importAll(require.context('.',true,/\.routes\.js/))  //匹配与正则相对应的文件 获取所有的".routes.js"文件中的对象，存放在 subRoutesList数组中

// 进阶的写法

const routes = [
  // {
  //   path:'/',
  //   name:'login',
  //   component:Login,
  //   children:[]
  // },
  ...subRoutesList,
  {path:'*',component:Login}  //没有匹配上的路由进入index界面
]

// const routes = [
//   {
//     path:'/index',
//     component:Index,
//     name:'index',
//     children:[]
//   },
//   Login,
//   {path:'*',component:'Index'}
// ]

export default new Router({
  mode:'history',  //路由设置history，域名没有#号
  routes:routes
  // routes: [
  //   {
  //     path: '/home',
  //     name: 'home',
  //     component: Home
  //   },
  //   {
  //     path: '/index',
  //     name: 'index',
  //     component: Index
  //   },
  //   {
  //     path: '/',
  //     name: 'login',
  //     component: Login
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  //   }
  // ]
})
