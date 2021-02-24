<template>
  <div>
    <div id="banner">
      <div id="bannerBack"></div>
      <div id="bannerTitle">
        <TypeWriter v-bind:wordOut="wordOut"></TypeWriter>
      </div>
    </div>
    <div id="body" style="position: relative; margin-top: 20px; padding: 10px">
      <div id="timelines1" class="timelines">
        <div v-for="(item, index) in blogs" :key="index">
          <div class="litime_left" v-if="item.direction === 0" :id="item.title">
            <div class="time_point_left"></div>
            <div class="litime_text_left">
              <div style="margin-bottom: 10px">
                {{ getDate(item.createdTime) }}
              </div>
              <span style="font-weight: bolder; font-size: 18px; cursor: pointer" v-on:click="toDetail(item.id)">
                      {{ item.title }}
                    </span>
            </div>
          </div>
          <div class="litime_right" v-if="item.direction === 1" :id="item.title">
            <div class="time_point_right"></div>
            <div class="litime_text_right">
              <div style="margin-bottom: 10px">
                {{ getDate(item.createdTime) }}
              </div>
              <span style="font-weight: bolder; font-size: 18px; cursor: pointer" v-on:click="toDetail(item.id)">
                      {{ item.title }}
                    </span>
            </div>
          </div>
        </div>
        <div style="float: left; width: 100%; margin-top: 20px">
          <el-button type="text" v-on:click="getTimeShaft()">{{operate}}</el-button>
        </div>
      </div>
      <div id="timelines2" class="timelines">
        <div v-for="(item, index) in blogs" :key="index">
          <div class="litime_right" :id="item.title" style="width: 95%; margin-right: 10px">
            <div class="time_point_right"></div>
            <div class="litime_text_right">
              <div style="margin-bottom: 10px">
                {{ getDate(item.createdTime) }}
              </div>
              <span style="font-weight: bolder; font-size: 18px; cursor: pointer" v-on:click="toDetail(item.id)">
                {{ item.title }}
              </span>
            </div>
          </div>
        </div>
        <div style="float: left; width: 100%; margin-top: 20px">
          <el-button type="text" v-on:click="getTimeShaft()">{{operate}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeWriter from "@/components/common/TypeWriter";
import {api} from '@/api/api';
export default {
  name: "TimeShaft",
  components:{TypeWriter},
  data(){
    return{
      wordOut:{
        output:'',
        input:'自2020年1月12日，386天。共132篇博客，平均每三天一篇。',
        speed:100,
        disSpeed:30,
        reAppendIndex:0,
        cursor:'|'
      },
      totalBlog: 0,
      operate:'没有更多啦！',
      upToShow: false,
      scrollIndex: 0,
      param:{
        pageInfo:{
          pageSize:10,
          pageNum:1
        }
      },
      blogs:[],
    }
  },
  methods:{
    toDetail(blogId){
      this.$router.push({name:'detail',params: {id:blogId}})
    },
    setTitle(){
      api.getDate().then(res =>{
        const startTime =  new Date('2020/08/01');
        const endTime = new Date(res.entity);
        let y = startTime.getFullYear();
        let m = startTime.getMonth() + 1;
        let d = startTime.getDate();
        let y1 = endTime.getFullYear();
        let m1 = endTime.getMonth() + 1;
        let d1 = endTime.getDate();
        const date = (y1-y)*365+(m1-m)*30+d1-d;
        const cov = Math.round(date/this.totalBlog);
        let content = '';
        if(cov >= 1){
          content = `每${cov}天一篇`
        }else {
          content = `每天${Math.round(this.totalBlog/date)}篇`
        }
        const time = this.getDate2('2020/08/01');
        this.wordOut.input = `${time}至今,平均${content}博客,总计${this.totalBlog}篇`;
      })
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
    getDate2(date){
      let dt = new Date(date);
      let y = dt.getFullYear();
      let m = dt.getMonth() + 1;
      let d = dt.getDate();
      return `${y}年${m}/${d}日`
    },
    getTimeShaft(){
      if(this.operate === '没有更多啦！'){
        return ;
      }
      this.param.pageInfo.pageNum += 1;
      api.getTimeShaft(this.param).then(res =>{
        if(res.code !== 1 || res.entity.list === undefined || res.entity.list.length === 0){
          this.param.pageInfo.pageNum -= 1;
          return;
        }
        if(res.entity.list.length !== 10){
          this.operate = '没有更多啦！'
        }
        res.entity.list.forEach(item =>{
          this.blogs.push(item);
        })
        this.setTitle();
        setTimeout(()=>{
          location.href = `#${res.entity.list[0].title}`;
        },100)
      });

    },
  },
  created() {
    api.getTimeShaft(this.param).then(res =>{
      this.blogs = res.entity.list;
      this.totalBlog = res.entity.count;
      if(this.blogs.length === this.param.pageInfo.pageSize){
        this.operate = '更多...';
      }
      this.setTitle();
    });
  },
  mounted() {
  },
  destroyed() {
  }
}
</script>

<style scoped>
#timelines1{
  display: block;
}
#timelines2{
  display: none;
}
#body{
  margin: 0 auto;
  max-width: 1100px;
  min-width: 360px;
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
#bannerBack{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.1);
  text-align: center;
}
#banner{
  height: 350px;
  background-image: url("../../assets/image/bg1.jpg");
  background-repeat: no-repeat;
  background-size:cover;
  background-position: center;
  position: relative;
}
.litime_text_right{
  padding: 20px;
  text-align: left;
  margin-left: 20px;
}
.litime_text_left{
  padding: 20px;
  text-align: right;
  margin-right: 20px
}
.litime_right:hover .time_point_right{
  box-shadow: 0 0 0 5px rgba(0,0,0,.1);
}
.time_point_right{
  box-shadow: 0 0 0 2px rgba(0,0,0,.1);
  transition: all 400ms;
  border: 1px solid rgba(0,0,0,.1);
  z-index: 100;
  top: 50%;
  left: 0;
  transform: translate(calc(-50% + 1px),-50%);
  background-color: white;
  height: 20px;
  width: 20px;
  position: absolute;
  border-radius: 20px;
}
.litime_left:hover .time_point_left{
  box-shadow: 0 0 0 5px rgba(0,0,0,.1);
}
.time_point_left{
  box-shadow: 0 0 0 2px rgba(0,0,0,.1);
  transition: all 400ms;
  border: 1px solid rgba(0,0,0,.1);
  z-index: 100;
  top: 50%;
  right: 0;
  transform: translate(calc(50% - 1px),-50%);
  background-color: #cec8ca;
  height: 20px;
  width: 20px;
  position: absolute;
  border-radius: 20px;
}
.litime_right:hover{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.litime_right{
  transition: all 400ms;
  border-radius: 10px;
  background-color: white;
  position: relative;
  border: 1px solid rgba(0,0,0,0.1);
  float: right;
  width: calc(50% + 1px);
  margin-top: 10px;
  margin-bottom: 10px;
}
.litime_left:hover{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.litime_left{
  transition: all 400ms;
  border-radius: 10px;
  background-color: white;
  border: 1px solid rgba(0,0,0,0.1);
  width: calc(50% + 1px);
  position: relative;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
@media screen and (max-width: 500px){
  #bannerTitle{
    font-size: 30px;
  }
  #timelines1{
    display: none;
  }
  #timelines2{
    display: block;
  }
}
</style>
