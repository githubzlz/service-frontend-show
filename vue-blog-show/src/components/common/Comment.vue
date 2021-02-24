<template>
  <div>
    <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
      <div class="header-img" style="border-radius: 40px" :style="'width: 40px; height: 40px;background-color: '+myHeader">
        <div style="line-height: 40px; text-align: center; font-size: 15px; overflow: hidden; height: 40px">
          {{myName}}
        </div>
      </div>
      <div class="reply-info" >
        <div
            tabindex="0"
            contenteditable="true"
            id="replyInput"
            spellcheck="false"
            placeholder="输入评论..."
            class="reply-input"
            @focus="showReplyBtn"
            @input="onDivInput($event)"
        >
        </div>
      </div>
      <div class="reply-btn-box" v-show="btnShow">
        <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
      </div>
    </div>
    <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
      <div class="header-img" style="border-radius: 40px" :style="'width: 40px; height: 40px;background-color: '+item.fromHeadImg">
        <div style="line-height: 40px; text-align: center; font-size: 15px; overflow: hidden; height: 40px">
          {{item.name}}
        </div>
      </div>
      <div class="author-info">
        <span class="author-name">{{item.name}}</span>
        <span class="author-time">{{item.time}}</span>
      </div>
      <div class="icon-btn">
        <span @click="showReplyInput(i,item.name,item.id)"><i class="iconfont el-icon-s-comment"></i>{{item.commentNum}}</span>
        <i class="iconfont el-icon-caret-top"></i>{{item.like}}
      </div>
      <div class="talk-box">
        <p>
          <span class="reply">{{item.comment}}</span>
        </p>
      </div>
      <div class="reply-box">
        <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
          <div class="header-img" style="border-radius: 40px" :style="'width: 40px; height: 40px;background-color: '+reply.fromHeadImg">
            <div style="line-height: 40px; text-align: center; font-size: 15px; overflow: hidden; height: 40px">
              {{reply.name}}
            </div>
          </div>
          <div class="author-info">
            <span class="author-name">{{reply.from}}</span>
            <span class="author-time">{{reply.time}}</span>
          </div>
          <div class="icon-btn">
            <span @click="showReplyInput(i,reply.from,reply.id)"><i class="iconfont el-icon-s-comment"></i>{{reply.commentNum}}</span>
            <i class="iconfont el-icon-caret-top"></i>{{reply.like}}
          </div>
          <div class="talk-box">
            <p>
              <span>回复 {{reply.to}}:</span>
              <span class="reply">{{reply.comment}}</span>
            </p>
          </div>
          <div class="reply-box">

          </div>
        </div>
      </div>
      <div  v-show="_inputShow(i)" class="my-reply my-comment-reply">
        <div class="header-img" style="border-radius: 40px" :style="'width: 40px; height: 40px;background-color: '+myHeader">
          <div style="line-height: 40px; text-align: center; font-size: 15px; overflow: hidden; height: 40px">
            {{myName}}
          </div>
        </div>
        <div class="reply-info" >
          <div tabindex="0" @focus="showReplyBtn2" contenteditable="true" spellcheck="false" placeholder="输入评论..."   @input="onDivInput($event)"  class="reply-input reply-comment-input"></div>
        </div>
        <div class=" reply-btn-box">
          <el-button class="reply-btn" size="medium" @click="sendCommentReply(i)" type="primary" v-if="btnShow2">发表评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};

