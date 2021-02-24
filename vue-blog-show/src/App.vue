<template>
  <div id="app" >
    <v-header></v-header>
    <transition name="el-zoom-in-top">
      <router-view v-if="routerAlive" v-on:click="routerRefresh"/>
    </transition>
    <el-backtop :bottom="50">
      <div>
        <el-icon class="el-icon-arrow-up"></el-icon>
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      routerAlive:true
    }
  },
  methods:{
    routerRefresh(){
      this.routerAlive = false;
      this.$nextTick(()=>{
        this.routerAlive = true;
      });
    },
    generateUUID() {
      let one = new Date().getTime().toString();
      let two = Math.floor(Math.random()*100000000);
      if(two%2 === 1){
        return one.substring(5, one.length) + '' + two
      }
      return two + one.substring(5, one.length);
    },
    getRandomRgba(){
      let a = Math.floor(Math.random()*255);
      let b = Math.floor(Math.random()*255);
      let c = Math.floor(Math.random()*255);
      return `rgba(${a},${b},${c},1)`;
    },
    
  },
  created() {
    let user = localStorage.getItem('user');
    if(!user){
      let userId = this.generateUUID();
      let headImg = this.getRandomRgba();
      user = {
        userId: userId,
        username: '游客'+userId,
        headImg: headImg,
      };
      localStorage.setItem('user', JSON.stringify(user))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
