// 检验权限的方法
export function checkArray(key) {
    // 权限数组
    let arr = ['1','2','3','4']; //模拟一个权限数组，一般由后台传入
    let index = arr.indexOf(key); //检测传入的key是否在权限数组中
    if(index > -1) { //找到了
        return true
    } else {  //无权操作
        return false
    }
}