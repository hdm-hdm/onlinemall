<template>
  <div class="dtailNav">
      <nav-bar>
          <template v-slot:left>
          <img src="~assets/img/common/back.svg" alt="" class="nav-img" @click="imgClick">
          </template>
          <template v-slot:center>
            <div class="nav-center">
            <div v-for="(item,index) in navs" 
            :key="item.index"
            class="nav-item"
            :class="{active:index===currentIndex}"
            @click="navClick(index)"><span>{{item}}</span></div>
            </div>
          </template>
         
      </nav-bar>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/NavBar'
export default {
    name:'DetailNav',
    components:{
        navBar
    },
    data(){
        return {
            navs:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods:{
        navClick(index){
            this.currentIndex = index
            this.$emit('navClick',index)
        },
        imgClick(){
            this.$router.go(-1)
        }
    }

}
</script>

<style scoped>
.nav-center{
    display: flex;
}
.nav-item{
    flex: 1;
    text-align: center;
    margin-right: 5px;
    font-size: 14px;
}
.nav-img{
    margin-top: 13px;
    margin-left: 16px;
}
.active{
    color: var(--color-high-text);
     width: 28px;
    height: 44px;
}
.active span{
    border-bottom: 3px solid var(--color-tint);
    width: 28px;
    height: 16px;
    line-height: 16px;
    padding: 5px;
}

</style>