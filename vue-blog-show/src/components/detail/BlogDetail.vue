<template>
 <div class="blogDetail">
   <div class="header" id="header_top4" style="position: fixed">
     <v-header></v-header>
   </div>
    <div class="body" style="position:relative; top: 90px">
      <el-row>
        <el-col :span="3"> <br> </el-col>
        <el-col :span="5">
          <el-card style="margin: 20px">
            <div style="padding: 14px; text-align: left">
              <div class="class_title">
                <el-icon class="el-icon-menu" style="margin-right: 10px"></el-icon>
                <span>目录</span>
                <div class="divider_self" style="background-color: #deea6c;"></div>
                <div class="markdown-body editormd-preview-container" id="custom-toc-container" style="text-align: left">
                </div>
              </div>
            </div>
          </el-card>
          <el-card style="margin: 20px">
            <div style="padding: 14px; text-align: left">
              <div class="class_title">
                <el-icon class="el-icon-collection" style="margin-right: 10px"></el-icon>
                <span>推荐</span>
                <div class="divider_self" style="background-color: #b12424;"></div>
              </div>
              <div class="recommend" v-for="(item,index) in comment" :key="index" v-on:click="changeBlogId(item.id)">
                {{item.title}}
              </div>
            </div>
          </el-card>
          <el-card style="margin: 20px">
            <div style="padding: 14px; text-align: left">
              <div class="class_title">
                <el-icon class="el-icon-date" style="margin-right: 10px"></el-icon>
                归档
                <div class="divider_self" style="background-color: #baa667"></div>
              </div>
              <div class="sort_title" v-for="(item,index) in timeFiling" :key="index">
                <div class="sort_title_left">
                  {{getYearMonthDate(item.date)}}
                </div>
                <div class="sort_title_right">{{item.num}}</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="13">
          <el-card class="detail-blog" style="margin-top: 20px">
            <div class="detail-blog-title">
              <el-tag v-if="blog.provenance === 0" type="success">原创</el-tag>
              <el-tag v-if="blog.provenance === 1" type="warning">转载</el-tag>
              <el-tag v-if="blog.provenance === 2" type="danger">翻译</el-tag>
              <div style="float: right; cursor: pointer">
                <el-button-group>
                  <el-button plain v-on:click="copyLink()" size="mini">分享链接</el-button>
                  <el-button plain v-on:click="copyLink('md')" size="mini">MD链接</el-button>
                </el-button-group>
              </div>
              <div class="title">&nbsp;&nbsp;&nbsp;
                {{blog.title}}
              </div>
              <div class="line-title"></div>
              <div class="detail-blog-info">
                <el-icon class="el-icon-user" style="margin-right: 5px; margin-left: 10px;"></el-icon>{{blog.author}}
                <el-icon class="el-icon-reading" style="margin-right: 5px; margin-left: 10px;"></el-icon>{{blog.blogPublicInfos.readings}}
                <el-icon class="el-icon-star-off" style="margin-right: 5px; margin-left: 10px;"></el-icon>{{blog.blogPublicInfos.goods}}
                <el-icon class="el-icon-time" style="margin-right: 5px; margin-left: 10px;"></el-icon>{{getDate(blog.createdTime)}}
              </div>
            </div>
            <div id="detail-blog-body">
              <div id="test-editormd-view">
                <textarea style="display:none;" name="test-editormd-markdown-doc"></textarea>
              </div>
            </div>
            <div class="detail-blog-footer">
              <div style="display: inline-block" v-on:click="clickGoodM">
                <transition name="el-fade-in-linear">
                  <el-icon class="el-icon-star-off"
                           style="margin-right: 5px; margin-left: 10px; cursor: pointer"
                           v-if="!clickGood"/>
                </transition>
                <transition name="el-fade-in-linear">
                  <el-icon class="el-icon-star-on"
                           style="margin-right: 5px; margin-left: 10px; cursor: pointer;color: rgba(199,193,23,0.88); font-size: 20px"
                           v-if="clickGood"/>
                </transition>
              </div>
              <a style="cursor: pointer" v-on:click="clickGoodM"><span style="margin-right: 10px">{{ contentText }}</span></a>
              <a><span style="cursor: pointer" v-on:click="copyLink()">
                <el-icon class="el-icon-share"></el-icon>
                分享
              </span></a>
              <a><span style="cursor: pointer; margin-left: 5px">
                <el-icon class="el-icon-warning-outline"></el-icon>
                举报
              </span></a>
            </div>
          </el-card>
          <el-card style="margin-top: 10px">
            <Comment v-bind:comments-data="comments" v-bind:blogId="blogId" v-bind:type="1"></Comment>
          </el-card>
        </el-col>
        <el-col :span="3"><br></el-col>
      </el-row>
    </div>
   <el-backtop :bottom="100">
     <div>
       <el-icon class="el-icon-arrow-up"></el-icon>
     </div>
   </el-backtop>
   <div class="footer">
     <v-footer></v-footer>
   </div>
 </div>
