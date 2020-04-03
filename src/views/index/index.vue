<template>
    <div class="container">
      <div class="head-con">
        <div class="top-one">
          <div class="one-child">
            <img class="log" src="../../assets/img/logo3.png"/>
            <div class="opration">
                <el-button type="text" >备案</el-button>
                <el-button type="text" >控制台</el-button>
            </div>
          </div>
        </div>
        <div class="top-one">
          <div class="one-child">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelectMenu"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item v-for = "(item,index) in menuList" index="1" :key="index"
                    @mouseenter.native="showType(index)"
                    @mouseleave.native="hiddenType(index)">{{item.name}}</el-menu-item>
            </el-menu>
          </div>
          <div :class="isShow ? 'type-detail type-detail-show':'type-detail type-detail-hidden'">
              <div class="ul-con">
                  <ul>
                      <li v-for = "(item,index) in menuListChild" :key="index">
                        {{item}}
                      </li>
                  </ul>
              </div>
          </div>
          
        </div>
      </div>
      <div class="banner-con">
        <el-carousel trigger="click" height="360px">
            <el-carousel-item v-for="item in imgList" :key="item.id">
                <img class="banner-img" :src="item.src"/>
            </el-carousel-item>
        </el-carousel>
        </div>
        <div class="btn-con">
            <el-button type="primary" v-display-key="'5'">我是a用户的权限</el-button>
            <el-button type="primary" v-display-key="'4'">我是c用户的权限</el-button>
            <el-button type="primary" v-display-key="'10'">我是b用户的权限</el-button>
        </div>
        <div class="demo-sass">测试全局加载sass</div>
    </div>
</template>

<script>
import url from '../../request/apiUrl'
import {postRequest} from '../../api/api'
export default {
    name:"index",
    data(){
        return {
            demoChange:'MAX',
            msg:'我是index界面',
            activeIndex:null,
            menuList:[],
            menuListChild:[],
            isShow:false,
            imgList: [
                { id: 1, src: require("../../assets/img/banner1.jpeg") },
                { id: 2, src: require("../../assets/img/banner2.jpeg") },
                { id: 3, src: require("../../assets/img/banner3.jpeg") }
            ],
            activeName: 'first'
        }
    },
    created(){
        this.getList();
    },
    mounted(){
        // this.restaurants = this.loadAll()
    },
    methods:{
        async getList() {
            // console.log(111)
            try {
                let ListData = await postRequest(url.getMenuList,{});
                // console.log(ListData)
                this.menuList = ListData.data.data
            }
            catch(error){
                // console.log(error)
                throw new Error(error)
            }
        },
        openLogin(){

        },
        handleSelectMenu(){
            // console.log(key,keyPath);
        },
        //展示细分类
        showType(index){
            // console.log(index)
            this.isShow = true;
            this.menuListChild = this.menuList[index].children
            // this.isShow = true;
        },
        hiddenType(){
            this.isShow = false;
        },
        handleClickTab(){

        }
    },
    // 一对多 watch（观察者）
    //多对一 computed(计算，运算量比较复杂的时候用)  缓存性  new Date() 例子
    // methods (就是一个方法，什么时候调什么时候用)
}
</script>

<style scoped lang="scss">
.container{
  width: 100%;
  height: 100%;
  .head-con {
    width: 100%;
    margin: 0 auto;
    position: fixed;
    transition: all 0.3s;
    top: 0;
    left: 0;
    z-index: 99;
    opacity: 0.8;
    .el-menu--horizontal > .el-menu-item:hover {
      border-bottom: 3px solid #409eff !important;
      color: #409eff !important;
      background: #333;
    }
    
    .top-one{
      width: 100%;
      height: 60px;
      background: #1f232e;
      border-bottom:1px solid #4d4c4c;
      .one-child{
        width:1200px;
        margin: 0 auto;
        text-align: left;
        .log{
          margin-left: 10px
        }
        .opration{
          float:right;
          .el-button{
            color: white;
          }
          button:hover{
            color:#409eff
          }
        }
        .el-menu-demo{
          background: #1f232e;
          border-bottom:1px solid #333;
        }
        
      }
      .type-detail {
          transition: all 0.3s;
          position: absolute;
          width: 100%;
          top: 120px;
          background: rgb(31, 34, 41);
          z-index: -1;
          overflow: hidden;
          .ul-con{
              width: 1200px;
              margin: 0 auto;
              margin-left: 120px;
              ul{
                  margin: 0;
                  li{
                      display: block;
                      width: 186px;
                      text-align: left;
                      float: left;
                      margin-right: 40px;
                      margin-top: 15px;
                      padding-left: 14px;
                      color: white;
                      opacity: 0.6;
                      font-size: 14px;
                  }
              }
          }
        }
        .type-detail-hidden{
              height: 0;
        }
        .type-detail-show{
            height: 200px;
        }
      
    }
  }
  .banner-con {
      width: 100%;
      height: 500px;
      // position: fixed;
      left: 0;
      top:0px;
        .banner-img {
          width: 100%;
          height: 360px;
        }
        
  }
  .demo-sass{
    @include fontColor
  }
    
}
</style>