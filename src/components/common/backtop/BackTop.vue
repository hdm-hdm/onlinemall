<template>
  <div class="back" v-show="isShow">
      <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
    props:{
        isShow:{type:Boolean,default:false}
    }
}
</script>

<style scoped>
.back{
    position: fixed;
    bottom: 58px;
    right: 8px;
}
.back img{
    width:45px;
    height: 45px;
}

</style>