<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
     <cart-list-item v-for="item in list" :key="item.index" :item-info="item" @cartLoad="cartLoad"/>
    </scroll>
  </div>
</template>

<script>
import cartListItem from './CartListItem'
import scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
import {debounce} from 'src/common/util'
export default {
    name:'CartList',
    components:{
      scroll,
      cartListItem
    },
    computed:{
      ...mapGetters({
        list:'goodsList'
      })
    },
    methods:{
      cartLoad(){
        debounce(()=>{
          this.$refs.scroll.refresh()
        },1000)
      }
    }

}
</script>

<style scoped>
.cart-list{
  height: calc(100vh - 44px - 49px);
}
.content{
  height: 100%;
  overflow: hidden;
}

</style>