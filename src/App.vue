<template>
  <div id="app">
    <main-tabbar></main-tabbar>
    <!-- <keep-alive>使组件不被频繁创建和销毁 -->
    <keep-alive exclude="Details">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import mainTabbar from './components/content/mainTabbar/MainTabBar'
export default {
  components:{
    mainTabbar
  }
}
</script>
<style scoped>
@import "./assets/css/base.css"

</style>
