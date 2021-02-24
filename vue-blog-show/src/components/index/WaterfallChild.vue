<template>
  <div class="container-water-fall">
    <div class="column">
      <div class="item" v-for="(item,index) in list1" :key="index">
        <el-card class="itemCard itemCard1" v-if="item.blogRecommend.imageUrl != null" shadow="hover">
          <div class="image_div" :style="`background-image: url(${item.blogRecommend.imageUrl})`">
            <div class="background">
            </div>
          </div>
          <div style="padding: 14px; text-align: left">
            <div class="title" v-on:click="toDetail(item)">{{item.title}}</div>
            <div style="width: 100%; height: 20px; overflow: hidden">
              <i class="el-icon-date"></i>
              <time class="time">{{getDate(item.lastModifiedTime)}}</time>
              <div style="display: inline-block; margin-right: 15px;">
                <div class="icon-my" style="margin-left: 25px; width: 18px; height: 18px; display: inline-block;"/>
                <span style="margin-left: 5px;">{{item.blogPublicInfos.readings}}</span>
              </div>
              <div style="display: inline-block; margin-right: 15px;">
                <i class="el-icon-star-off"></i>
                <span style="margin-left: 5px;">{{item.blogPublicInfos.goods}}</span>
              </div>
              <div style="display: inline-block;margin-right: 15px;">
                <i class="el-icon-chat-line-square" style="cursor: pointer" v-on:click=""></i>
                <span style="margin-left: 5px; cursor: pointer" v-on:click="">{{item.blogPublicInfos.comments}}</span>
              </div>
            </div>
            <div class="card_body">
              {{item.summary}}
            </div>
            <el-button type="text" class="button" v-on:click="toDetail(item)">阅读全文 - ></el-button>
          </div>
        </el-card>
        <el-card class="itemCard itemCard1" v-if="item.blogRecommend.imageUrl == null" shadow="hover">
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
    </div>
    <div class="column">
      <div class="item" v-for="(item,index) in list2" :key="index">
        <el-card class="itemCard itemCard2" v-if="item.blogRecommend.imageUrl != null" shadow="hover">
          <div class="image_div" :style="`background-image: url(${item.blogRecommend.imageUrl})`">
            <div class="background">
            </div>
          </div>
          <div style="padding: 14px; text-align: left">
            <div class="title" v-on:click="toDetail(item)">{{item.title}}</div>
            <div style="width: 100%; height: 20px; overflow: hidden">
              <i class="el-icon-date"></i>
              <time class="time">{{getDate(item.lastModifiedTime)}}</time>
              <div style="display: inline-block; margin-right: 15px;">
                <div class="icon-my" style="margin-left: 25px; width: 18px; height: 18px; display: inline-block;"/>
                <span style="margin-left: 5px;">{{item.blogPublicInfos.readings}}</span>
              </div>
              <div style="display: inline-block; margin-right: 15px;">
                <i class="el-icon-star-off"></i>
                <span style="margin-left: 5px;">{{item.blogPublicInfos.goods}}</span>
              </div>
              <div style="display: inline-block;margin-right: 15px;">
                <i class="el-icon-chat-line-square" style="cursor: pointer" v-on:click=""></i>
                <span style="margin-left: 5px; cursor: pointer" v-on:click="">{{item.blogPublicInfos.comments}}</span>
              </div>
            </div>
            <div class="card_body">
              {{item.summary}}
            </div>
            <el-button type="text" class="button" v-on:click="toDetail(item)">阅读全文 - ></el-button>
          </div>
        </el-card>
        <el-card class="itemCard itemCard2" v-if="item.blogRecommend.imageUrl == null" shadow="hover">
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
    </div>
  </div>
</template>

<script>
import {parameter} from "@/api/parameter";
import {api} from "@/api/api";

