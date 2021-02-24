<template>
  <div class="classify" style="scroll-behavior: smooth">
    <div class="header" id="header_top" style="position: fixed">
      <v-header></v-header>
    </div>
    <div id="maodian" style="position: absolute; top: 620px;"></div>
    <div class="body" style="position:relative ; top: 90px;max-width: 1960px; margin: 0 auto">
      <div class="body_top" :style="`height: ${height}px`">
        <div class="title">{{ words[this.$route.query.type].title }}</div>
        <div class="sub_title" v-if="this.$route.query.type == 1">
          {{ words[this.$route.query.type].subTitle }}
          <div style="width: 100%; margin: 0; position: absolute; top: 50px">
            {{ words[this.$route.query.type].subTitleC }}
          </div>
        </div>
        <div class="sub_title" v-if="this.$route.query.type == 0">
          {{ words[this.$route.query.type].subTitle }}
          <div style="width: 100%; margin: 0; position: absolute; top: 130px">
            <span style="margin: 0 20px">·传感技术·</span>
            <span style="margin: 0 20px">·通信技术·</span>
            <span style="margin: 0 20px">·计算机技术·</span>
          </div>
        </div>
      </div>
      <el-row style="margin-top: 30px; margin-bottom: 20px">
        <el-col :span="3" > <br> </el-col>
        <el-col :span="5">
          <div id="keep-top">
            <el-card style="margin: 20px">
              <div style="padding: 14px; text-align: left">
                <div class="class_title">
                  <span>全局检索:</span>
                  <span style="float: right">{{ words[this.$route.query.type].words }}</span>
                </div>
                <div style="margin-top: 20px;">
                  <el-autocomplete
                      style="width: 100%;"
                      class="inline-input"
                      v-model="param.search"
                      :fetch-suggestions="getTypeList"
                      :placeholder="words[this.$route.query.type].search"
                      @select="getInputValue"
                      @keyup.enter.native="getInputValue"
                  >
                    <el-button slot="append" icon="el-icon-search" v-on:click="getInputValue"></el-button>
                  </el-autocomplete>
                </div>
              </div>
            </el-card>
            <el-card style="margin: 20px">
              <div style="padding: 14px; text-align: left">
                <div class="class_title">
                  <span>分类检索:</span>
                  <div class="divider_self" style="background-color: #000000;"></div>
                </div>
                <div style="font-size: 20px">
                  <el-tree
                      :data="options"
                      :props="defaultProps"
                      @node-click="handleNodeClick">
                  </el-tree>
                </div>
              </div>
            </el-card>
            <el-card style="margin: 20px">
              <div style="padding: 14px; text-align: left">
                <div class="class_title">
                  <span>推荐阅读:</span>
                  <div class="divider_self" style="background-color: #b12424;"></div>
                </div>
                <div class="recommend" v-for="(item,index) in comment" :key="index" v-on:click="toDetail(item.id)">
                  <div class="recommend_title">
                    {{item.title}}
                  </div>
                </div>
              </div>
            </el-card>
            <el-card style="margin: 20px">
              <div style="padding: 14px; text-align: left">
                <div class="class_title">
                  <el-icon class="el-icon-collection" style="margin-right: 10px"></el-icon>
                  归档
                  <div class="divider_self" style="background-color: #baa667"></div>
                </div>
                <div class="sort_title" v-for="(item,index) in timeFiling" :key="index" v-on:click="timeFilingClick(item.date)">
                  <div class="sort_title_left">
                    {{getYearMonthDate(item.date)}}
                  </div>
                  <div class="sort_title_right">{{item.num}}</div>
                </div>
              </div>
            </el-card>
          </div>
          <br>
        </el-col>
        <el-col :span="12">
          <el-card style="margin-top: 20px">
            <div class="class_header">
              <el-icon class="el-icon-house"></el-icon>
              {{classTitle}}
            </div>
            <div v-if="!resultEntity.list || resultEntity.list.length === 0">
              <img style="width: 50%;" src="../../assets/image/empty.png"/>
            </div>
            <div v-for="(item,index) in resultEntity.list" :key="index">
              <transition name="el-fade-in-linear">
              <div class="card_one" style="background-color: rgb(255,255,255); margin: 20px;"
                   v-if="item.blogRecommend.imageUrl !== null" >
                <div class="card_one_left">
                  <img class="card_one_img" style="width: 100%; height: 100%;" :src="item.blogRecommend.imageUrl">
                  <div style="position: absolute; left: 5px; bottom: 5px; color: white; background-color: rgba(0,0,0,0.5); padding: 3px;border-radius: 5px">
                    <i class="el-icon-date"></i>
                    <time class="time">{{getDate(item.createdTime)}}</time>
                  </div>
                </div>
                <div class="card_one_right">
                  <el-tooltip :content="item.title" placement="bottom" effect="light">
                    <div class="list_title" v-on:click="toDetail(item.id)">
                      {{item.title}}
                    </div>
                  </el-tooltip>
                  <div class="card_one_right_info" style="-webkit-line-clamp: 4;">
                    {{item.summary}}
                  </div>
                  <div class="card_one_right_date">
                    <i class="el-icon-chat-line-square" style="margin-left: 20px"></i>
                    <span style="margin-left: 5px">{{item.blogPublicInfos.comments}}</span>
                    <i class="el-icon-reading" style="margin-left: 10px; color: #66adab"></i>
                    <span style="margin-left: 5px">{{item.blogPublicInfos.readings}}</span>
                  </div>
                  <el-button type="text" class="button" style="padding:0;position: absolute; bottom: 4px; right: 0" v-on:click="toDetail(item.id)">阅读全文 - ></el-button>
                </div>
              </div>
              </transition>
              <transition name="el-fade-in-linear">
                <div class="card_two" style="background-color: rgb(255,255,255); margin: 20px;" v-if="item.blogRecommend.imageUrl === null">
                <el-tooltip :content="item.title" placement="bottom" effect="light">
                  <div class="list_title" v-on:click="toDetail(item.id)">
                      {{item.title}}
                  </div>
                </el-tooltip>
                <div class="card_one_right_info">
                  {{item.summary}}
                </div>
                <div class="card_one_right_date" style="bottom: 20px">
                  <i class="el-icon-date"></i>
                  <time class="time">{{getDate(item.createdTime)}}</time>
                  <i class="el-icon-chat-line-square" style="margin-left: 20px"></i>
                  <span style="margin-left: 5px">{{item.blogPublicInfos.comments}}</span>
                  <i class="el-icon-reading" style="margin-left: 10px; color: #66adab"></i>
                  <span style="margin-left: 5px">{{item.blogPublicInfos.readings}}</span>
                </div>
                <el-button type="text" class="button" style="padding:0;position: absolute; bottom: 24px; right: 20px" v-on:click="toDetail(item.id)">阅读全文 - ></el-button>
              </div>
              </transition>
              <div style="width: 100%; height: 2px; background-color: #efeee7"></div>
            </div>


            <el-pagination
                :hide-on-single-page="false"
                background
                layout="prev, pager, next"
                :total="totalSize"
                :current-page="this.param.pageInfo.pageNum"
                @current-change="changePage"
                v-if="resultEntity.list.length"
                >
            </el-pagination>
          </el-card>
        </el-col>
        <el-col :span="3">
          <br>
        </el-col>
      </el-row>
    </div>
    <el-backtop :bottom="100">
      <div>
        <el-icon class="el-icon-arrow-up"></el-icon>
      </div>
    </el-backtop>
    <div class="footer" style="margin-top: 150px">
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>

