<template>
  <div class="menu">
      <div v-for="(item,index) in tabMenu" :key="item.index" 
      @click="menuClick(index)"
      class="menu-item"
      :class="{active:index===currentIndex}">
      {{item.title}}
      </div>
  </div>
</template>

<script>
export default {
    name:'CategoryMenu',
    props:{
        tabMenu:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        menuClick(index){
            this.currentIndex=index
            console.log(index)
            this.$emit('menuClick',index)
        }
    }

}
</script>

<style scoped>
.menu{
width:25%;
background-color: #f6f6f6;
font-size: 14px;

}
.menu-item{
height: 50px;
line-height: 50px;
text-align: center;
border-bottom: 2px solid #eee;
}
.active{
    border-left: 3px solid var(--color-high-text);
    background-color: #fff;
    color: var(--color-high-text);
}


</style>