import {api} from '@/api/api'
export default {
  name:'Comment',
  props: {
    commentsData: {},
    blogId: String,
    type: Number,
  },
  watch:{
    commentsData:function(e){
      const map = new Map();
      if(e){
        e.forEach(item =>{
          if(item.children){
            map.set(item.id,item);
            item.children.forEach(item =>{
              map.set(item.id,item);
            })
          }
        });
        e.forEach(item =>{
          const comment = {
            name: item.username,
            id: item.id,
            fromHeadImg: item.headImg,
            comment:item.comment,
            time:this.dateStr(new Date(item.createdTime).getTime()),
            commentNum:item.children.length,
            like:item.likes,
            inputShow:false,
            reply:[]
          }
          if(item.children){
            item.children.forEach(item =>{
              const to = map.get(item.toId);
              const commentC = {
                id: item.id,
                from: item.username,
                fromId: item.id,
                fromHeadImg: item.headImg,
                to: to.username,
                toId: to.id,
                comment: item.comment,
                time:this.dateStr(new Date(item.createdTime).getTime()),
                commentNum:item.commentNum,
                like:item.likes,
                inputShow:false
              }
              comment.reply.push(commentC);
            })
          }
          this.comments.push(comment);
        })
      }
    }
  },
  data(){
    return{
      btnShow: false,
      btnShow2: false,
      index:'0',
      replyComment:'',
      myName:'Lana Del Rey',
      myHeader:'',
      myId:19870621,
      to:'',
      toId:-1,
      comments:[]
    }
  },
  created() {
    const json = JSON.parse(localStorage.getItem('user'));
    this.myName = json.username;
    this.myId = json.userId;
    this.myHeader = json.headImg;
  },
  directives: {clickoutside},
  methods: {
    getDate(date){
      let dt = new Date(date);
      let y = dt.getFullYear();
      let M = dt.getMonth() + 1;
      let d = dt.getDate();
      let h = dt.getHours();
      let m = dt.getMinutes()
      return `${y}年${M}月${d}日 ${h}:${m}`
    },
    inputFocus(){
      var replyInput = document.getElementById('replyInput');
      replyInput.style.padding= "8px 8px"
      replyInput.style.border ="2px solid blue"
      replyInput.focus()
    },
    showReplyBtn(){
      this.btnShow = true
    },
    showReplyBtn2(){
      this.btnShow2 = true
    },
    hideReplyBtn(){
      this.btnShow = false
      replyInput.style.padding= "10px"
      replyInput.style.border ="none"
    },
    showReplyInput(i,name,id){
      console.log(i,name,id)
      this.comments[this.index].inputShow = false
      this.index =i
      this.comments[i].inputShow = true
      this.to = name
      this.toId = id
    },
    _inputShow(i){
      return this.comments[i].inputShow
    },
    sendComment(){
      if(!this.replyComment){
        this.$message({
          showClose: true,
          type:'warning',
          message:'评论不能为空'
        })
      }else{
        let a ={}
        let input =  document.getElementById('replyInput')
        let timeNow = new Date().getTime();
        let time= this.dateStr(timeNow);
        let reply = document.getElementById("replyInput").innerText;
        //提交评论
        const param = {
            userId:this.myId,
            username:this.myName,
            headImg:this.myHeader,
            blogId:this.blogId,
            comment:reply,
            type:"1"
        }
        api.getCommentMsg(param).then(res =>{
          if(res.code === 1){

            //滚动到底部
            window.scrollTo(0, document.body.scrollHeight)

            a.name= this.myName
            a.comment =reply
            a.headImg = this.myHeader
            a.time = time
            a.commentNum = 0
            a.like = 0
            a.id = res.entity.id
            a.reply = []
            this.comments.push(a)
            this.replyComment = ''
            input.innerHTML = '';
          }else {
            this.$message({
              showClose: true,
              type:'error',
              message:'评论失败'
            })
          }
        })
      }
    },
    sendCommentReply(i){
      if(!this.replyComment){
        this.$message({
          showClose: true,
          type:'warning',
          message:'评论不能为空'
        })
      }else{
        let a ={}
        let timeNow = new Date().getTime();
        let time= this.dateStr(timeNow);
        let reply = document.getElementsByClassName("reply-comment-input")[i].innerText;
        //提交评论
        const param = {
          userId:this.myId,
          username:this.myName,
          headImg:this.myHeader,
          blogId:this.blogId,
          comment:reply,
          floorId: this.comments[i].id,
          toId: this.toId,
          type: this.type
        }
        api.getCommentMsg(param).then(res =>{
          if(res.code === 1){
            a.from= this.myName
            a.to = this.to
            a.fromHeadImg = this.myHeader
            a.comment =reply
            a.time = time
            a.commentNum = 0
            a.like = 0
            a.id = res.entity.id
            this.comments[i].reply.push(a)
            this.comments[i].commentNum = this.comments[i].commentNum + 1;
            this.replyComment = ''
            document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
          }else {
            this.$message({
              showClose: true,
              type:'error',
              message:'评论失败'
            })
          }
        })

      }
    },
    onDivInput: function(e) {
      this.replyComment = e.target.innerHTML;
    },
    dateStr(date){

      //获取js 时间戳
      var time=new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time=parseInt((time-date)/1000);
      //存储转换值
      var s;
      if(time<60*10){//十分钟内
        return '刚刚';
      }else if((time<60*60)&&(time>=60*10)){
        //超过十分钟少于1小时
        s = Math.floor(time/60);
        return  s+"分钟前";
      }else if((time<60*60*24)&&(time>=60*60)){
        //超过1小时少于24小时
        s = Math.floor(time/60/60);
        return  s+"小时前";
      }else if((time<60*60*24*30)&&(time>=60*60*24)){
        //超过1天少于30天内
        s = Math.floor(time/60/60/24);
        return s+"天前";
      }else{
        //超过30天ddd
        var date= new Date(parseInt(date));
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.my-reply
  padding 10px
  background-color #fafbfc
  .header-img
    display inline-block
    vertical-align top
  .reply-info
    display inline-block
    margin-left 5px
    width 90%
    @media screen and (max-width:1200px) {
      width 80%
    }
    .reply-input
      min-height 20px
      line-height 22px
      padding 10px 10px
      color #ccc
      background-color #fff
      border-radius 5px
      &:empty:before
        content attr(placeholder)
      &:focus:before
        content none
      &:focus
        padding 8px 8px
        border 2px solid blue
        box-shadow none
        outline none
  .reply-btn-box
    height 25px
    margin 10px 0
    .reply-btn
      position relative
      float right
      margin-right 15px
.my-comment-reply
  margin-left 50px
  .reply-input
    width flex
.author-title:not(:last-child)
  border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
  padding 10px
  .header-img
    display inline-block
    vertical-align top
  .author-info
    display inline-block
    margin-left 5px
    width 60%
    height 40px
    line-height 20px
    >span
      display block
      cursor pointer
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .author-name
      color #000
      font-size 18px
      font-weight bold
    .author-time
      font-size 14px
  .icon-btn
    width 30%
    padding 0 !important
    float right
    @media screen and (max-width : 1200px){
      width 20%
      padding 7px
    }
    >span
      cursor pointer
    .iconfont
      margin 0 5px
  .talk-box
    margin 0 50px
    >p
      margin 0
    .reply
      font-size 16px
      color #000
  .reply-box
    margin 10px 0 0 50px
    background-color #efefef
</style>
