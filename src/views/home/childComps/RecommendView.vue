<template>
  <div id="recommend">
      <div class="recommend-item" v-for="item in recommends" :key="item.link"> 
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
      </div>
  </div>
</template>

<script>
export default {
    name:'RecommendView',
    props:{recommends:{
        type:Array,
        default(){
            return []
        }
    }}

}
</script>

<style>
#recommend{
    display: flex;
    text-align: center;
    width: 100%;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #F4F4F4;
   
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    width: 75px;
    height: 75px;
    margin-bottom: 10px;

}


</style>