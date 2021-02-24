<template>
  <div class="index" style="margin: 0 auto">
    <el-row>
      <el-col :span="spanData">
        <el-card v-if="noData" shadow="hover" style="background-color: rgb(245,255,255); margin: 20px">
          暂无数据
        </el-card>
        <div v-for="(item,index) in list1" :key="index">
          <el-card v-if="item.blogRecommend.imageUrl != null" shadow="hover" style="background-color: rgb(245,255,255); margin: 20px">
            <div class="image_div">
              <div class="background">
              </div>
              <img :src="item.blogRecommend.imageUrl" class="image" v-on:click="toDetail(item)">
            </div>
            <div style="padding: 14px; text-align: left">
              <div class="title" v-on:click="toDetail(item)">{{item.title}}</div>
              <div class="bottom clearfix">
                <i class="el-icon-date"></i>
                <time class="time">{{getDate(item.lastModifiedTime)}}</time>
                <div style="display: inline-block; margin-right: 15px; margin-top: 10px">
                  <div class="icon-my" style="margin-left: 25px; width: 18px; height: 18px; display: inline-block"/>
                  <span style="margin-left: 5px;">{{item.blogPublicInfos.readings}}</span>
                </div>
                <div style="display: inline-block; margin-right: 15px;margin-top: 10px">
                  <i class="el-icon-star-off"></i>
                  <span style="margin-left: 5px;">{{item.blogPublicInfos.goods}}</span>
                </div>
                <div style="display: inline-block;margin-right: 15px;margin-top: 10px">
                  <i class="el-icon-chat-line-square" style="cursor: pointer" v-on:click="toDetail(item)"></i>
                  <span style="margin-left: 5px; cursor: pointer" v-on:click="toDetail(item)">{{item.blogPublicInfos.comments}}</span>
                </div>
              </div>
              <div class="card_body">
                {{item.summary}}
              </div>
              <el-button type="text" class="button" v-on:click="toDetail(item)">阅读全文 - ></el-button>
            </div>
          </el-card>
          <el-card v-if="item.blogRecommend.imageUrl == null" shadow="hover" style="background-color: rgb(245,255,255); margin: 20px">
            <div style="padding: 14px; text-align: left">
              <div class="title" v-on:click="toDetail(item)">{{item.title}}</div>
              <div class="bottom clearfix">
                <i class="el-icon-date"></i>
                <time class="time">{{getDate(item.lastModifiedTime)}}</time>
                <div style="display: inline-block; margin-right: 15px; margin-top: 10px">
                  <div class="icon-my" style="margin-left: 25px; width: 18px; height: 18px; display: inline-block"/>
                  <span style="margin-left: 5px;">{{item.blogPublicInfos.readings}}</span>
                </div>
                <div style="display: inline-block; margin-right: 15px;margin-top: 10px">
                  <i class="el-icon-star-off"></i>
                  <span style="margin-left: 5px;">{{item.blogPublicInfos.goods}}</span>
                </div>
                <div style="display: inline-block;margin-right: 15px;margin-top: 10px">
                  <i class="el-icon-chat-line-square" style="cursor: pointer" v-on:click="toDetail(item)"></i>
                  <span style="margin-left: 5px; cursor: pointer" v-on:click="toDetail(item)">{{item.blogPublicInfos.comments}}</span>
                </div>
              </div>
              <div class="card_body">
                {{item.summary}}
              </div>
              <el-button type="text" class="button" v-on:click="toDetail(item)">阅读全文 - ></el-button>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="spanData">
        <div v-for="(item,index) in list2" :key="index">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WaterfallChild from './WaterfallChild.vue';
import {api} from '@/api/api'

export default {
  name: "Index",
  data () {
    return{
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
  mounted(){
    window.addEventListener('scroll', this.handleScroll, false);

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
    handleScroll: function () {
      // let scrollTop = window.pageYOffset || document.getElementById("header_top1").scrollTop  || document.body.scrollTop;
      // if(scrollTop >= 180){
      //   if(scrollTop > this.scrollIndex){
      //     this.upToShow = true;
      //     document.getElementById("header_top1").style.position = "";
      //   }else {
      //     this.upToShow = false;
      //     document.getElementById("header_top1").style.position = "fixed";
      //   }
      // }
      // this.scrollIndex = scrollTop;
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
    }
  },
  destroyed() {
    window.removeEventListener("scroll",  this.handleScroll, false);
  }
}

</script>

<style scoped>

@media screen and(max-width: 10000px){

}
@media screen and(max-width: 1800px){

}
@media screen and(max-width: 1200px){

}
@media screen and(max-width: 800px){

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
  .body_top{
    position: relative;
    height:85%;
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
