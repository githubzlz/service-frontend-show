<template>
  <div class="index" style="margin: 0 auto">
    <div class="body" style="position: relative; max-width: 1960px; margin: 0 auto">
      <div class="bodyTop1">
        <div class="background_left">
          <div class="info">
            <div style="height: 130px; width: 2px; background-color: rgba(0,0,0,0.5); position: absolute; right: 15px; bottom: 450px" >
            </div>
            <div style="height: 300px">
              <div style="position: absolute; right: 8px; bottom: 360px">
                <span style="writing-mode: vertical-lr">Share Me</span>
              </div>
              <div style="position: absolute; right: 3px; bottom: 320px; cursor: pointer; background-color: white; border-radius: 30px; width: 23px; height: 23px;" v-on:click="toQQShare">
                <img class="icon" src="../../assets/image/icon_qq.png" alt="" style="margin-left: -1px; margin-top: -1px">
              </div>
              <div style="position: absolute; right: 3px; bottom: 280px; cursor: pointer">
                <i class="el-icon-share" style="cursor: pointer;height: 24px; font-size: 25px" v-on:click="copyLink"></i>
              </div>
            </div>
            <div style="height: 150px; width: 2px; background-color: rgba(0,0,0,0.5); position: absolute; right: 15px; bottom: 110px">
            </div>
          </div>
        </div>
        <div class="background_right">
          <div class="cover">

          </div>
        </div>
        <div class="image">
          <div class="interval">
            <el-carousel :interval="5000"
                         type="card"
                         height="630px"
                         trigger="click"
                         arrow="never"
                         id="carousel"
                         indicator-position="none"
                         ref="carousel"
                         v-on:change="((pre) => {change(pre)})">
              <el-carousel-item v-for="(item, index) in carouselData" :key="index">
                <div :style=" 'width: 100%; height: 100%; background: url('+item.url+') 0 0 / 100% 100% no-repeat;'">
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div id="inner_word" v-if="carouselData[0] !== undefined">
            <div id="inner_word_top" v-if="carouselData[0].description !== undefined">
              {{carouselData[0].description}}
            </div>
            <div id="inner_word_bottom">
              {{carouselData[0].subDescription}}
            </div>
          </div>
          <div id="inner_word2">
            <div id="inner_word_top2" v-if="carouselData[0].description !== undefined">
              {{carouselData[0].description}}
            </div>
            <div id="inner_word_bottom2">
              {{carouselData[0].subDescription}}
            </div>
          </div>
          <div class="inner_number">
            <div v-for="index in carouselData.length" :key="index" class="number" v-on:click="setActiveItem(index-1)" :id="'numItem'+index">
              {{index}}
            </div>
          </div>
        </div>
      </div>
      <div class="bodyTop2">
        <div id="backContent">
          <div class="word">
            <TypeWriter v-bind:wordOut="wordOut"></TypeWriter>
          </div>
          <div class="down" v-on:click="downClick()">
            <img id="downIcon" src="../../assets/icon/down.png" width="100" height="70" alt="">
          </div>
        </div>
      </div>
      <div id="index">
        <div id="content0">
          <el-card class="card" shadow="hover">
            <div style="padding: 14px; text-align: left">
              <div class="title">
                <el-icon class="el-icon-s-data" style="margin-right: 10px; "></el-icon>
                网站统计
              </div>
              <div class="divider_self"></div>
              <div class="cardItem">
                <el-divider content-position="left">今日</el-divider>
                <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆;">
                  <div style="display: inline-block; width: 150px;margin-left: 16px; font-size: 16px;">
                    访问量
                  </div>
                  <div style="display: inline-block; font-family: 等线;">
                    {{ statistics.pvToday}}
                  </div>
                </div>
                <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆;">
                  <div style="display: inline-block; width: 150px;margin-left: 16px; font-size: 16px;">
                    新文章数量
                  </div>
                  <div style="display: inline-block; font-family: 等线;">
                    {{ statistics.blogToday}}
                  </div>
                </div>
                <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆;">
                  <div style="display: inline-block; width: 150px; margin-left: 16px; font-size: 16px;">
                    阅读量
                  </div>
                  <div style="display: inline-block; font-family: 等线;">
                    {{ statistics.readingToday}}
                  </div>
                </div>
              </div>
              <div class="cardItem">
                <el-divider content-position="left">总计</el-divider>
                <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆;">
                  <div style="display: inline-block; width: 150px;
                        margin-left: 16px; font-size: 16px;">
                    访问量
                  </div>
                  <div style="display: inline-block; font-family: 等线;">
                    {{ statistics.pvTotal}}
                  </div>
                </div>
                <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆; ">
                  <div style="display: inline-block; width: 150px;
                        margin-left: 16px; font-size: 16px;">
                    文章数量
                  </div>
                  <div style="display: inline-block; font-family: 等线;">
                    {{ statistics.blogTotal}}
                  </div>
                </div>
                <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆;">
                  <div style="display: inline-block; width: 150px;
                        margin-left: 16px; font-size: 16px;">
                    阅读量
                  </div>
                  <div style="display: inline-block; font-family: 等线;">
                    {{ statistics.readingTotal}}
                  </div>
              </div>
            </div>
            </div>
          </el-card>
        </div>
        <div id="content1">
          <WaterfallChild></WaterfallChild>
        </div>
        <div id="content2">
          <el-card id="statistic" class="card" shadow="hover">
            <div style="padding: 14px; text-align: left">
              <div class="title">
                <el-icon class="el-icon-s-data" style="margin-right: 10px; "></el-icon>
                网站统计
              </div>
              <div class="divider_self"></div>
              <el-divider content-position="left">今日</el-divider>
              <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆;">
                <div style="display: inline-block; width: 150px;margin-left: 16px; font-size: 16px;">
                  访问量
                </div>
                <div style="display: inline-block; font-family: 等线;">
                  {{ statistics.pvToday}}
                </div>
              </div>
              <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆;">
                <div style="display: inline-block; width: 150px;margin-left: 16px; font-size: 16px;">
                  新文章数量
                </div>
                <div style="display: inline-block; font-family: 等线;">
                  {{ statistics.blogToday}}
                </div>
              </div>
              <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆;">
                <div style="display: inline-block; width: 150px; margin-left: 16px; font-size: 16px;">
                  阅读量
                </div>
                <div style="display: inline-block; font-family: 等线;">
                  {{ statistics.readingToday}}
                </div>
              </div>
              <el-divider content-position="left">总计</el-divider>
              <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆;">
                <div style="display: inline-block; width: 150px;
                        margin-left: 16px; font-size: 16px;">
                  访问量
                </div>
                <div style="display: inline-block; font-family: 等线;">
                  {{ statistics.pvTotal}}
                </div>
              </div>
              <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆; ">
                <div style="display: inline-block; width: 150px;
                        margin-left: 16px; font-size: 16px;">
                  文章数量
                </div>
                <div style="display: inline-block; font-family: 等线;">
                  {{ statistics.blogTotal}}
                </div>
              </div>
              <div style="width: 100%; height: 30px; line-height: 30px; font-family: 幼圆;">
                <div style="display: inline-block; width: 150px;
                        margin-left: 16px; font-size: 16px;">
                  阅读量
                </div>
                <div style="display: inline-block; font-family: 等线;">
                  {{ statistics.readingTotal}}
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="card" shadow="hover">
            <div style="padding: 14px; text-align: left">
              <div class="title">
                <el-icon class="el-icon-notebook-1" style="margin-right: 10px; "></el-icon>
                热门板块
              </div>
              <div class="divider_self"></div>
              <div class="articleBack" v-for="(item,index) in sideList" :key="index">
                <img class="articleBackImg" :src="item.imgSrc" alt="">
                <div class="articleBackGround">
                  <div class="read_button" v-on:click="toDetail(item.id)">阅读</div>
                </div>
                <div class="articleTop">
                  Top {{index+1}}
                </div>
                <div style="position: absolute; right: 10px; top: 5px; color: rgb(205,181,66); height: 25px;">
                  <div style="margin-right: 3px; height: 25px; display: inline-block; vertical-align: middle">{{item.orderNum}}</div>
                  <div class="icon_my"></div>
                </div>
                <div class="articleTitle">
                  {{item.title}}
                </div>
                <div class="articleTag">
                  {{item.type}}
                </div>
                <div class="articleTime">
                  {{getDate(item.lastModifiedTime)}}
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="card" shadow="hover">
            <div style="padding: 14px; text-align: left; position: relative">
              <div class="title">
                <el-icon class="el-icon-price-tag" style="margin-right: 10px"></el-icon>
                标签云
                <i v-on:click="setTagStyle()">
                  <el-icon class="el-icon-refresh" style="position: absolute; right: 10px; cursor: pointer; z-index: 999">
                  </el-icon>
                </i>
              </div>
              <div class="divider_self" style="background-color: coral"></div>
              <div class="cloud">
                <div v-for="(item,index) in tagList" class="tag" :key="index" v-on:click="clickTypeList(item.type, item.name)">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="card" shadow="hover">
            <div style="padding: 14px; text-align: left">
              <div class="title">
                <el-icon class="el-icon-monitor" style="margin-right: 10px"></el-icon>
                留言
              </div>
              <div class="divider_self" style="background-color: #bdbd77;"></div>
              <div>
                <el-input style="margin-top: 10px; margin-bottom: 20px"
                          placeholder="请输入称呼"
                          v-model="searchInputName">
                  <template slot="prepend">称呼</template>
                </el-input>
              </div>
              <div>
                <el-input style="margin-top: 10px; margin-bottom: 20px"
                          placeholder="请输入联系方式"
                          v-model="searchInputContact">
                  <el-select v-model="select" slot="prepend" style="width: 80px">
                    <el-option label="QQ" value="QQ"></el-option>
                    <el-option label="微信" value="微信"></el-option>
                    <el-option label="邮箱" value="邮箱"></el-option>
                  </el-select>
                </el-input>
              </div>
              <div>
                <el-input
                    type="textarea"
                    placeholder="请输入留言内容"
                    v-model="textarea"
                    maxlength="100"
                    show-word-limit>
                </el-input>
              </div>
              <div style="margin-top: 10px; text-align: center">
                <el-button round v-on:click="clearAll()">清空</el-button>
                <el-button round v-on:click="commentClick()">留言</el-button>
                <el-button round v-on:click="privateClick()">私信</el-button>
              </div>
              <div id="message" style="color: red; font-size: 13px; text-align: center; margin-top: 10px">
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeWriter from "@/components/common/TypeWriter";
import {api} from '@/api/api'
import $ from 'jquery'
import WaterfallChild from "@/components/index/WaterfallChild";
export default {
  name: "Index",
  components:{WaterfallChild, TypeWriter},
  data () {
    return{
      wordOut:{
        output:'',
        // input:'历史可鉴世，文学可润心，润心博客欢迎您的光临',
        input:'轻轻的我走了，正如我轻轻地来。我轻轻的招手，作别西天的云彩。最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。道一声珍重，道一声珍重。那一声珍重里有蜜甜的忧愁。',
        speed:180,
        disSpeed:60,
        reAppendIndex:0,
        cursor:'|'
      },
      copyContent:'点击获取分享链接',
      qqShare:'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=www.zlztsb.com&title=Zlz个人博客&desc=ZLZ博客分享生活趣事,学习笔记,技术干货。&summary=ZLZ博客分享生活趣事,学习笔记,技术干货&site=SOURCE&pics=IMAGE',
      myUser:{},
      searchInputName:'',
      searchInputContact:'',
      searchInputC:'',
      upToShow: false,
      scrollIndex: 0,
      textarea: '',
      select: 'QQ',
      searchInput: '',
      my: this,
      leftWidth : document.documentElement.clientWidth,
      sideList:[],
      typeList:[],
      tagList:[],
      carouselData:[
        {
          url: '',
          description:'',
          subDescription:'',
        }
      ],
      statistics:{
        pvToday:"0",
        readingToday:"0",
        blogToday:"0",
        userToday:"0",
        messageToday:"0",
        pvTotal:"0",
        readingTotal:"0",
        blogTotal:"0",
        userTotal:"0",
        messageTotal:"0",
        date:""
      }
    }
  },
  created() {
    this.myUser = localStorage.getItem('user');
    api.getStatistics().then(res =>{
      if(res.code === 1){
        this.statistics = res.entity;
      }
    });
    api.getBanner(5).then(res =>{
      this.carouselData = res.entity;
    });
    api.getHotBlog(3).then(res =>{
      this.sideList = res.entity;
    });
    api.getBlogTypeList().then(res =>{
      this.typeList = res.entity;
    });
    api.getBlogTags().then(res =>{
      this.tagList = res.entity;

      //设置tag标签
      setTimeout(()=>{
        this.setTagStyle();
      }, 100)
    })
  },
  methods: {
    copyLink(){
      var copy = function (e) {
        e.preventDefault();
        var text = "https://www.zlztsb.com"
        if (e.clipboardData) {
          e.clipboardData.setData('text/plain', text);
        } else if (window.clipboardData) {
          window.clipboardData.setData('Text', text);
        }
      }
      window.addEventListener('copy', copy);
      document.execCommand('copy');
      window.removeEventListener('copy', copy);
      this.$message({
        dangerouslyUseHTMLString: true,
        message: '<h3>链接已复制</h3>',
        duration:1500,
        center: true,
        iconClass:"none"
      });
    },
    clickTypeList(type, typeName){
      this.$router.push({name:'classify',query: {type:type, typeName:typeName}})
      console.log(type)
    },
    toQQShare(){
      window.open(
          this.qqShare, '_blank'
      )
    },
    toDetail(blogId){
      this.$router.push({name:'detail',params: {id:blogId}})
    },
    clearAll(){
      this.select = 'QQ';
      this.searchInputName=''
      this.searchInputContact=''
      this.textarea = ''
    },
    commentClick(){
      const json = JSON.parse(localStorage.getItem('user'));
      let name = json.username;
      if(this.searchInputName){
        name = this.searchInputName;
        this.myUser = {
          username: name,
          userId:json.userId,
          headImg:json.headImg
        };
        localStorage.setItem('user', JSON.stringify(this.myUser))
      }
      const param = {
        userId:json.userId,
        username:name,
        headImg:json.headImg,
        comment:this.textarea,
        type:"1"
      };

      api.getCommentMsg(param).then(res =>{
        if(res.code === 1){
          document.getElementById("message").innerText = "感谢留言，您可以在留言板看到您的留言"
        }else {
          document.getElementById("message").innerText = "留言失败啦，请刷新页面后重试吧"
        }
      })
    },
    privateClick(){
      const json = JSON.parse(localStorage.getItem('user'));
      let name = json.username;
      if(this.searchInputName){
        name = this.searchInputName;
        this.myUser = {
          username: name,
          userId:json.userId,
          headImg:json.headImg
        };
        localStorage.setItem('user', JSON.stringify(this.myUser))
      }
      const param2 = {
        contactsType: this.select,
        contacts: this.searchInputContact,
        content: this.textarea,
        userId:json.userId,
        name:name
      }
      api.personalLetter(param2).then(res =>{
        if(res.code === 1){
          document.getElementById("message").innerText = res.message
        }else {
          document.getElementById("message").innerText = "私信失败啦，请刷新页面后重试吧"
        }
      })
    },
    setTagStyle(){
      const tags = document.getElementsByClassName("tag");
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];

        const random = Math.floor(Math.random()*10) + 15;
        tag.style.fontSize = random+"px";

        const color1 = Math.floor(Math.random()*255);
        const color2 = Math.floor(Math.random()*255);
        const color3 = Math.floor(Math.random()*255);
        tag.style.color = `rgb(${color1},${color2},${color3})`;

        const marginLeft = Math.floor(Math.random()*10);
        tag.style.marginLeft = marginLeft+"px";

        const marginBottom = Math.floor(Math.random()*5);
        tag.style.marginBottom = marginBottom+"px";
      }
    },
    getDate(date){
      let dt = new Date(date);
      let m = dt.getMonth() + 1;
      let d = dt.getDate();
      let h = dt.getHours();
      let mi = dt.getMinutes();
      return `${m}/${d} ${h}:${mi}`
    },
    search(){
      this.searchInputC = this.searchInput;
      if(this.searchInput !== undefined){
        if(this.searchInput.substring(0,1) === " "){
          this.searchInput = this.searchInput.trim();
        }else {
          this.searchInput = " " + this.searchInput;
        }
      }
    },
    change: function (pre){
      //this.img = require(this.carouselData[pre].img);
      this.changeWord(pre);
      let i = 1;
      for (i; i<= this.carouselData.length; i++){
        const id = "numItem"+ i;
        if(i === pre+1){
          document.getElementById(id).style.border = "1px solid #c1b8b8";
        }else {
          document.getElementById(id).style.border = "none";
        }
      }
    },
    setActiveItem:function (index){
      this.$refs.carousel.setActiveItem(index);
    },
    changeWord(current){
      document.getElementById("inner_word").style.left = "0";
      document.getElementById("inner_word2").style.left = "900px";
      let pre = current -1;
      if(pre < 0){
        pre += this.carouselData.length;
      }
      document.getElementById("inner_word_top").innerText = this.carouselData[pre].description;
      document.getElementById("inner_word_bottom").innerText = this.carouselData[pre].subDescription;
      document.getElementById("inner_word_top2").innerText = this.carouselData[current].description;
      document.getElementById("inner_word_bottom2").innerText = this.carouselData[current].subDescription;
      this.outImage("inner_word");
      this.intoImage("inner_word2");
    },
    outImage: function (id) {
      const style = document.getElementById(id).style;
      let px = 0;
      const interval = setInterval(() => {
        style.left = px + "px"
        px -= 15;
        if (px <= -900) {
          clearInterval(interval);
          style.left = "900px"
        }
      }, 6);
    },
    intoImage: function (id){
      const style = document.getElementById(id).style;
      let px = 900;
      const interval = setInterval(() => {
        style.left = px + "px"
        px -= 15;
        if (px <= 0) {
          clearInterval(interval);
          style.left = "0"
        }
      }, 6);
    },
    handleResize(){
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let bodyTop2 = document.getElementsByClassName('bodyTop2');
      if(bodyTop2 && bodyTop2.length !== 0){
        bodyTop2[0].style.height = `${h}px`;
      }
    },
    downClick(){
      let ht = $('html:first');
      // 滑动到index处
      let scrollToContainer = $('#index');
      let d = scrollToContainer.offset().top;
      // 滑动到指定位置
      ht.animate({
        scrollTop: d
      }, (d-60)*1.2, ()=>{
        // 向上滚动一下将导航显示出来
        ht.scrollTop(d-80)
      });
    },

    /**
     * 向下箭头的动画
     */
    downAnimate(){
      const div = $("#downIcon");
      startAnimation();
      function startAnimation(){
        div.animate({marginTop:10},"normal");
        div.animate({marginTop:30},"normal");
        div.animate({marginTop:10},"slow",startAnimation);
      }
    },
  },
  mounted(){
    this.downAnimate();
    this.handleResize();
    window.addEventListener('resize', () => {
      this.handleResize();
    }, false);
  },
  destroyed() {
  }
}

