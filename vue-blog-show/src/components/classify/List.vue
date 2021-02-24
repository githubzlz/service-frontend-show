<template>
  <div id="list" class="flex">
    <div class="small" style="margin: 20px">
      <div class="card cardTwo">
        <div id="list_container_left_title">{{title}}</div>
        <div style="margin: 5px 5px; font-size: 13px; width: 100%; cursor: pointer" v-on:click="openAllMenu()" v-if="!openAllMenuState">
          展开全部
          <el-icon class="el-icon-arrow-down"></el-icon>
        </div>
        <div style="margin: 5px 5px; font-size: 13px; width: 100%;cursor: pointer" v-on:click="openAllMenu()" v-if="openAllMenuState">
          折叠全部
          <el-icon class="el-icon-arrow-up"></el-icon>
        </div>
        <div v-for="(data,index) in titleList" v-bind:key="index" class="catalog_inner">
          <div class="menuTop" v-on:click="openMenu(index)">
            <el-icon class="el-icon-turn-off" v-if="!data.open" style="cursor: pointer; border-radius: 5px"></el-icon>
            <el-icon class="el-icon-open" v-if="data.open" style="cursor: pointer; border-radius: 5px"></el-icon>
            <span v-if="!data.active" style="margin-left: 5px">{{data.title}}</span>
            <span v-if="data.active" style="margin-left: 5px">{{data.title}}</span>
          </div>
          <div v-if="data.open">
            <div v-for="(subData,index2) in data.subTitle" v-bind:key="index2" style="padding-left: 10px;">
              <div class="catalog_submenu"
                   v-on:click="menuClick(index, index2)"
                   v-if="subData.active"
                   style="background-image: linear-gradient(to right, rgb(229,138,127) 10%, rgb(153, 226, 127) 100%);color: #ffffff">
                {{subData.title}}
              </div>
              <div class="catalog_submenu"
                   v-on:click="menuClick(index, index2)"
                   v-if="!subData.active" style="color: #00a8c6">
                {{subData.title}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card cardTwo">
        <div class="title">
          <el-icon class="el-icon-edit" style="margin-right: 10px"/>评论
          <div class="under_line"></div>
        </div>
      </div>
    </div>
    <div class="big" id="big" style="margin: 20px">
      <div id="list_header">
        位置：/ 技术博文 / {{title}} / {{getCurrentTitle(currentMenuIndex)}} / {{getCurrentSubTitle(currentMenuIndex, currentSubMenuIndex)}}
      </div>
      <div class="card" style="text-align: center">
        <div id="loader3" class="loader-container" style="margin: 80px auto;" v-if="contentLoading">
          <div class="loader three"></div>
        </div>
        <div v-if="!contentLoading">
          <div id="list_content_title">
            <el-tag type="success" style="margin-right: 5px">原创</el-tag>
            {{getCurrentSubTitle(currentMenuIndex, currentSubMenuIndex)}}
          </div>
          <div style="text-align: left; border-bottom: 2px solid #efefef; font-size: 13px; color: rgba(0,0,0,0.8); padding: 10px">
          <span style="margin-right: 10px">
            <el-icon class="el-icon-user" style="margin-right: 3px"></el-icon>朱林忠
          </span>
            <span style="margin-right: 10px">
            <el-icon class="el-icon-reading" style="margin-right: 3px"></el-icon>167
          </span>
            <span style="margin-right: 10px">
            <el-icon class="el-icon-star-off" style="margin-right: 3px"></el-icon>32
          </span>
            <span style="margin-right: 10px">
          <el-icon class="el-icon-time" style="margin-right: 3px"></el-icon>2020/12/04
          </span>
          </div>
          <div id="list_content_article">
          </div>
        </div>
      <div class="list_content_top" style="border-top: 1px solid #dcd6d6; border-bottom: none; margin-top: 20px;">
        <div class="list_content_top_left" v-on:click="beforeArticle()">
          <el-icon class="el-icon-d-arrow-left" style="position:absolute; left: 2px; top: 7px;font-weight: bolder;color: rgba(0,0,0,.5)"></el-icon>
          <div style="margin-left: 20px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
            {{getCurrentSubTitle(currentMenuIndex, currentSubMenuIndex-1, true)}}
          </div>
        </div>
        <div class="list_content_top_right" v-on:click="nextArticle()">
          <div style="margin-right: 20px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
            {{getCurrentSubTitle(currentMenuIndex, currentSubMenuIndex+1, false)}}
          </div>
          <el-icon class="el-icon-d-arrow-right" style="position:absolute; right: 2px; top: 7px; font-weight: bolder; color: rgba(0,0,0,.5)"></el-icon>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'List',
  data(){
    return{
      contentLoading: false,
      showContent: true,
      openAllMenuState: false,
      title: 'JAVA课程',
      currentMenuIndex:0,
      currentSubMenuIndex:0,
      titleList: [
        {
          title:'Java基础',
          open: false,
          active: false,
          subTitle:[
            {title:'Java语法基础',active: false},
            {title:'JVM虚拟机内存模型',active: false}
          ]
        },{
          title:'Java中级',
          open: false,
          active: false,
          subTitle:[
            {title:'JUC编程',active: false},
            {title:'Java集合框架Java',active: false},
            {title:'数据结构基础',active: false},
            {title:'JVM垃圾回收策略',active: false}
          ]
        },{
          title:'Java框架',
          open: false,
          active: false,
          subTitle:[
            {title:'Spring框架！',active: false},
            {title:'SpringBoot框架',active: false},
            {title:'SpringCloud全家桶',active: false}
          ]
        },{
          title:'Java总结',
          open: false,
          active: false,
          subTitle:[
            {title:'Java总结-1',active: false},
            {title:'Java总结-2',active: false}
          ]
        },{
          title:'其他',
          open: false,
          active: false,
          subTitle:[
            {title:'JVM类加载机制',active: false},
            {title:'JVM优化',active: false}
          ]
        }
      ],
      content:[
        '## 1. \tJVM基础\n\n- JVM实现\n  - Oracle Hotspot \n    - 解释器\n    - 编译器\n    - java是解释型语言还是编译性语言\n  - BEA JRocket\n  - IBM J9\n  - OpenJ9\n- class 文件\n  - 文件概览\n    - 魔数\n    - class文件版本\n    - **Class常量池**\n    - 访问标志\n    - 类索引，父索引 接口索引\n    - 字段表\n    - 方法表\n    - 属性表\n  - 字节码指令\n    - 字节码与数据类型\n    - 加载和存储指令\n    - 运算指令\n    - 类型转换指令\n    - 对象创建与访问指令\n    - 操作数栈与管理指令\n    - 控制转移指令\n    - 方法调用和返回指令\n    - 异常处理指令\n    - 同步指令\n- JVM构成\n  - 类加载子系统\n    - 类加载概述\n      - 类加载器\n      - 双亲委派模型\n      - 破坏双亲委派模型\n    - 类加载的时机\n    - 类加载的过程\n  - 运行时数据区\n  - 执行引擎\n  - 本地方法接口\n  - 垃圾收集模块\n\n## 2. JVM内存结构\n\n- JVM运行时数据区\n  - 程序计数器\n  - java虚拟机栈\n  - 本地方法栈\n  - java堆\n  - 方法区\n  - 运行时常量\n  - 直接内存\n- 虚拟机对象剖析\n  - 对象创建\n    - new \n    - 类加载\n    - 分配空间\n      - 分配方式\n        - 指针碰撞\n        - 空闲列表\n      - 分配线程安全解决方案\n        - CAS\n        - TLAB\n    - 内存空间初始化\n  - 对象布局\n    - 对象头\n      - 运行时数据部分\n      - 指针类型\n    - 实例数据\n    - 对齐填充\n  - 对象访问\n    - 句柄访问\n    - 直接访问地址\n\n## 3. 垃圾回收\n\n- 垃圾回收\n  - 判断算法\n    - 引用计数法\n    - 可达性分析法\n    - 引用介绍\n      - 强引用\n      - 软引用\n      - 弱引用\n      - 虚引用\n  - 回收算法\n    - 标记-清除法\n    - 复制算法\n    - 标记-整理算法\n    - 分代回收算法\n  - 垃圾回收器\n    - 新生代\n      - Serial收集器\n      - ParNew收集器\n      - Parallel Scavenge收集器\n    - 老年代\n      - Serial Old收集器\n      - Parallel Old收集器\n      - CMS\n      - G1\n- GC日志分析\n\n## 4. JVM优化\n\n- JVM性能监控与故障处理工具\n  - JDK命令工具\n    - jps\n    - jstart\n    - jinfo\n    - jmap\n    - jhat\n    - jstack\n    - HSDIS\n  - JDK可视工具\n    - JConsole\n    - VisualVM\n- 调优案例\n\n## 5. JMM与并发\n\n- java内存模型\n  - 主内存与工作内容\n  - 内存间交互操作\n  - 对于voliatile型变量的特色规则\n  - 原子性，可见性，有序性\n- java与线程\n  - 线程实现\n  - 线程调度\n  - 状态转换\n- 线程安全与锁优化\n  - 线程安全\n    - java语言中的线程安全\n    - 线程安全实现方法\n  - 锁优化\n    - 自旋锁与自适应锁\n    - 锁消除\n    - 锁粗化\n    - 轻量级锁\n    - 偏向锁\n\n',
        '## 我的网站搭建我的网站搭建-JAVA\n\n\n### 1. 载体·工具·服务\n\n- 域名 我的域名（腾讯云）：[www.zlztsb.com]([https://www.zlztsb.com)\n- 服务器：\n  - 云服务器\n- 服务：\n  - 前端服务：\n    - 展示前端\n    - 后台管理\n  - 后端服务\n    - 展示服务\n    - 后台管理服务\n\n### 2.网站备案\n\n- 腾讯云协助备案，获取备案号 **--鲁ICP备20032901号**\n\n### 3.下载域名免费HTTPS证书\n\n### 4. 服务器部署FastDFS作为文件服务\n\n- 用作图片文件，文章md文件，资料等小文件的储存\n- 使用java客户端做文件管理\n\n### 5.服务部署*   SpringBoot\n\n- 使用nginx做反向代理\n- 配置防火墙开放服务端口\n- 编写服务管理脚本\n- 项目打包上传，部署\n\n\n\n',
        '## 我的网站搭建我的网站搭建我的网站搭建-JAVA\n\n\n### 1. 载体·工具·服务\n\n- 域名 我的域名（腾讯云）：[www.zlztsb.com]([https://www.zlztsb.com)\n- 服务器：\n  - 云服务器\n- 服务：\n  - 前端服务：\n    - 展示前端\n    - 后台管理\n  - 后端服务\n    - 展示服务\n    - 后台管理服务\n\n### 2.网站备案\n\n- 腾讯云协助备案，获取备案号 **--鲁ICP备20032901号**\n\n### 3.下载域名免费HTTPS证书\n\n### 4. 服务器部署FastDFS作为文件服务\n\n- 用作图片文件，文章md文件，资料等小文件的储存\n- 使用java客户端做文件管理\n\n### 5.服务部署*   SpringBoot\n\n- 使用nginx做反向代理\n- 配置防火墙开放服务端口\n- 编写服务管理脚本\n- 项目打包上传，部署\n\n\n\n'
      ],
    }
  },
  methods: {
    setBlog(){
      this.contentLoading = true;
      setTimeout(()=>{
        this.contentLoading = false;
        setTimeout(()=>{
          document.getElementById("list_content_article").innerHTML = '';
          document.getElementById("list_content_article").innerHTML = `<div id="editor_md1" style="width: 95%;"><textarea></textarea></div>`
          let contentMd = this.content[this.currentSubMenuIndex%3];
          window.editormd.markdownToHTML('editor_md1', {
            markdown        : contentMd,//+ "\r\n" + $("#append-test").text(),
            //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
            htmlDecode      : "style,script,iframe",  // you can filter tags decode
            toc             : false,
            tocm            : true,    // Using [TOCM]
            tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
            //gfm             : false,
            //tocDropdown     : true,
            markdownSourceCode : false, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
            emoji           : false,
            taskList        : true,
            tex             : true,  // 默认不解析
            flowChart       : true,  // 默认不解析
            sequenceDiagram : true,  // 默认不解析
          });
        },10)
      }, 1000)
    },

    beforeArticle(){
      this.scrollTop();
      if(this.currentMenuIndex === 0 && this.currentSubMenuIndex === 0){
        return;
      }
      this.setBlog();
      if(this.currentSubMenuIndex !== 0){
        this.clearOpenStatus();
        this.currentSubMenuIndex--;
        this.menuClick(this.currentMenuIndex,this.currentSubMenuIndex);
      }else {
        this.clearOpenStatus();
        this.currentMenuIndex--;
        this.currentSubMenuIndex = this.titleList[this.currentMenuIndex].subTitle.length-1;
        if(!this.titleList[this.currentMenuIndex].open){
          this.openMenu(this.currentMenuIndex);
        }
        this.menuClick(this.currentMenuIndex,this.currentSubMenuIndex);
      }
    },

    nextArticle(){
      this.scrollTop();
      if(this.currentMenuIndex === this.titleList.length-1 && this.currentSubMenuIndex === this.titleList[this.currentMenuIndex].subTitle.length-1){
        return ;
      }
      this.setBlog();
      if(this.currentSubMenuIndex !== this.titleList[this.currentMenuIndex].subTitle.length-1){
        this.clearOpenStatus();
        this.currentSubMenuIndex++;
        this.menuClick(this.currentMenuIndex,this.currentSubMenuIndex);
      }else {
        this.clearOpenStatus();
        this.currentMenuIndex++;
        this.currentSubMenuIndex = 0;
        if(!this.titleList[this.currentMenuIndex].open){
          this.openMenu(this.currentMenuIndex);
        }
        this.menuClick(this.currentMenuIndex,this.currentSubMenuIndex);
      }
    },

    scrollTop(){
      let timer = setInterval(function(){
        document.body.scrollTop -= 100;
        document.documentElement.scrollTop -=100;
        if(document.body.scrollTop ===0 && document.documentElement.scrollTop ===0){
          clearInterval(timer);
        }
      },30)
    },

    getCurrentTitle(index){
     if(this.titleList){
       if(index !== -1 && index < this.titleList.length){
         return this.titleList[index].title;
       }
     }
      return '没有啦';
    },

    getCurrentSubTitle(index, subIndex, before){
      if(this.titleList){
        if(index !== -1 && index < this.titleList.length){
          if(subIndex !== -1 && this.titleList[index] && this.titleList[index].subTitle.length > subIndex){
            return this.titleList[index].subTitle[subIndex].title;
          }else {
            if(before){
              return this.getSubTitle(index-1,before);
            }else {
              return this.getSubTitle(index+1,before);
            }
          }
        }
      }
      return '没有啦';
    },

    getSubTitle(index, before){
      if(before){
        if(index === -1){
          return '没有啦';
        }
        if(this.titleList[index].subTitle){
          return this.titleList[index].subTitle[this.titleList[index].subTitle.length-1].title;
        }else {
          this.getSubTitle(index-1);
        }
      }else {
        if(index >= this.titleList.length){
          return '没有啦';
        }
        if(this.titleList[index].subTitle){
          return this.titleList[index].subTitle[0].title;
        }else {
          this.getSubTitle(index+1);
        }
      }
    },

    menuClick(index, index2){
      // 清除菜单的状态
      this.clearOpenStatus();

      //
      if(index <= 0){
        this.beforeSubMenu = null;
      }else {
        this.beforeSubMenu = this.titleList[index-1];
      }

      // 修改当前活动的菜单
      this.currentMenuIndex = index;
      this.currentSubMenuIndex = index2;

      // 将状态设置为活跃
      this.titleList[index].active = true;
      this.titleList[this.currentMenuIndex].subTitle[this.currentSubMenuIndex].active = true;

      this.setBlog();
    },

    clearOpenStatus(){
      if(this.currentMenuIndex !== -1){
        this.titleList[this.currentMenuIndex].active = false;
        if(this.currentSubMenuIndex !== -1){
          this.titleList[this.currentMenuIndex].subTitle[this.currentSubMenuIndex].active = false;
        }
      }
    },

    openAllMenu(){
      this.titleList.forEach(item =>{
        item.open = !this.openAllMenuState;
      })
      this.openAllMenuState = !this.openAllMenuState;
    },

    openMenu(index){
      // 修改当前菜单的状态
      this.titleList[index].open = !this.titleList[index].open;

      // 检查是否所有的菜单都是关闭状态
      let status = true;
      this.titleList.forEach(item =>{
        if(!item.open){
          status = false;
        }
      })
      // 若是存在未打开的菜单,则显示展开全部的按钮
      // 若是所有菜单都打开了,就显示折叠全部的按钮
      this.openAllMenuState = status;
    },
    resize(){
      const width = document.documentElement.clientWidth;
      const listMiddle = document.getElementById('list_middle');
      if(listMiddle){
        if(width < 750){
          listMiddle.style.minWidth = `${width-40}px`
        }else {
          listMiddle.style.minWidth = '650px'
        }
      }
    }
  },
  mounted() {
    // this.resize();
    // window.addEventListener('resize', ()=>{
    //   this.resize();
    // })
    this.menuClick(0,0);
    this.setBlog();
    this.openMenu(0);
  },
}
</script>

