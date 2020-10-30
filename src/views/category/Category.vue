<template>
  <div class="category">
      <nav-bar class="nav">
        <template v-slot:center>
          <div>商品分类</div>
        </template>
        </nav-bar>
         <div class="category-content">
          <category-menu :tab-menu="menu" @menuClick='menuClick'/>
          <div class="detail">
          <content-goods :categories='showSubCategory'></content-goods>
          <content-detail></content-detail>
          </div>
        </div>
        
        
  </div>
</template>

<script>
import navBar from 'components/common/navbar/NavBar'
import CategoryMenu from './childComps/CategoryMenu'
import ContentGoods from './childComps/ContentGoods'
import ContentDetail from './childComps/ContentDetail'

import scroll from 'components/common/scroll/Scroll'
import {getCategory,getSubCategory,getCategoryDetail} from 'network/category'
export default {
  name:'Category',
  components:{
    navBar,
    CategoryMenu,
    ContentGoods,
    ContentDetail,
    scroll
  },
  created(){
    //请求分类菜单数据
    this.getCategory()
  
  },
  data(){
    return {
      menu:[],
      // cateList:[],
      currenIndex:-1,
      categoryData:[]
      
    }
  },
  methods:{
    getCategory(){
      getCategory().then(res=>{
        this.menu = res.data.category.list;
        // console.log(this.menu);
        //初始化每一个分类数据结构
        for(let i=0;i<this.menu.length;i++){
          this.categoryData[i] = {
            subCategory:{}
          }
        }
        //获取第一个分类数据
        this.getSubCategory(0)
      });
       
    },
    getSubCategory(index){
      this.currentIndex = index
      const maitKey = this.menu[index].maitKey
      // console.log(maitKey);
      getSubCategory(maitKey).then(res=>{
        this.categoryData[index].subCategory = res.data
        this.categoryData = {...this.categoryData}
      })
    },
    menuClick(index){
      this.getSubCategory(index)

    }
  },
  computed:{
    showSubCategory() {
        if (this.currentIndex === -1) return {}
        console.log(this.currentIndex);
        return this.categoryData[this.currentIndex].subCategory.list
      },
  }

}
</script>

<style scoped>
.category-content{
display: flex;
width: 100%;
}
.nav{
  background-color: #FA7DA3;
  color: white;
}
.detail{
  width: 75%;
}

</style>