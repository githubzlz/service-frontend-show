<template>
  <div id="wrap">
    <div class="back-index">
      <el-icon class="el-icon-caret-left"></el-icon>
      返回首页
    </div>
    <div style="font-size: 80px; font-family: 华文彩云;position:fixed;top: 30%; right: 50%; transform: translate(50%)" class="developing">
      开发中。。。
    </div>
    <div id="main">
      <div id="page1" class="page">

        <div class="el-icon-arrow-down-c">
          <el-icon class="el-icon-arrow-down"></el-icon>
        </div>
      </div>
      <div id="page2" class="page">
        <div class="el-icon-arrow-up-c">
          <el-icon class="el-icon-arrow-up"></el-icon>
        </div>
        <div class="el-icon-arrow-down-c">
          <el-icon class="el-icon-arrow-down"></el-icon>
        </div>
      </div>
      <div id="page3" class="page">
        <div class="el-icon-arrow-up-c">
          <el-icon class="el-icon-arrow-up"></el-icon>
        </div>
        <div class="el-icon-arrow-down-c">
          <el-icon class="el-icon-arrow-down"></el-icon>
        </div>
      </div>
      <div id="page4" class="page">
        <div class="el-icon-arrow-up-c">
          <el-icon class="el-icon-arrow-up"></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "AboutMe",
  data(){
    return{
      scrollIndex:0,
    }
  },
  methods:{
    start(){
      let wrap = document.getElementById("wrap");
      let main = document.getElementById("main");
      let hei = document.body.clientHeight;
      wrap.style.height = hei + "px";
      let obj = document.getElementsByClassName("page");
      for(let i=0;i<obj.length;i++){
        if(obj[i].className == 'page'){
          obj[i].style.height = hei + "px";
        }
      }
      //如果不加时间控制，滚动会过度灵敏，一次翻好几屏
      let startTime = 0, //翻屏起始时间
          endTime = 0,
          now = 0;
      //浏览器兼容
      if ((navigator.userAgent.toLowerCase().indexOf("firefox")!=-1)){
        document.addEventListener("DOMMouseScroll",scrollFun,false);
      }
      else if (document.addEventListener) {
        document.addEventListener("mousewheel",scrollFun,false);
      }
      else if (document.attachEvent) {
        document.attachEvent("onmousewheel",scrollFun);
      }
      else{
        document.onmousewheel = scrollFun;
      }

      //滚动事件处理函数
      function scrollFun(event, de){
        startTime = new Date().getTime();
        let delta;
        if(de === -1 || de === 1){
          delta = 0;
        }else {
          delta = event.detail || (-event.wheelDelta);
        }
        //mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
        //DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
        if(de === -1){
          //向下滚动
          now = now - hei;
          toPage(now);
        }
        if(de === 1){
          //向上滚动
          now = now + hei;
          toPage(now);
        }
        if ((endTime - startTime) < -1000){
          if(delta>0 && parseInt(main.offsetTop.toString()) > -(hei*3)){
            //向下滚动
            now = now - hei;
            toPage(now);
          }
          if(delta<0 && parseInt(main.offsetTop.toString()) < 0){
            //向上滚动
            now = now + hei;
            toPage(now);
          }
          endTime = new Date().getTime();
        }
        else{
        }
      }
      function toPage(now){
        $("#main").animate({top:(now+'px')},1000);     //jquery实现动画效果
        //setTimeout("main.style.top = now + 'px'",1000);     javascript 实现动画效果
      }
      $(".el-icon-arrow-down-c").click(function () {
        scrollFun(null, -1);
      })
      $(".el-icon-arrow-up-c").click(function () {
        scrollFun(null, 1);
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll6, false);
    $(document).ready(function(){
      const div = $(".el-icon-arrow-down");
      startAnimation();
      function startAnimation(){
        div.animate({marginTop:40},"normal");
        div.animate({marginTop:10},"normal");
        div.animate({marginTop:40},"normal",startAnimation);
      }
    });
    $(document).ready(function(){
      const div = $(".el-icon-arrow-up");
      startAnimation();
      function startAnimation(){
        div.animate({marginTop:10},"normal");
        div.animate({marginTop:40},"normal");
        div.animate({marginTop:10},"normal",startAnimation);
      }
    });this.$route.query
    $(document).ready(function(){
      const div = $(".back-index");
      startAnimation();
      function startAnimation(){
        div.animate({fontSize:25},500);
        div.animate({fontSize:27},500);
        div.animate({fontSize:25},1000,startAnimation);
      }
      const developing = $(".developing");
      startAnimation1();
      function startAnimation1(){
        developing.animate({fontSize:85},100);
        developing.animate({fontSize:80},500);
        developing.animate({fontSize:85},600,startAnimation1);
      }
    });
    $(".back-index").click(function () {
      window.location = ("/home");
    });
    this.start();
  },
  destroyed() {
  }
}
</script>

<style scoped>
  #wrap{
    overflow: hidden;
    width:100%;
  }
  #main{
    top:0;
    position: relative;
  }
  .page{
    position: relative;
    width:100%;
    margin:0;
  }
  .el-icon-arrow-down-c{
    cursor: pointer;
    position: absolute;
    color: black;
    font-size: 50px;
    bottom: 60px;
    height: 60px;
  }
  .el-icon-arrow-up-c{
    cursor: pointer;
    position: absolute;
    color: black;
    font-size: 50px;
    top: 20px;
    height: 60px;
  }
  .back-index{
    z-index: 999;
    cursor: pointer;
    position: absolute;
    top: 50px;
    left: 50px;
    font-size: 25px;
    font-family: test_zlz;
  }

</style>
