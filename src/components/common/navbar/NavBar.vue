<template>
  <div class="nav-bar">
      <div class="nav-bar-left"><slot name="left"></slot></div>
      <div class="nav-bar-center"><slot name="center"></slot></div>
      <div class="nav-bar-right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav-bar{
    display: flex;
    height: 44px;
    box-shadow: 0 1px 1px rgba(243,243,243,.2)
}

.nav-bar-right{
    width: 60px;
}
.nav-bar-left{
    width: 60px;
}
.nav-bar-center{
    flex: 1;
    text-align: center;
    line-height: 44px;
}

</style>