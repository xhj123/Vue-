// 封装总的请求方法
// import axios from 'axios'

// let error = function(){
//     return () => {};
// }

// export function postRequest(url,params,callback,errorCallback = error()) {
//     axios.post(url,params).then(res => {
//         // 成功的情况
//         let data = res.data;
//         callback(data);

//         // if(data.code == '000'){
//         //     callback(data);
//         // } else if(data.code == '001') {
//         //     errorCallback();
//         // }

//     })
//     .catch(err => {
//         alert('请找产品经理')
//         errorCallback(err);
//     })
// }


import {requestOfPost} from '../request/common.js'

export function postRequest(url,data){
    return new Promise((resolve,reject) => {
        requestOfPost(url,data).then(res=>resolve(res),error => reject(error))
    })
}