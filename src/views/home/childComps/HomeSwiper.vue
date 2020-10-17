<template>
  <div>
     <swiper>
       <swiper-item v-for="item in banners" :key="item.link">
         <a :href="item.link">
           <img :src="item.image" alt="" @load="swiperLoad">
         </a>
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
        banners:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    data(){
      return {
        isLoad:false
      }
    },
    methods:{
      swiperLoad(){
        //定义一个isLoad变量，初始值为false,使图片加载完成后只发送一次swiperLoad，
        //因为offsetTop只计算一次就行，结果都一样
        if(!this.isLoad)
        this.$emit('swiperLoad')
        this.isLoad = true

      }
    }
        
    
    

}
</script>

<style>

</style>