export default {
  props: ['plant'],
  watch:{
    plant : function (a){
      this.searchContent = a.trim();
      let para = parameter.getBlogList;
      para.search = this.searchContent;
      //this.getList(JSON.stringify(para));
    }
  },
  name: "WaterfallChild",
  data(){
    return{
      searchContent:'',
      noData: true,
      listAll:[],
      list1:[
        {
          imgShow:'',
          lastModifiedTime:'',
          summary:'',
          imgSrc:'',
          blogPublicInfos:{
            comments: 0,
            goods: 0,
            readings: 0
          },
          blogRecommend:{
            imageUrl: null
          },
        }
      ],
      list2:[
        {
          imgShow:'',
          summary:'',
          imgSrc:'',
          blogPublicInfos:{
            comments: 0,
            goods: 0,
            readings: 0
          },
          blogRecommend:{
            imageUrl: null
          },
          lastModifiedTime:''
        }
      ],
      show2: true,
      data:[
        {
          title:'title1',
          img:'../../../public/image/icon_qq.png',
          liked:'../../../public/image/icon_qq.png'
        },{
          title:'title2',
          img:'../../../public/image/icon_qq.png',
          liked:"../../../public/image/icon_qq.png"
        }
      ],
    }
  },
  created() {
    // let loadingInstance1 = Loading.service({ fullscreen: true });
    // window.onload = function (){
    //   loadingInstance1.close();
    // }
  },
  methods:{
    toDetail(item){
      this.$router.push({name:'detail',params: {id:item.id}})
    },
    getDate(date){
      let dt = new Date(date);
      let y = dt.getFullYear();
      let m = dt.getMonth() + 1;
      let d = dt.getDate();
      let h = dt.getHours();
      let time = '';
      if(h>18 || h < 6 ){
        time = '晚上';
      }else if(h > 6 && h < 12){
        time = '上午';
      }else if(h > 12 && h < 14){
        time = '中午';
      }else if(h > 14 && h < 18){
        time = '下午';
      }
      return `${y}/${m}/${d} ${time}`
    },
    scroll(scrollData){
      console.log(scrollData)
    },
    getList(){
      api.getBlogList().then(res =>{
        this.listAll = res.entity;
        this.setList();
      })
    },
    setList(){
      this.list1 = [];
      this.list2 = [];
      if(!this.listAll || this.listAll.length === 0){
        this.noData = true;
        console.log(this.list1)
      }else {
        this.noData = false;
        let i = 0;
        this.listAll.forEach(item =>{
          if(i%2 === 0){
            this.list1.push(item);
          }else if(i%2 === 1){
            this.list2.push(item)
          }
          i++;
        })
      }
    },
  },
  mounted() {
    this.getList(JSON.stringify(parameter.getBlogList));
    this.setList();
  }
}
</script>

<style scoped>

  .container-water-fall{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .column{
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    align-content: flex-start;
  }
  .item{
    display: flex;
    width: 100%;
    min-width: 360px;
  }
  .itemCard{
    background-color: rgb(245,255,255);
    width: 100%;
  }
  .itemCard1{
    margin: 20px 10px 20px 20px;
  }
  .itemCard2{
    margin: 20px 20px 20px 10px;
  }
  .icon-my{
    background-image: url("../../assets/image/icon_eye.png");
    background-size: 18px 18px;
    background-position-y: -1px;
  }
  .image_div:hover .background{
    transform: translate(140%, 0);
  }

  .background{
    position: absolute;
    width: 80%;
    height: 100%;
    z-index: 12;
    background-color: rgba(255,255,255,0.3);
    transition: all 800ms;
    transform: translate(-100%, 0);
  }
  .image{
    cursor: pointer;
    border-radius: 5px;
    transition: all 700ms;
    width: 100%;
    transform: translate(-50%);
  }
  .image_div{
    width: 100%;
    height: 230px;
    margin: 0 auto;
    position: relative;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size:cover;
    background-position: center;
  }
  .card_body{
    margin:20px 0;
    line-height: 30px;
    color: rgba(0,0,0,0.5);
  }
  .time{
    margin-left: 10px;
  }
  .title{
    cursor: pointer;
    font-family: 华文楷体;
    font-weight: bolder;
    margin:20px 0;
    text-align: left;
    font-size: 23px;
  }
  @media screen and (max-width: 725px){
    .itemCard1{
      margin: 20px;
    }
    .itemCard2{
      margin: 20px;
    }
  }
</style>