</script>

<style scoped>
.index{
  text-align: center;
}
.bodyTop1{
  position: relative;
  margin-top: 75px;
  height:85%;
  overflow: hidden;
}
.bodyTop2{
  display: none;
}
#index{
  display: flex;
  flex-wrap: wrap;
  margin: 90px auto 20px auto;
  max-width: 1300px;
  align-content: flex-start;
}
#content0{
  width: 100%;
  display: none;
}
#content1{
  display: flex;
  flex-wrap: wrap;
  flex: 9;
  flex-shrink: 0;
}
#content2{
  align-content: flex-start;
  display: flex;
  flex-wrap:wrap;
  flex: 4;
}
.card{
  width: 100%;
  min-width: 300px;
  background-color: rgb(245,255,255);
  margin:20px;
}
@media screen and (orientation: portrait) {
  /*竖屏 css*/
  .bodyTop2{
    background-image: url("../../assets/image/bg2.jpg");
  }
}
@media screen and (orientation: landscape) {
  /*横屏 css*/
  .bodyTop2{
    background-image: url("../../assets/image/bg1.jpg");
  }
}
/*1800px-1200px*/
@media screen and (max-width: 1800px){
  .bodyTop1{
    display: none;
  }
  .bodyTop2{
    display: block;
    position: relative;
    background-size: 100% 100%;
  }
  #backContent{
    transition: visibility 1.3s;
    width: 100%;
    height: 100%;
  }
  .down{
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 87%;
    transform: translate(-50%, 0);
    height: 70px;
    width: 100px;
  }
  .word{
    font-family: test_zlz,serif;
    z-index: 10;
    font-size: 28px;
    max-width: 500px;
    text-align: left;
    position: relative;
    top: 40%;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

/*1200px-800px*/
@media screen and (max-width: 1200px){
  #content1{
    min-width: 760px;
  }
}
@media screen and (max-width: 1110px){
  #content0{
    display: flex;
  }
  #statistic{
    display:none;
  }
  .cardItem{
    display: inline-block;
    width: 45%;
    margin: 0 2%;
    overflow: hidden;
  }
}
/*800px-500px以下*/
@media screen and (max-width: 800px){
  #content1{
    min-width: 500px;
  }
  .cardItem{
    width: 100%;
  }
}
/*500px以下*/
@media screen and (max-width: 500px){
  #content1{
    min-width: 360px;
  }
}
  .icon_my{
    display: inline-block;
    width: 20px;
    height: 25px;
    background-image: url('../../assets/image/icon_hot.png');
    background-size: 20px 20px;
    background-position-y: 4px;
    background-repeat: no-repeat;
  }
  .tag{
    font-weight: bolder;
    font-family: "微软雅黑 Light",serif;
    cursor: pointer;
    padding: 2px;
    margin: 4px;
    border-radius: 5px;
    color: #baa667;
    display: inline-block;
    float: top;
  }
  .el-card:hover .divider_self{
    width: 100%;
  }

  .divider_self{
    background-color: #58ad66;
    width: 40%;
    height: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    transition: width 800ms;
  }
  .sort_title_right{
    position: absolute;
    right: 10px;
    bottom: 16px;
  }
  .sort_title_left{
    line-height: 50px;
    margin-left: 10px;
    letter-spacing: 1px;
  }
  .sort_title:hover{
    background-color: #bdbd77;
    color: white;
  }
  .sort_title{
    border: 3px solid #faf8f8;
    border-radius: 5px;
    transition: color,background-color 500ms;
    cursor: pointer;
    color: rgba(0,0,0,0.5);
    position: relative;
    width: 100%;
    height: 50px;
    background-color: white;
    margin: 15px auto;
  }
  .read_button{
    cursor: pointer;
    transition: color,background-color 800ms;
    width: 50px;
    height: 25px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: rgba(255,255,255,0);
    background-color: rgba(255,255,255,0);
    border-radius: 5px;
    text-align: center
  }
  .articleTop{
    color: #f6f8f5;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .articleBack:hover .articleBackGround{
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .articleBack:hover .read_button{
    color: rgb(80, 5, 5);
    background-color: rgba(255,255,255,0.8);
  }
  .articleTime{
    z-index: 8;
    position: absolute;
    color: #eae2e2;
    bottom: 10px;
    right: 20px;
    font-size: 13px;
    padding: 2px;
    border-radius: 5px;
    background-color: rgba(83, 80, 80, 0.8);
  }

  .articleTag{
    z-index: 8;
    position: absolute;
    color: #eae2e2;
    bottom: 10px;
    left: 20px;
    font-size: 13px;
    padding: 2px;
    border-radius: 5px;
    background-color: rgba(83, 80, 80, 0.8);
  }
  .articleTitle{
    z-index: 8;
    color: white;
    position: absolute;
    bottom: 40px;
    left: 10px;
  }
  .articleBackGround{
    position: absolute;
    top: 0;
    left: 0;
    transition: background-color 1s;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .articleBackImg{
    z-index: 9;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .articleBack{
    position: relative;
    width: auto;
    height: 150px;
    background-size: 100%;
    margin-top: 5px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .title{
    font-family: 华文彩云;
    font-size: 20px;
    padding: 5px 5px 5px 0;
  }

  .icon{
    width: 25px;
    height: 25px;
  }
  .inner_number{
    font-family: test_zlz;
    position: absolute;
    right: 120px;
    bottom: 30px;
  }
  .number{
    cursor: pointer;
    display: inline-block;
    line-height: 22px;
    height: 20px;
    width: 20px;
    border-radius: 30px;
    margin: 0 10px;
  }
  #inner_word{
    font-family: test_zlz;
    position: absolute;
    text-align: left;
    color: rgba(244,244,244,0.85);
    font-size: 45px;
    left: 0;
    bottom: 20px;
    width: 750px;
  }
  #inner_word2{
    font-family: test_zlz;
    position: absolute;
    text-align: left;
    color: rgba(244,244,244,0.85);
    font-size: 45px;
    left: 900px;
    bottom: 20px;
    width: 750px;
  }
  .interval{
    overflow: hidden;
    margin-left: -480px;
    margin-top: 0px;
  }
  .background_left{
    overflow: hidden;
    display: inline-block;
    height: 780px;
    width: 70%;
    background-image: linear-gradient(to right, #f6e268 0%, #20a9bf 100%);
  }
  .background_right{
    position: relative;
    display: inline-block;
    height: 780px;
    width: 30%;
  }
  .info{
    position: relative;
    margin-left: 28%;
    width: 30px;
    height: 100%;
  }

  .image{
    overflow: hidden;
    width: 75%;
    height: 780px;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