import {api} from "@/api/api";
import $ from "jquery";

export default {
  name: "Classify",
  watch:{
    '$route.query.type':function(){
      location.reload();
    },
  },
  data(){
    return{
      height:600,
      words:[{
        search:'试试搜索 JAVA',
        words:'技术',
        title:'技术博文',
        subTitle:'IT - Information Technology 是指与信息相关的技术,ta主要由三部分组成',
        subTitleC:''
      },{
        search:'试试搜索 博主',
        words:'情感',
        title:'情感博文',
        subTitle:'We have been looking for, but it is her original already have; We always look in all directions, but missed you want, this is the reason why we still difficult to achieve',
        subTitleC:'我们一直寻找的，却是自己原本早已拥有的；我们总是东张西望，唯独漏了自己想要的，这就是我们至今难以如愿以偿的原因。'
      }],
      totalSize: 0,
      param: {
        pageInfo:{
          pageSize:10,
          pageNum:1
        },
        startTime:'',
        endTime:'',
        search:''
      },
      typeList:[],
      timeFiling:[],
      comment:[],
      scrollIndex: 0,
      total:100,
      searchInput:'',
      classTitle:'全部文章',
      options: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      resultEntity:{
        list:[]
      }
    }
  },
  methods:{
    timeFilingClick(date){
      if(!date || date === '更早'){
        this.$router.push({name:'time'});
        return;
      }
      this.classTitle = this.getYearMonthDate(date);
      date = new Date(date);
      let y = date.getFullYear();
      let M = date.getMonth() + 1;
      let e =  Math.round(M) +1;
      if(M.toString().length === 1){
        M = "0" + M.toString();
      }
      if(e.toString().length === 1){
        e = "0" + e.toString();
      }
      let startTime = `${y}-${M}-01 00:00:00`
      let endTime = `${y}-${e}-01 00:00:00`
      const param = this.param;
      param.startTime = startTime;
      param.endTime = endTime;
      param.search = '';
      this.searchBlog(param);
      document.getElementById("maodian").scrollIntoView();
      setTimeout(()=>{
        document.getElementById("header_top").style.position = "fixed";
      },100)
    },
    getTypeList(queryString, cb){
      let typeList = this.typeList;
      let results = queryString ? typeList.filter(this.createFilter(queryString)) : typeList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString){
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    changePage(val){
      this.param.pageInfo.pageNum = val;
      this.searchBlog(this.param);
      document.getElementById("maodian").scrollIntoView();
    },
    getYearMonthDate(date){
      if(date === '更早'){
        return date;
      }else {
        let dt = new Date(date);
        let y = dt.getFullYear();
        let m = dt.getMonth() + 1;
        return `${y}年 ${m}月`
      }
    },
    toDetail(id){
      this.$router.push({name:'detail',params: {id:id}})
    },
    getDate(date){
      let dt = new Date(date);
      let y = dt.getFullYear();
      let M = dt.getMonth() + 1;
      let d = dt.getDate();
      let h = dt.getHours().toString();
      let m = dt.getMinutes().toString();
      if(m.length === 1){
        m = '0'+m;
      }
      if(h.length === 1){
        h = '0'+h;
      }
      return  `${y}/${M}/${d} ${h}:${m}`;
    },
    getInputValue(){
      this.classTitle = this.param.search;
      if('' === this.classTitle || !this.classTitle){
        this.classTitle = "全部文章";
      }
      this.searchBlog(this.param);
    },
    handleNodeClick(data) {
      // this.$router.push({name:'classify',query: {type:this.$route.query.type, typeName:data.label}})
      this.param.startTime='';
      this.getBlogList(data);
    },
    getBlogList(data){
      this.classTitle = data.label;
      if('' === this.classTitle || !this.classTitle){
        this.classTitle = "全部文章";
      }
      const param = this.param  ;
      param.search = data.label;
      this.searchBlog(param);
      document.getElementById("maodian").scrollIntoView();
      setTimeout(()=>{
        document.getElementById("header_top").style.position = "fixed";
      },100)
    },
    handleScroll2: function () {
      let scrollTop = window.pageYOffset || document.getElementById("header_top").scrollTop  || document.body.scrollTop;
      if(scrollTop >= 180){
        if(scrollTop > this.scrollIndex){
          document.getElementById("header_top").style.position = "";
        }else {
          document.getElementById("header_top").style.position = "fixed";
        }
        this.scrollIndex = scrollTop;
      }
    },
    searchBlog(param){
      if(param.search === '全部文章'){
        param.search = '';
      }
      api.searchBlog(param, this.$route.query.type).then(res =>{
        this.resultEntity =res.entity;
        this.totalSize = Math.round(res.entity.totalSize);
      })
    }
  },
  created() {
    api.getBlogTypes(this.$route.query.type).then(res =>{
      if(res.code === 1 && res.entity){
        let options = [];
        let typeList = [];

        const all = {
          value:'',
          label:'全部文章',
        };
        options.push(all);

        res.entity.forEach(item =>{
          const entity = {
            value:item.name,
            label:item.name,
            children:[]
          };

          if(item.children){
            item.children.forEach(child =>{
              const entityC = {
                value:child.name,
                label:child.name,
              };
              typeList.push(entityC)
              entity.children.push(entityC);
            })
          }
          typeList.push(entity);
          options.push(entity)
        })
        this.options = options;
        this.typeList = typeList;
      }
    })
    api.timeFiling(5, this.$route.query.type).then((res)=>{
      this.timeFiling = res.entity;
    });
    api.getBlogListSide(10).then(res =>{
      this.comment = res.entity;
    });
    this.searchBlog(this.param);
  },
  mounted() {
    const typeName = this.$route.query.typeName;
    if(typeName && typeName !== ''){
      const data = {
        label:typeName
      }
      this.getBlogList(data)
      setTimeout(()=>{
        document.getElementById("maodian").scrollIntoView();
        setTimeout(()=>{
          document.getElementById("header_top").style.position = "fixed";
        },100)
      }, 100)
    }
    $(document).ready(function(){
      const div = $(".el-icon-arrow-down");
      startAnimation();
      function startAnimation(){
        div.animate({marginTop:40},"normal");
        div.animate({marginTop:10},"normal");
        div.animate({marginTop:40},"normal",startAnimation);
      }
    });
    //document.getElementById("header_top").style.display = "none";
    window.addEventListener('scroll', this.handleScroll2, false);
  },
  destroyed() {
    window.removeEventListener("scroll",  this.handleScroll2, false);
  }
}
</script>

<style scoped>
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
  .recommend:hover{
    color: #41afd7;
  }
  .recommend{
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0);
    transition: all 600ms;
    margin: 5px 0;
    border-radius: 5px;
    line-height: 30px;
    padding: 0 5px;
  }
  .recommend_title{
    display: inline-block;
    height: 30px;
  }
  .recommend_type{
    display: inline-block;
    width: 20%;
    height: 30px;
  }

  .el-card:hover .divider_self{
    width: 100%;
  }
  .card_one_img{
    transition: all 800ms;
    width: 100%;
    height: 100%;
  }
  .card_two:hover{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .card_two{
    position: relative;
    transition: all 300ms;
    border-radius: 5px;
    text-align: left;
    height: 150px;
    padding: 20px;
  }

  .class_header{
    text-align: left;
    margin-left: 20px;
    margin-top: 20px;
    font-size: 20px;
    font-family: 华文楷体;
    font-weight: bolder;
  }
  .card_one_right_info:hover{
    text-shadow:-8px 3px 4px rgba(0,0,0,0.1);
  }
  .card_one_right_info{
    transition: all 500ms;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-indent:2em;
    line-height: 25px;
    vertical-align: middle;
    overflow: hidden;
  }
  .card_one_right_date{
    width: 100%;
    height: 20px;
    position: absolute;
    bottom: 0;
  }
  .card_one:hover{
   box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .card_one{
    transition: all 300ms;
    border-radius: 5px;
    text-align: left;
    height: 180px;
    padding: 20px;
  }
  .card_one_left:hover .card_one_img{
    transform: scale(1.1);
  }
  .card_one_left{
    position:relative;
    border-radius: 10px;
    height: 100%;
    overflow: hidden;
    display: inline-block;
    width: 35%;
  }
  .card_one_right{
    height: 100%;
    position: relative;
    margin-left: 25px;
    text-align: left;
    vertical-align: top;
    display: inline-block;
    width: 60%;
  }

  .list_title{
    transition: all 500ms;
    cursor: pointer;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-indent:30px;
    height: 30px;
    width: 100%;
    font-size: 21px;
    font-weight: bolder;
    margin-bottom: 10px;
  }
  /deep/ .el-tree-node{
    padding: 5px;
  }
  /deep/ .el-tree-node__label{
    width: auto;
    font-family: 华文楷体;
    font-weight: bolder;
    font-size: 15px;
    color: #999999;
    letter-spacing: 1px;
  }
  .divider_self{
    background-color: #58ad66;
    width: 35%;
    height: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    transition: width 800ms;
  }
  .class_title{
    font-family: 华文彩云;
    font-size: 20px;
    padding: 5px 5px 5px 0;
    z-index: 99;
  }
  .sub_title{
    position: relative;
    margin: 0 auto;
    line-height: 100px;
    height: 300px;
    width: 60%;
    color: white;
    font-size: 30px;
    font-family: test_zlz;
  }
  .title{
    margin-top: 50px;
    line-height: 200px;
    height: 200px;
    font-size: 80px;
    letter-spacing: 50px;
    color: white;
    font-family: test_zlz;
  }
  .body_top{
    position: relative;
    height: 500px;
    overflow: hidden;
    background-image: linear-gradient(to right, #7ab8c2 0%, #b6b5af 100%);
    background-size: 100%;
  }
  .header{
    z-index: 999;
    width: 100%;
    height:90px;
  }
</style>
