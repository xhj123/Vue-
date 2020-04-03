import axios from 'axios'

// 获取token保持会话
function getTokenByLocal(){
    let token = sessionStorage.getItem('token') || '';
    return token;
}

// 创建一个axios实例
const service = axios.create({
    baseURL:'/apply',
    timeout:5000  //设置请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        if(getTokenByLocal()) {  // 判断本地有没有缓存token
            config.headers['token'] = getTokenByLocal();  //让每个请求都带有自定义的token
            config.headers['ContentType'] = 'application/form-data;charset=utf-8' //后台接收参数的数据类型
        }
        return config
    },
    error => {
        // console.log(error);
        Promise.reject(error);
    }
)

//响应拦截器
service.interceptors.response.use(
    response => {
        let res = response.data;
        //根据后台返回的状态做出不同的操作
        if(res.code == 401){
            // 如果是401，跳转到登录界面
            location.href = '/';
        } else if(res.code == 402){
            // do sth
        }
        return Promise.resolve(response)
    },
    error => {
        // 进行提示 或者弹窗
        return Promise.reject(error)
    }
)

export default service;