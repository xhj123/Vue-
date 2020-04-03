export default {
    path:'/index',
    name:'index',
    // 路由懒加载 =>它在访问这个路径的时候才会去加载这个vue模块
    component:() => import(/*webpackChunkName:"index"*/'../views/index/index.vue'), //把相同的模块打入一个chunk(块)
    children:[],
    meta:{
        // 自定义一个字段，在路由拦截的时候使用
        requireAuth:true
    }
}