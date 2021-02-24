<template>
  <div class="website">
    <div id="banner">
      <div id="bannerBack"></div>
      <div id="bannerTitle">
        <TypeWriter v-bind:wordOut="wordOut"></TypeWriter>
      </div>
    </div>
    <div class="body" style="position: relative;">
      <el-card style="margin: 20px; text-align: left">
        <comment v-bind:comments-data="comments" v-bind:blogId="'0'" v-bind:type="1"></comment>
      </el-card>
    </div>
  </div>
</template>

<script>
import TypeWriter from "@/components/common/TypeWriter";
import Comment from "@/components/common/Comment";
import {api} from '@/api/api'

export default {
  name: "Website",
  components: {Comment, TypeWriter},
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
      scrollIndex: 0,
      comments:[],
      count:{
        user:0,
        num:0
      }
    }
  },
  methods:{
    getComments(){
      api.getWebComments().then(res=>{
        this.comments = res.entity;
      })
    },
    getCount(){
      api.getCommentCount().then(res =>{
        if(res.code === 1){
          this.count.user = res.entity.commentUserCount;
          this.count.num = res.entity.commentCount;
        }
      })
    },
  },
  created() {
    this.getComments()
    this.getCount()
  },
  mounted() {
  },
  destroyed() {
  }
}
</script>

<style scoped>
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
  background-image: url("../../assets/image/bg2.jpg");
  background-repeat: no-repeat;
  background-size:cover;
  background-position: center;
  position: relative;
}
  .sub_title{
    line-height: 200px;
    height: 400px;
    color: white;
    font-size: 30px;
    font-family: test_zlz;
  }
  .title{
    margin-top: 50px;
    line-height: 250px;
    height: 200px;
    font-size: 80px;
    letter-spacing: 50px;
    color: white;
    font-family: test_zlz;
  }
  .body_top{
    height: 600px;
    overflow: hidden;
    background-image: linear-gradient(to right, #7ab8c2 0%, #bab8ae 100%);
    background-size: 100%;
  }
  .body{
    max-width: 1300px;
  }
  .header{
    z-index: 999;
    width: 100%;
    height:90px;
  }
</style>
