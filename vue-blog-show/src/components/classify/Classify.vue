<template>
  <div id="classify">
    <div id="banner">
      <div id="bannerBack"></div>
      <div id="bannerTitle">
        <TypeWriter v-bind:wordOut="wordOut"></TypeWriter>
      </div>
    </div>
    <div id="body">
      <div id="content1">
        <div class="index">
          <div class="menu">
            <el-tag size="middle" color="rgb(255,255,255)">JAVA模块</el-tag>
            <el-tag size="middle" color="rgb(255,255,255)" style="margin: 0 5px">:</el-tag>
            <el-tag v-for="(tag,index) in filterList" v-bind:key="index"
                    :type="tag.type"
                    class="filterTag"
                    size="middle"
                    @close="closeFilterTag(index)"
                    closable>
              {{tag.name}}
            </el-tag>
            <el-input
                style="width: 90px;"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else size="small" @click="showInput" plain>+ 筛选</el-button>
          </div>
        </div>
        <div class="item" v-for="(item,index) in list" v-bind:key="index">
          <div class="itemFlex1"
               :style="`background-image: url(${item.blogRecommend.imageUrl})`"
               v-if="checkStr(item.blogRecommend.imageUrl)">
            <div class="background">
            </div>
          </div>
          <div class="itemFlex2">
            <div style="padding: 10px; text-align: left; display: inline-block; width: 100%">
              <div class="title" v-on:click="">{{item.title}}</div>
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
          </div>
        </div>
      </div>
      <div id="content2">
        <el-card class="card" shadow="hover">
          <div style="padding: 14px; text-align: left">
            <div class="titleCard">
              <el-icon class="el-icon-notebook-1" style="margin-right: 10px; "></el-icon>
              热门文章
            </div>
            <div class="divider_self"></div>
          </div>
        </el-card>
        <el-card class="card"  shadow="hover">
          <div style="padding: 14px; text-align: left">
            <div class="titleCard">
              <el-icon class="el-icon-collection" style="margin-right: 10px"></el-icon>
              博文分类
            </div>
            <div class="divider_self" style="background-color: #baa667"></div>
            <div class="sort_title" v-for="(item,index) in typeList" :key="index" v-on:click="clickTypeList(item.type, item.typeName)">
              <div class="sort_title_left">{{ item.typeName }}</div>
              <div class="sort_title_right">{{ item.number }}</div>
            </div>
          </div>
        </el-card>
        <el-card class="card" shadow="hover">
          <div style="padding: 14px; text-align: left; position: relative">
            <div class="titleCard">
              <el-icon class="el-icon-price-tag" style="margin-right: 10px"></el-icon>
              标签云
              <i v-on:click="">
                <el-icon class="el-icon-refresh" style="position: absolute; right: 10px; cursor: pointer; z-index: 999">
                </el-icon>
              </i>
            </div>
            <div class="divider_self" style="background-color: coral"></div>
            <div class="cloud">
              <div v-for="(item,index) in tagList" class="tag" :key="index" v-on:click="">
                {{ item.name }}
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import TypeWriter from "@/components/common/TypeWriter";
import {api} from "@/api/api";
import $ from 'jquery'
export default {
  name: "Classify",
  components:{TypeWriter},
  data(){
    return{
      wordOut:{
        output:'',
        input:'We have been looking for, but it is her original already have。We always look in all directions, but missed you want, this is the reason why we still difficult to achieve!',
        speed:100,
        disSpeed:30,
        reAppendIndex:0,
        cursor:'|'
      },
      list:[
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
      vertical: true,
      typeList:[],
      tagList:[],
      filterList:[],
      inputValue:'',
      inputVisible: false
    }
  },
  methods:{
    getList(){
      api.getBlogList().then(res =>{
        this.list = res.entity;
      });
      api.getBlogTypeList().then(res =>{
        this.typeList = res.entity;
      });
      api.getBlogTags().then(res =>{
        this.tagList = res.entity;
      });
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
    handleResize(){
      this.handlerList();
    },
    handlerList(){
      let w = $('#content1').width();
      // 宽度大于500使用横向布局
      if(w > 500){
        this.vertical = false;
      }else {
        this.vertical = true;
      }
      $('#itemVertical')
    },
    checkStr(str){
      return !(null == str || str.length === 0);
    },
    setFilterList(){
      let i=0;
      this.filterList.forEach(data => {
        this.setTagType(data, i)
        i += 1;
      });
    },
    setTagType(data, i){
      if(i%4 === 0){
        data.type = 'success'
      }
      if(i%4 === 1){
        data.type = 'warning'
      }
      if(i%4 === 2){
        data.type = 'info'
      }
      if(i%4 === 3){
        data.type = 'error'
      }
    },
    closeFilterTag(index){
      this.filterList.splice(index, 1);
    },
    handleInputConfirm(){
      let inputValue = this.inputValue;

      if (inputValue && this.filterListUniqueCheck(inputValue) && this.filterList.length < 5) {
        let insert = {
          name: inputValue,
          type: ''
        };
        this.setTagType(insert, this.filterList.length)
        this.filterList.push(insert);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    showInput(){
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    filterListUniqueCheck(str){
      this.filterList.forEach(data =>{
        if(data.name === str){
          console.log(str,data.name)
          return false;
        }
      })
      return true;
    }
  },
  mounted() {
    this.setFilterList();
    this.getList();
    this.handleResize();
    window.addEventListener('resize', () => {
      this.handleResize();
    })
  }
}
</script>

<style scoped>
.filterTag{
  margin: 0 5px
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
.titleCard{
  font-family: 华文彩云;
  font-size: 20px;
  padding: 5px 5px 5px 0;
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
.card_body{
  margin:15px 0;
  line-height: 30px;
  color: rgba(0,0,0,0.5);
  width: 95%;
}
.icon-my{
  background-image: url("../../assets/image/icon_eye.png");
  background-size: 18px 18px;
  background-position-y: -1px;
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
.background{
  position: absolute;
  width: 80%;
  height: 100%;
  z-index: 12;
  background-color: rgba(255,255,255,0.3);
  transition: all 800ms;
  transform: translate(-100%, 0);
}
#classify{
}
#banner{
  height: 350px;
  background-image: url("../../assets/image/bg2.jpg");
  background-repeat: no-repeat;
  background-size:cover;
  background-position: center;
  position: relative;
}
#bannerBack{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.1);
  text-align: center;
}
#bannerTitle{
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
  font-family: test_zlz,serif;
  color: white;
  font-size: 35px;
  width: 80%;
}
#body{
  margin: 0 auto;
  max-width: 1300px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
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
.index{
  text-align: left;
  min-width: 260px;
  width: 100%;
  margin: 20px 10px 10px 10px;
  padding: 5px;
  border-radius: 5px;
}
.item{
  min-width: 260px;
  width: 100%;
  margin: 0 10px 20px 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  background-color: white;
  transition: all 300ms;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.item:hover{
  box-shadow: 0 0 12px 2px rgba(0,0,0,.2);
}
.itemFlex1{
  min-width: 230px;
  height: 230px;
  flex: 1;
  overflow: hidden;
  margin: 5px;
  position: relative;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size:cover;
  background-position: center;
}
.itemFlex2{
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
  min-width: 300px;
  min-height: 230px;
  flex: 2;
}
@media screen and (max-width: 500px){
  .item{
    min-width: 300px;
  }
  #bannerTitle{
    font-size: 30px;
  }
}
</style>
