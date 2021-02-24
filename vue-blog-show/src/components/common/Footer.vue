<template>
  <div class="footer">
    <div style=" position: absolute; top: 65px; width: 100%">
      <ul>
        <li>
          <div class="title">
            关于我
          </div>
          <div style="width: 180px; margin-top: 20px; text-align: left; color: rgb(69,67,67); line-height: 30px">
            我的梦想是要
            <br>
            成为最咸的咸鱼
            <br>
            最厉害的菜鸟
            <br>
          </div>
        </li>
        <li>
          <div class="title">
            版权说明
          </div>
          <div style="width: 180px; margin-top: 20px; text-align: left; color: rgb(69,67,67); text-indent: 20px">
            1. 本网站所有资源及博客文章均可自由转载、使用,转载请注明出处;
          </div>
          <div style="width: 180px; margin-top: 20px; text-align: left; color: rgb(69,67,67); text-indent: 20px">
            2. 本网站所有转载自网络的资源及文章会注明作者及出处,若有侵权请联系删除;
          </div>
        </li>
        <li>
          <div class="title">
            更多链接
          </div>
          <div style="width: 180px; margin-top: 20px; text-align: left;color: rgb(69,67,67)" >
            <div>
              Baidu  <a href="http://www.baidu.com" style=" margin-top: 10px; color: rgb(70,101,90)" target="_blank">http://www.baidu.com</a>
            </div>
            <br>
            <div>
              Google  <a href="http://www.google.com" style=" margin-top: 10px; color: rgb(70,101,90)" target="_blank">http://www.google.com</a>
            </div>
          </div>
        </li>
        <li>
          <div class="title">
            分享本网站
          </div>
          <div style="width: 180px; margin-top: 20px;text-align: left; color: rgb(70,101,90); text-decoration: underline">
            <div style="margin-left: 20px; font-size: 16px;cursor: pointer" v-on:click="">复制分享链接</div>
            <div style="margin-left: 20px; font-size: 16px; margin-top: 10px; cursor: pointer" v-on:click="toQQShare">分享到QQ空间</div>
          </div>
        </li>
      </ul>
    </div>
    <div style="position: absolute; bottom: 60px; right: 150px">
      <img src="../../../public/template.png" style="width: 200px; height: 200px;">
    </div>
    <div style="position: absolute; bottom: 40px; width: 100%; color: #c49999; text-align: center; height: 20px; line-height: 20px">
      <img src="../../assets/image/beian.png" style="display: inline-block; vertical-align: center; position: absolute; top: -1px"/>
        <span style="margin-left: 25px; margin-right: 0; font-size: 16px">
          鲁公网安备 37162302000153号
        </span>
        <span style="margin-right: 15px; font-size: 16px">
          | 鲁ICP备20032901号
      </span>
    </div>
    <div style="position: absolute; bottom: 5px; width: 100%; color: #c49999; text-align: center; height: 20px; line-height: 20px">
      <span style="font-size: 17px">
        Copyright ©2020 by zlz.All rights reserved | Developed by
        <span style="color: #f6f8f5; font-size: 17px">
          <el-icon class="el-icon-star-off"></el-icon>
        Zlz
        </span>
        | version 1.0.0
      </span>

    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data(){
    return{
      qqShare:'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=www.zlztsb.com&title=Zlz个人博客&desc=ZLZ博客分享生活趣事,学习笔记,技术干货。&summary=ZLZ博客分享生活趣事,学习笔记,技术干货&site=SOURCE&pics=IMAGE',
    }
  },
  methods:{
    toQQShare(){
      window.open(
          this.qqShare, '_blank'
      )
    },
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
  }
}
</script>

<style scoped>
  .icon{
    text-align: center;
    cursor: pointer;
    width: 25px;
    height: 25px;
    border-radius: 30px;
    margin: 10px;
  }
  .title{
    margin-left: 15px;
    text-align: left;
    color: white;
    font-size: 25px;
    font-family: test_zlz;
  }
  ul{
    height: 90px;
    margin: 0 20%;
    display: flex;
    justify-content: space-between;
  }
  li{
    display: inline-block;
    height: 60%;
    margin: 0 auto;
  }
  .footer{
    position: relative;
    width: 100%;
    height: 380px;
    background-color: #030a1c;
    margin-top: 100px;
  }
</style>
