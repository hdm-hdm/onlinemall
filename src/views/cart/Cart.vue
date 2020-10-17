<template>
  <div>
      <nav-bar class="nav-bar">
        <template v-slot:center>
          <div>购物车</div>
        </template>
      </nav-bar>
      <cart-list/>
      <cart-bottom></cart-bottom>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/NavBar'
import cartList from './childComps/CartList'
import cartBottom from './childComps/CartBottom'
export default {
  name:'Cart',
  components:{
    navBar,
    cartList,
    cartBottom
  }

}
</script>

<style scoped>
.nav-bar{
  background-color: #FA7DA3;
  color: #fff;
}
</style>