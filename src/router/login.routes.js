// import Login from '../views/login'

export default {
    path:'/login',
    name:'login',
    component:() => import(/*webpackChunkName:"login"*/'../views/login/login'), //把相同的模块打入一个chunk(块)
    children:[]
}