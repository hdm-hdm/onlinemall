<template>
  <div class="check-button" @click="checkClick" :class="{'checked':isChecked}">
  <img src="~assets/img/cart/tick.svg" alt="" >
  </div>
</template>

<script>
export default {
name:'CheckButton',
props:{
    isChecked:{
        type:Boolean,
        default:false
    }
},
methods:{
  checkClick(){
    this.$emit('checkClick')
  }
}
}
</script>

<style scoped>
.check-button{
  border: 2px solid #ccc;
  border-radius: 50%;
}
.checked{
    background-color: red;
}
</style>