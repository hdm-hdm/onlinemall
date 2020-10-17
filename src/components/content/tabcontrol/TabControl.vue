<template>
  <div class="tab-control">
      <div class="control-item" v-for="(item,index) in details" :key="item.id"
       :class="{active:index===currentIndex}"
       @click="itemClick(index)">
          <span>{{item}}</span>
          </div>
  </div>
</template>

<script>
export default {
    props:{details:{
        type:Array,
        default(){
            return []
        }
    }},
    data(){
        return {currentIndex:0}
    },
    methods:{
    itemClick(index){
        this.currentIndex=index
        this.$emit('controlClick',index)
    }
    }

}
</script>

<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 16px
}
.control-item{
    flex: 1;
    height: 44px;
    line-height: 44px;
}
.active{
   color:var(--color-high-text) ; 
}
.active span{
    border-bottom: 3px solid var(--color-tint);
    padding: 5px;
}

</style>