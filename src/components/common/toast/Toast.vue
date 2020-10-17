<template>
  <div class="toast" v-show="isShow">
  <div> {{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
    data(){
      return {
        isShow:false,
        message:''
      }
    },
    methods:{
      show(message,time){
        this.message=message;
        this.isShow=true;
        setTimeout(()=>{
          this.isShow=false;
          this.message=''
        },time)
      }
    }
  }
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color:rgba(0,0,0,.3);
  color: black;
  z-index: 999;
  padding: 8px 5px;
}

</style>