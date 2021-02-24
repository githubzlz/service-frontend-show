<template>
  <div id="header">
    <ul id="header1">
      <li class="li1">
        <router-link :to="'/home'" class="router-link">
          首页
        </router-link>
      </li>
      <li class="li1">
        <router-link :to="'/classify'" class="router-link">
          博客
        </router-link>
      </li>
      <li class="li1">
        <router-link :to="'/time'" class="router-link">
          时间轴
        </router-link>
      </li>
      <li class="li1 main">
        <router-link :to="'/about'" >
          <div class="line" style="margin-right: 20px" >
            <div style="width: 60px; height: 1px; background-color: black; margin-bottom: 5px; margin-left: 20px"></div>
            <div style="width: 80px; height: 1px; background-color: black"></div>
          </div>
          <img class="logo" alt="" src="../../assets/image/logo.png" style="width: 163px; height: 36px">
          <div class="line" style="margin-left: 20px">
            <div style="width: 60px; height: 1px; background-color: black; margin-bottom: 5px"></div>
            <div style="width: 80px; height: 1px; background-color: black"></div>
          </div>
        </router-link>
      </li>
      <li class="li1">
        <router-link :to="'/website'" class="router-link">
          留言板
        </router-link>
      </li>
      <li class="li1">
        <router-link :to="'/website'" class="router-link">
          关于我
        </router-link>
      </li>
      <li class="li1">
        <router-link :to="'/about'" class="router-link">
          搜索
        </router-link>
      </li>
    </ul>
    <ul id="header2">
      <img class="logo23" alt="" src="../../assets/image/logo.png" >
      <li v-for="(menu,i) in menus" v-bind:key="i" :style="getHeader2LiStyle(i)">
        <router-link :to="menu.link" class="router-link">
          {{menu.title}}
        </router-link>
      </li>
    </ul>
    <div id="header3">
      <img id="menuIcon" src="../../../src/assets/icon/menu-fold.png" v-on:click="handleMenuOpen()">
      <img class="logo23" alt="" src="../../assets/image/logo.png" >
      <el-drawer
          :visible.sync="showMinMenu"
          :with-header="false"
          direction="ltr"
          size="150px">
        <div style="text-align: left;">
          <h3 style="text-align: center; background-color: rgba(244,244,244,0.85);height: 60px;line-height: 60px">导航</h3>
          <div id="menus">
            <div class="menu" v-for="(menu,i) in menus" v-bind:key="i">
              <div class="title">
                <router-link :to="menu.link">
                  {{menu.title}}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
    <div class="header_bottom"></div>
  </div>
</template>

<script>
import {api} from '../../api/api';
import $ from 'jquery'
export default {
  name: "Header",
  data(){
    return{
      showMinMenu: false,
      menus:[
        {
          title:'首页',
          link:'/index'
        },{
          title:'博客',
          link:'/classify'
        },{
          title:'时间轴',
          link:'/time'
        },{
          title:'留言板',
          link:'/website'
        },{
          title:'关于我',
          link:'/aboutme'
        },{
          title:'搜索',
          link:'/search'
        }
      ],
      scroll:0,
    }
  },
  methods:{
    getHeader2LiStyle(i){
      if(i === this.menus.length-1){
        return 'margin-right: 40px';
      }
      return '';
    },
    handleMenuClose(){

    },
    handleMenuOpen(){
      this.showMinMenu = true;
    },
    handleScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
          document.body.scrollTop
      let scroll = scrollTop - this.scroll;
      this.scroll = scrollTop;
      if(scroll > 0){ // down
        $('#header').css('top','-80px');
      }else { // up
        $('#header').css('top','0');
      }
    },
  },
  created() {
    api.visit().then();
  },
  mounted() {
    window.addEventListener('scroll',() => {
      this.handleScroll();
    })
  },
}
</script>

<style scoped>
#header{
  position: fixed;
  top: 0;
  left: 0;
  height: 75px;
  width: 100%;
  min-width: 300px;
  z-index: 99999;
  transition: all 400ms;
  overflow: hidden;
}
#header1{
  background-color: rgba(255,255,255,0.9);
  width: 100%;
  height: 100%;
  display: inline-block;
  justify-content: space-between;
  max-width: 1920px;
}
#header2{
  background-color: rgba(255,255,255,0.9);
  width: 100%;
  height: 100%;
  display: none;
}
#header3{
  background-color: rgba(255,255,255,0.9);
  width: 100%;
  height: 100%;
  display: none;
}
.logo23{
  width: 163px;
  height: 36px;
  cursor: pointer;
  display: none;
}
li:hover .router-link{
  border: 2px solid black;
  border-radius: 15px;
  background-color: #dbe9ef;
}
.router-link{
  border-radius: 10px;
  transition: all 800ms;
  border: 2px solid rgba(0,0,0,0);
  padding: 10px;
}
.header_bottom{
  width: 100%;
  height: 50px;
  background: linear-gradient(to bottom, rgba(180, 171, 171, 0.3), rgba(0, 0, 0, 0));
}
a {
  text-decoration: none;
  font-weight: 600;
  color: black;
  font-size: 20px;
  font-family: test_zlz,serif;
}
li{
  display: inline-block;
  line-height: 80px;
  height: 100%;
  margin: 0 1.5%;
}
.main{
  width: 400px;
}
.logo{
  margin-top: 20px;
}
.line{
  margin-bottom: 23px;
  display: inline-block;
  vertical-align: bottom;
}

/*1200px-900px*/
@media screen and (max-width: 1200px){
  #header1{
    display: none;
  }
  #header2{
    display: inline-block;
    text-align: right;
  }
  #header3{
    display: none;
  }
  .logo23{
    display: inline-block;
    float: left;
    margin-top: 15px;
    margin-left: 30px;
  }
  li{
    margin: 0 2%;
  }
}

/**
 * 在800px 到 900px之间调整一下header2的间隔
 */
@media screen and (max-width: 900px){
  li{
    margin: 0 7px;
  }
}

/*800px*/
@media screen and (max-width: 800px){
  #header1{
    display: none;
  }
  #header2{
    display: none;
  }
  #header3{
    display: inline-block;
  }
  .logo23{
    display: inline-block;
    float: none;
    margin-top: 20px;
    text-align: center;
  }
  #menuIcon{
    cursor: pointer;
    width: 35px;
    height: 35px;
    position: absolute;
    top: 20px;
    left: 30px;
  }
  #menus{
    margin-top: 20px;
  }
  .menu{
    cursor: pointer;
    height: 45px;
    line-height: 40px;
    transition: all 300ms;
    width: 100%;
    overflow: hidden;
  }
  .title{
    margin-left: 10px;
    padding: 5px;
    border-radius: 5px;
  }
  .menu:hover{
    background-color: rgba(87, 187, 226, 0.2);
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 18px;
    font-weight: normal;
  }
}
</style>