</template>
<script>
import Comment from "@/components/common/Comment";
import {api} from '@/api/api';
import {base} from '@/api/base';

export default {
  name: "BlogDetail",
  components: {Comment},
  data(){
    return{
      comments:[],
      timeFiling:[{
        date:'',
        num:0
      }],
      contentText:'点赞',
      comment:[{
        title:'',
        type:''
      }],
      clickGood: false,
      blog:{
        provenance:0,
        blogContent: {
          contentMd:'',
          contentHtml:''
        },
        blogPublicInfos:{
          readings:0,
          goods:0
        }
      },
      blogId:'',
      content:'',
      testI:'22222',
      textarea:'',
      searchInput:'',
      scrollIndex: 0,
    }
  },
  methods:{
    copyLink(type){
      const title = this.blog.title;
      let copy = function (e) {
        e.preventDefault();
        let t = `${base.domain}/detail?id=${localStorage.getItem("blogId")}`;
        let text = '['+title+'，点击访问]('+ t +' "'+title+'")';
        let copied = '';
        if('md' === type){
          copied = text;
        }else {
          copied = t;
        }
        if (e.clipboardData) {
          e.clipboardData.setData('text/plain', copied);
        } else if (window.clipboardData) {
          window.clipboardData.setData('Text', copied);
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
    changeBlogId(blogId){
      this.$router.push({name:'empty',params: {id:blogId,url:'detail'}})
    },
    setBlog(){
      let contentMd = '';
      api.getBlogDetail(this.blogId).then(res =>{
        if(res.code === 1){
          this.blog = res.entity;
          contentMd = res.entity.blogContent.contentMd
        }
        window.editormd.markdownToHTML("test-editormd-view", {
          markdown        : contentMd,//+ "\r\n" + $("#append-test").text(),
          //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
          htmlDecode      : "style,script,iframe",  // you can filter tags decode
          toc             : true,
          tocm            : true,    // Using [TOCM]
          tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
          //gfm             : false,
          //tocDropdown     : true,
          markdownSourceCode : false, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
          emoji           : true,
          taskList        : true,
          tex             : true,  // 默认不解析
          flowChart       : true,  // 默认不解析
          sequenceDiagram : true,  // 默认不解析
        });
      });

    },
    getYearMonthDate(date){
      if(date === null){
        return '';
      }
      if(date === '更早'){
        return date;
      }else {
        let dt = new Date(date);
        let y = dt.getFullYear();
        let m = dt.getMonth() + 1;
        return `${y}年 ${m}月`
      }
    },
    clickGoodM(){
      this.clickGood = !this.clickGood;
      if(this.clickGood){
        api.recommendBlog(this.blogId, 0).then(res=>{
          if(res.code === 1){
            this.contentText = '取消点赞';
            this.blog.blogPublicInfos.goods = Math.floor(this.blog.blogPublicInfos.goods) + 1;
          }
        })
      }else {
        api.recommendBlog(this.blogId, 1).then(res=>{
          if(res.code === 1){
            this.contentText = '点赞';
            this.blog.blogPublicInfos.goods -= 1;
          }
        })
      }
    },
    getDate(date){
      if(date === undefined){
        return 0;
      }
      let dt = new Date(date);
      let y = dt.getFullYear();
      let m = dt.getMonth() + 1;
      let d = dt.getDate();
      let h = dt.getHours();
      let mi = dt.getMinutes().toString();
      if(mi.toString().length === 1){
        mi = '0'+mi;
      }
      return `${y}/${m}/${d} ${h}:${mi}`
    },
    handleScroll4: function () {
      let scrollTop = window.pageYOffset || document.getElementById("header_top4").scrollTop  || document.body.scrollTop;
      if(scrollTop >= 150){
        if(scrollTop > this.scrollIndex){
          document.getElementById("header_top4").style.position = "";
        }else {
          document.getElementById("header_top4").style.top = "0";
          document.getElementById("header_top4").style.position = "fixed";
        }
        this.scrollIndex = scrollTop;
      }
    },
  },
  created() {
    if(this.$route.params.id){
      localStorage.setItem("blogId", this.$route.params.id);
      this.blogId = this.$route.params.id;
    }else if(this.$route.query.id){
      localStorage.setItem("blogId", this.$route.query.id);
      this.blogId = this.$route.query.id;
    }else {
      this.blogId = localStorage.getItem("blogId");
    }

    api.getBlogComments(this.blogId).then(res=>{
      if(res.entity){
        this.comments = res.entity;
      }
    })
    api.timeFiling(5).then((res)=>{
      this.timeFiling = res.entity;
    })

    api.addViewNumber(this.blogId).then(()=>{});

    api.getBlogListSide(10).then(res =>{
      this.comment = res.entity;
    })

    this.setBlog();


  },
  mounted() {

    window.addEventListener('scroll', this.handleScroll4, false);
  },
  destroyed() {
    window.removeEventListener("scroll",  this.handleScroll4, false);
  }
}
</script>

<style scoped>

  .blog_comment{
    position: relative;
    background-color: rgba(198, 164, 164, 0.1);
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
  }
  .inner_title{
    text-align: center;
    width: 100%;
    top: 40%;
    position: absolute;
    font-size: 50px;
    color: white;
    font-family: 华文行楷;
    font-weight: bolder;
  }
  .top_title{
    position: relative;
    margin-left: 20px;
    background-size: cover;
  }
  .class_title:hover .divider_self{
    width: 100%;
  }
  .sort_title_right{
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .sort_title_left{
    line-height: 40px;
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
    height: 40px;
    background-color: white;
    margin: 15px auto;
  }
  .recommend:hover{
    color: #41afd7;
  }
  .recommend{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: rgba(0,0,0,0.6);
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0);
    transition: all 600ms;
    background-color: rgba(92, 195, 144, 0);
    margin: 5px 0;
    border-radius: 5px;
    line-height: 30px;
    padding: 0 5px;
  }
  .recommend_title{
    display: inline-block;
    width: 80%;
    height: 30px;
  }
  .recommend_type{
    display: inline-block;
    width: 20%;
    height: 30px;
    font-size: 12px;
  }
  .divider_self{
    background-color: #58ad66;
    width: 30%;
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
  .detail-blog-title {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #ffffff;
    position: relative;
    text-align: left;
    font-size: 23px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    padding: 10px;
    padding-bottom: 0;
  }
  .title {
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 30px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
  }
  .line-title {
    bottom: 35px;
    height: 1px;
    background-color: rosybrown;
    margin: 5px;
    margin-bottom: 8px;
  }
  .detail-blog-info {
    overflow: hidden;
    height: 25px;
    color: rgba(0,0,0,0.7);
    font-size: 14px;
  }
  #detail-blog-body {
    padding: 20px;
    margin-top: 5px;
    background-color: #ffffff;
  }
  .detail-blog-footer {
    position: relative;
    overflow: hidden;
    background-color: #ffffff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-top: 5px;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
  }
  .body{
    margin-bottom: 50px;
  }
  .header{
    z-index: 999;
    width: 100%;
    height:90px;
  }
  .blogDetail{
    text-align: left;
  }
</style>
