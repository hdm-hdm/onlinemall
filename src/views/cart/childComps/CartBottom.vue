<template>
  <div class="bottom-menu">
    <div class="select-all">
    <check-button class="check" :is-checked="isAll" @checkClick="checkClick"/>
    <span>全选</span>
    </div>
    <div class="total-price"><span>合计: ¥{{total}}</span></div>
    <div class="buy-product" @click="countClick"><span>去计算({{length}})</span></div>
  </div>
</template>

<script>
import checkButton from './CheckButton'
import {mapGetters} from 'vuex'
export default {
    name:'CartBottom',
    components:{
      checkButton
    },
    computed:{
      ...mapGetters({
        list:'goodsList',
        total:'totalPrice',
        length:'cartLength'
      }),
      isAll(){
      if(this.list.length!==0){
      const check = this.list.find(item=>item.checked === false)
      if(!check){
        return true
      }      
      } else{
        return false}
    }
    
    },
    methods:{
      checkClick(){ 
        //?    
         if(this.isAll){
           this.list.forEach(item => {
             item.checked = false
           });
         } else{
           this.list.forEach(item => {
             item.checked = true
         })
      }
    },
    countClick(){
      if(this.length===0){
        this.$toast.show('请添加要购买的商品',1000)
      }
    }
}
}
</script>

<style>
.bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 25px;
    box-sizing: border-box;
    display: flex;
  }

  .bottom-menu .select-all {
    display: flex;
    line-height: 44px;
    height: 44px;
    left: 12px;
    top: 13px;
    width: 80px;
    align-items: center;
  }
  .check{
    line-height: 21px;
    height: 21px;
    margin-right: 5px;
    
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
    flex: 1;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    
  }
</style>