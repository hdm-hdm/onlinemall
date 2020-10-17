<template>
  <div class="goods-item">
      <img v-lazy="item.image||item.show.img" alt="" @load="imgLoad" @click="goodsClick(item.iid)">
      <div class="goods-info">
        <p class="title">{{item.title}}</p>
      <span class="price">{{item.price}}</span>
      <span class="collect">{{item.cfav}}</span>
      </div>
      
  </div>
</template>

<script>
export default {
  props:{item:{
    type:Object,
    default(){
      return {}
    }
  }},
  mounted(){
      
  },
  methods:{
   imgLoad(){
    //  if(this.$route.path.indexOf('/home') !==-1){
    //  this.$bus.$emit('imgLoad')
    //   } else if(this.$route.path.indexOf('/home') !==-1){
    //     this.$bus.$emit('detailImgLoad')
    //   }
     this.$bus.$emit('imgLoad')
   },
   goodsClick(id){
    //  console.log('goodsitemclick');
    //  console.log(id);
     this.$router.push('/details/'+id)
   }
  }

}
</script>

<style scoped>
.goods-item{
  padding-bottom: 40px;
  width: 48%;
  position: relative;
  margin-right: 5px;
  
}
.goods-item img{
  width: 100%;
   border-radius: 5px;
}
.goods-info{
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
  margin-top: 8px;
}
.goods-info .title{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-bottom: 3px;
  font-size: 12px;
  
}
.goods-info .price{
  margin-right:35px;
  color: red;
  
}
.goods-info .collect{
  position: relative;
 
}
 .goods-info .collect::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -17px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;;
  }

</style>