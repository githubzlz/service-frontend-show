<template>
  <div style="text-align: center; max-width: 100%">
    {{wordOut.output}}
    <div style="width: 10px; height: 0px; display: inline-block">
      {{wordOut.cursor}}
    </div>
  </div>
</template>

<script>
export default {
  name: "TypeWriter",
  props:{
    wordOut:{
      type: Object,
      required: true,
    }
  },
  data(){
    return{
    }
  },
  methods:{
    typewriter(){
      this.appendLetter(0, this.wordOut.speed);
    },

    /**
     * 消除字
     */
    removeLetter(index, nextTimeOut){
      setTimeout(() => {
        this.wordOut.output = this.wordOut.output.substring(0,index);
        index -= 1;
        if(index >= 0){
          this.removeLetter(index, this.wordOut.disSpeed);
        } else {
          setTimeout(() => {
            this.appendLetter(this.wordOut.reAppendIndex, this.wordOut.speed);
          },500)
        }
      },nextTimeOut);
    },

    /**
     * 打字
     */
    appendLetter(index, nextTimeOut){
      setTimeout(() => {
        let letter = this.wordOut.input.substring(index, index+1);
        this.wordOut.output = this.wordOut.output.concat(letter);
        index += 1;
        if(index < this.wordOut.input.length && letter !== '。'){
          let timeOut = this.wordOut.speed;
          if(letter === '，' || letter === ','){
            timeOut = timeOut*5;
          }
          this.appendLetter(index, timeOut);
        }else {
          // 若是打到最后一个字了，则从头开始循环
          if(index === this.wordOut.input.length){
            this.wordOut.reAppendIndex = 0;
          }else {
            this.wordOut.reAppendIndex = index;
          }
          setTimeout(() => {
            this.removeLetter(index-1, this.wordOut.disSpeed);
          },1000)
        }
      },nextTimeOut);
    },

    /**
     * 光标闪动
     */
    setCursor(){
      let cursor = this.wordOut.cursor;
      setInterval(() => {
        if(this.wordOut.cursor === cursor) {
          this.wordOut.cursor = ' ';
        }else {
          this.wordOut.cursor = cursor;
        }
      }, 400)
    }
  },
  mounted() {
    this.setCursor();
    setTimeout(() => {
      this.typewriter();
    }, 1000);
  }
}

</script>

<style scoped>

</style>
