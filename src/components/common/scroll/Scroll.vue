<template>
  <div class="wraper" ref="wraper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
    this.scroll = new BScroll(this.$refs.wraper,{
    click:true,
    probeType:this.probeType,
    pullUpLoad:this.pullUp})

    this.scroll.on('scroll',position=>{
        this.$emit('scroll',position)
    })

    this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
    })
    
    
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUp:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        finishPullUp(){
        this.scroll&&this.scroll.finishPullUp()
        },
        refresh(){
        this.scroll&&this.scroll.refresh()
            // console.log('刷新');
        },
        getScrollY(){
           return this.scroll?this.scroll.y:0
        }
    }

}
</script>

<style scoped>

</style>