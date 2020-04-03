<template>
    <div class="con">
        <div class="main">
            <h2>网易云计算基础服务</h2>
            <div>
                <label>账号：</label>
                <el-input
                    v-model="user.userName"
                    placeholder="请输入账号"
                    v-focus
                >
                </el-input>
            </div>
            <div>
                <label>密码：</label>
                <el-input type="password"
                    v-model="user.passWord"
                    >
                </el-input>
            </div>
            <div class="verify">
                <label>验证码：</label>
                <el-input 
                    v-model="user.verifyCode"
                    placeholder="验证码"
                ></el-input>

                <span class="verifySpan" @click="refreshVerifyCode()">
                    {{verifyText}}
                </span>
            </div>
            <div>
                <label>记住我：</label>
                <span class="remember-span">
                    <el-radio v-model="user.rememberMe" label="1">是</el-radio>
                    <el-radio v-model="user.rememberMe" label="2">否</el-radio>
                </span>
            </div>
            <div>
                <el-button type="primary" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {postRequest} from '../../api/api';
import { setTimeout } from 'timers';
// import url from '../request/apiUrl'
export default {
    name:'login',
    data(){
        return {
            user:{
                userName:null,
                passWord:null,
                verifyCode:null,
                rememberMe:'1'
            },
            verifyText:'验证码',
            userValue:[],
            errorMsg:[
                '请输入账号',
                '请输入密码',
                '请输入验证码'
            ]
        }
    },
    // 自定义指令 => 文本框数据检测
    directives:{
        focus:{
            inserted:(el) => {
                //  console.log(el)
                // querySelector查找元素
                let input = el.querySelector('input');
                input.focus();
            },
            update:(el) => {
                let valDom = el.querySelector('input');
                let value = valDom.value
                let span = document.createElement('span');
                span.innerText = '限制6位';
                span.className = 'limt-span-userName';
                //查找是否存在span
                let spanDom = el.querySelector('span')
                if(value.length >6){
                    valDom.style.border = "1px solid red"
                    !spanDom && el.appendChild(span);
                } else {
                    valDom.style.border = "1px solid #DCDFE6"
                    spanDom && el.removeChild(spanDom);
                }
            }
        }
    },
    methods:{
        // 生成(刷新)验证码
        refreshVerifyCode() {
            let code = ''; //验证码
            // 验证码长度
            let verifyCodeLength = 4;
            // 随机数
            let random = new Array(2,3,4,5,6,7,8,9,
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
            'S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i',
            'j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z');
            for(let i = 0;i<verifyCodeLength;i++){
                // Math.floor(x)返回小于等于x的最大整数
                // console.log(Math.random() * random.length)
                let charIndex = Math.floor(Math.random() * random.length);
                code += random[charIndex];
            }
            this.verifyText = code;
        },
        // async 和 await 一起使用 代替 then方法的使用 属于ES7的用法
        async login() {
            // 提交之前先判断 用户、密码、验证码是否填写
            this.userValue = [];
            this.userValue.push(this.user.userName);
            this.userValue.push(this.user.passWord);
            this.userValue.push(this.user.verifyCode);
            for(let i = 0,len = this.userValue.length;i<len;i++){
                let val = this.userValue[i];
                if(!val) {
                    this.$message.warning(this.errorMsg[i]);
                    this.refreshVerifyCode();
                    return
                }
            }
            // 判断验证码 填写是否正确
            if(this.verifyText.toUpperCase() !== this.user.verifyCode.toUpperCase()) {
                this.$message.warning('验证码错误');
                this.verifyText = null;
                this.refreshVerifyCode();
                return;
            }

            let {userName,passWord} = this.user;
            let params = {
                userName,
                password:passWord
            }
            // console.log(params)
            // loginApi(params,(data) => {
            //     console.log(data)
            // });

            // then
            // postRequest(url.loginUrl,params).then(res => console.log(res));

            // ES7
            // console.log(this.$ApiUrl.loginUrl)
            // 如果await后面的函数报错  下面的代码不能继续执行，所以使用try catch
            try{
                let loginData = await postRequest(this.$ApiUrl.loginUrl,params);
                // console.log(loginData)
                // es7 会有一个弊端，当请求发生错误的时候，不会执行下面的代码
                if(loginData.data.code == 200 ){
                    this.user.rememberMe == '1' ? 
                    this.setCookie(this.user.userName,this.user.passWord,this.user.rememberMe):
                    this.clearCookie();
                    // 保存token
                    sessionStorage.setItem('token',loginData.data.data.token)
                    this.$message.success('登录成功!');
                    //登录成功之后进行页面跳转
                    setTimeout(()=>{
                        this.$router.push('/index');
                    },3000)
                }
            }catch(error){
                // console.log("登录失败",error);
                throw new Error('登录失败',error);
            }
            

        },
        // 保存cookie的函数
        setCookie(userName,passWord,rememberMe,exDays) {
            let exDate = new Date(); //获取当前时间
            exDate.setTime(exDate.getTime() + 24*3600*exDays); // 保存的时间
            window.document.cookie = 'userName' + "=" + userName + ';'+ exDate.toGMTString();
            window.document.cookie = 'passWord' + "=" + passWord + ';'+ exDate.toGMTString();
            window.document.cookie = 'rememberMe' + "=" + rememberMe + ';'+ exDate.toGMTString();
        },
        // 删除cookie的函数
        clearCookie() {
            // 清除cookie的时候将用户名、密码设置为空，是否记住设置为2(不记住)
            this.setCookie("","",'2',-1);
        },
        getCookie() {
            let cookieVal = document.cookie;
            // console.log(typeof(cookieVal))
            if(cookieVal.length > 0) {
                let arr = cookieVal.split('; ');
                for(let i = 0,j =arr.length;i<j;i++ ){
                    let arrVal = arr[i].split('=');
                    arrVal[0] == 'userName' ? this.user.userName = arrVal[1] :
                    arrVal[0] == 'passWord' ? this.user.passWord = arrVal[1] :
                    this.user.rememberMe = arrVal[1]
                }
            }
        }
    },
    created(){
        // 页面加载的时候获取cookie
        this.getCookie();
        // console.log(document.cookie);
        this.refreshVerifyCode();
    }
}
</script>

<style lang="scss">
.con {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1989fa;
    opacity: 0.6;
    .main {
        width: 500px;
        height: 400px;
        margin: 50px auto 0 auto;
        background: #fff;
        border-radius: 5px;
        padding: 10px 0;
        div {
            position: relative;
            margin-bottom: 10px;
            .limt-span-userName {
                position: absolute;
                color:red;
                transition: all 0.3s;
                font-size:14px;
                right:-10px;
                top:8px;
            }
            .el-input {
                width: 300px
            }
            .el-input__inner{
                width: 200px;
            }

            label {
                display: inline-block;
                width: 100px;
                text-align: right;
            }

            .remember-span {
                display: inline-block;
                width: 250px;
                padding-left: 50px;
                text-align: left;
                label {
                    width: 40px
                }
            }
        }
        .verify {
            position: relative;
            .el-input {
                text-align: left
            }
            .el-input__inner {
                width: 100px;
                margin-left: 50px
            }
            .verifySpan {
                display: inline-block;
                position: absolute;
                vertical-align: middle;
                height: 40px;
                width: 80px;
                border-radius: 5px;
                border: 1px solid #c0c4cc;
                right: 100px;
                bottom: 10px;
                cursor: pointer;
                line-height: 40px;
                text-align: center
            }
        }
    }
}
</style>
