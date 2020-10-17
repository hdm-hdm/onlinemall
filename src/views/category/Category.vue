<template>
  <div>
      <nav-bar class="nav">
        <template v-slot:center>
          <div>分类</div>
        </template>
        </nav-bar>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/NavBar'
export default {
  name:'Category',
  components:{
    navBar
  }

}
</script>

<style scoped>
.nav{
  background-color: var(--color-tint);
  color: white;
}

</style>