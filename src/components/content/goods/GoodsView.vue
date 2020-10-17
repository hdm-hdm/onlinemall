<template>
  <div class="goods-view">
    <!-- :key="item.link" 数据不被复用 -->
    <goods-view-item v-for="item in goodslist" :key="item.link" :item="item"></goods-view-item>
  </div>
</template>

<script>
import GoodsViewItem from 'components/content/goods/GoodsViewItem'
export default {
    components:{
        GoodsViewItem
    },
    props:{
      goodslist:{
        type:Array,
        default(){
          return []
        }
      }
    }

}
</script>

<style scoped>
.goods-view{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>