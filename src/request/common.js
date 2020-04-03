// import axios from 'axios';
import service from './axios.js'

// 耦合度很低的函数
export function requestOfPost(url,data){
    return service.post(url,data);
}

