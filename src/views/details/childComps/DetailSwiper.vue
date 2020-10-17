<template>
  <div class="dswiper">
  <swiper class="detail-swiper">
      <swiper-item v-for="item in swiperImgs" :key="item.index" class="detail-swiper-item">
          <img :src="item" alt="" @load="imgLoad">
      </swiper-item>
  </swiper>
     
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
components:{
    Swiper,
    SwiperItem
},
props:{
    swiperImgs:{
        type:Array,
        default(){
            return []
        }
    }
},
data(){
    return {
        isLoad:false
    }
},
methods:{
    imgLoad(){
        if(!this.isLoad){
        this.$emit('swiperLoad');
        this.isLoad = true
        }
    }
}
}
</script>

<style scoped>
.detail-swiper-item{
    height: 300px;
    overflow: hidden;
}

</style>