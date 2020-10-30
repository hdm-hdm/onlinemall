<template>
  <div>
      <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="categories">
      <div v-for="item in categories" :key="item.index" class="item">
      <a :href="item.link">
      <img :src="item.image" alt=""  class="item-img">
      <span class="item-text">{{item.title}}</span>
      </a>
      </div>
      </grid-view>
  </div>
</template>

<script>
import gridView from 'components/common/gridview/GridView'
export default {
    components:{
        gridView
    },
props:{
    categories:{
        type:Array,
        default(){
            return []
        }
    },

}
}
</script>

<style scoped>
 .item {
    text-align: center;
    font-size: 10px;
  }

  .item-img {
    width: 80%;
    display: block;
    margin: 0 auto;
  }

  .item-text {
    margin-top: 10px;
    display: block;
  }

</style>