<style scoped>
.menuTop:hover{
  background-color: #f6f4f4;
}
.menuTop{
  font-size: 16px;
  color: rgba(0,0,0,0.9);
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  transition:  all 200ms;
}
#list_content_article{
  position: relative;
}
#list_content_title{
  font-family: 华文楷体;
  font-size: 32px;
  padding: 10px 10px;
  text-align: left;
}
.list_content_top_left{
  display: inline-block;
  float: left;
  max-width: 48%;
  cursor: pointer;
  transform: skewX(-9grad);
}
.list_content_top_right{
  display: inline-block;
  float: right;
  max-width: 48%;
  cursor: pointer;
  transform: skewX(-9grad);
}
.list_content_top{
  font-size: 15px;
  color: rgba(0,0,0,.8);
  position: relative;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  padding-bottom: 5px;
  border-bottom: 1px solid #dcd6d6;
}
#list_header{
  text-align: left;
  line-height: 25px;
  word-break: break-word;
  overflow: hidden;
  font-size: 15px;
  width: calc(100% - 30px);
  padding: 5px;
  border-radius: 5px;
  margin: 10px 10px 5px 10px;
  background-color: #f1f0f0;
  color: rgba(0,0,0,.5);
  transform: skewX(-8grad);
}
.catalog_submenu:hover{
  background-color: #f6f4f4;
}
.catalog_submenu{
  color: #00a8c6;
  border-radius: 5px;
  font-size: 14px;
  color: rgba(0,0,0,0.8);
  padding: 5px 0 5px 5px;
  border: 1px solid white;
  transition: all 200ms;
}
#list{
  display: flex;
  justify-content: center;
  max-width: 1300px;
  margin: 90px auto;
}handleResize
 #list_container_left_title{
  word-break: break-word;
  overflow: hidden;
  text-align: left;
  font-size: 20px;
  font-weight: bolder;
  border-bottom: 1px solid #f3efef;
  width: calc(100% - 10px);
  padding: 5px;
  background-color: white;
  font-family: 楷体;
}
.catalog_inner{
  border-bottom: 1px solid #f3efef;
  margin: 10px 0;
  min-width: 200px;
  padding: 5px;
  background-color: white;
  transition: all 300ms;
}
#big{
  min-width: 440px;
}
@media screen and (max-width: 480px){
  #big{
    min-width: 350px;
  }
}
</style>
