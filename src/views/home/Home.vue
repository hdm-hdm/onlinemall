<template>
  <div id="home">
     <nav-bar class="v-center">
       <template v-slot:left>
       </template>
       <template v-slot:center>
         <div>购物商场</div>
       </template>
       <template v-slot:right>
       </template>
     </nav-bar>
     <tab-control 
     :details="['流行','新款','精品']" 
     @controlClick="controlClick"
      ref="tabcontrol1" class="tabcontrol1" v-show="isFixed">
      </tab-control>
    <scroll class="content" 
    :probe-type='3' 
    :pull-up='true'
    @scroll="itemScroll"
    @pullingUp="itemPull"
    ref="scroll">
     <home-swiper 
     :banners='banners' 
     @swiperLoad='swiperLoad'/>
     <recommend-view :recommends='recommends' @recommendLoad="recommendLoad"/>
     <feature-view @featureLoad="featureLoad"/>
     <tab-control 
     :details="['流行','新款','精品']" 
     @controlClick="controlClick"
     ref="tabcontrol2"
     :class="{fixed:isFixed}"/>
     <goods-view :goodslist="showGoods" class="goods"/>
    </scroll>
    <back-top @click.native="topClick" :isShow="isShow"/>
  </div>
</template>

<script>
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import RecommendView from 'views/home/childComps/RecommendView'
import FeatureView from 'views/home/childComps/FeatureView'

import navBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import goodsView from 'components/content/goods/GoodsView'
import scroll from 'components/common/scroll/Scroll'
import backTop from 'components/common/backtop/BackTop'

import {debounce} from 'src/common/util'
import {backTopMixin} from 'src/common/mixin'
import {getMultidata,getGoodsData} from 'network/home'
export default {
components:{
  navBar,
 HomeSwiper,
 RecommendView,
 FeatureView,
 TabControl,
 goodsView,
 scroll,
 backTop
},
mixins:[backTopMixin],
created(){
  this.getMultidata()
  this.getGoodsData('pop')
  this.getGoodsData('new')
  this.getGoodsData('sell')
},
//进入HOME时，还原离开时的位置
activated(){
this.$refs.scroll.refresh()
this.$refs.scroll.scroll.scrollTo(0,this.scrollY,0)
},
//记录离开HOME时的位置(加了keep-alive在deactivated()中记录)
deactivated(){
  this.scrollY = this.$refs.scroll.getScrollY()
  console.log('离开首页');
   this.$bus.$off('imgLoad', this.imgLoadRefresh)
},
mounted(){
  //防抖，防止图片加载后频繁刷新
  //this.$refs.scroll.refresh不加（），表示传入refresh这个函数
   const refresh = debounce(this.$refs.scroll.refresh,500)
   this.imgLoadRefresh = ()=>{
     console.log('主页刷新');
   refresh()
  }
   //监听GoodsViewItem传过来的imgLoad事件，图片加载后刷新，重新计算scrollerHeight
   this.$bus.$on('imgLoad', this.imgLoadRefresh)
},
methods:{
  getMultidata(){
    getMultidata().then(res=>{
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
      // console.log(this.banners);
      // console.log(this.recommends);
    })
  },
  getGoodsData(type){
    const page=this.goods[type].page+1
    getGoodsData(type,page).then(res=>{
     this.goods[type].list.push(...res.data.list)
     this.goods[type].page += 1
//获取数据后，调用finishPullUp()允许多次下拉加载
     this.$refs.scroll.finishPullUp()
    //  console.log(this.goods[type].list);
    //获取数据后刷新，重新计算有图片内容的高度
    // this.$refs.scroll.scroll.refresh()
     
    })
  },
  controlClick(index){
    console.log(index)
    //tab-control组件被点击，将被点击的item的index通过$emit传到父组件
    //通过传过来的index确定当前类型
    switch(index){
      case 0:
        this.currentType='pop'
        break
      case 1:
        this.currentType='new'
        break
      case 2:
        this.currentType='sell'
        break
    }
    this.$refs.tabcontrol1.currentIndex = index
    this.$refs.tabcontrol2.currentIndex = index
    this.$refs.scroll.scroll.scrollTo(0,-(this.tabOffsetTop),1000)
  },
  //position是scroll监听‘scroll’事件的回调函数的参数，返回滑动的位置
  itemScroll(position){
    // console.log(position);
    //(-position.y) 记住加-和.y
    this.isShow = (-position.y) >1000
    this.isFixed = (-position.y)>this.tabOffsetTop
  },
  //下拉到底，
  itemPull(){
    // console.log('加载更多');
  //加载下一页数据
    this.getGoodsData(this.currentType)
  },
  //点击back图标，调用scroll的scrollTo(0,0，time)方法回到原始位置
  // topClick(){
  //   //*this.$refs.scroll拿到scroll组件，在scroll组件定义一个ref='scroll'属性
  //   this.$refs.scroll.scroll.scrollTo(0,0)
  // },
  swiperLoad(){
    //1.获取tab-control的tabOffsetTop
    
    this.tabOffsetTop=this.$refs.tabcontrol2.$el.offsetTop
    console.log(this.tabOffsetTop);
  },
  featureLoad(){
  this.$refs.scroll.refresh()
  },
  recommendLoad(){
    this.$refs.scroll.refresh()
  }



},
data(){
  return {
    banners:[],
     recommends: [],
    //  isShow:false,
     goods:{
        'pop':{page:0,list:[]},
        'sell':{page:0,list:[]},
        'new':{page:0,list:[]}
     },
     //记录当前状态
     currentType:'pop',
     tabOffsetTop:0,
     isFixed:false,
     scrollY:0,
     imgLoadRefresh:null
    

  }
},
computed:{
  showGoods(){
    return this.goods[this.currentType].list
  }
}
}
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
  font-size: 22px;
}
.v-center{
  width: 100%;
  /* 使用BS之后，navbar不用设为fixed，因为BS的content在在局部内滑动，原生滚动navbar会跟着一起滚动，才需要navbar脱标 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  color:#fff;
  background-color: #FA7DA3;
  box-shadow: 0 1 3 rgba(243,243,243,.2);
  font-size: 16px;
  /* z-index: 9; */
}
/* .tab-control{ */
/* 粘合定位   滑动一段距离，sticky变为fixed  有兼容问题*/
/* 在使用better-scroll后，position: sticky布局不起作用 */
  /* position: sticky;
  background-color: #fff;
  top: 44px;
  z-index: 9; */
/* } */
.content{
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
  /* height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px; */
}
.tabcontrol1{
  /* bs内部机制的问题，滑动改变的是transform属性值，定位设为fixed，transform改变，组件也会跟着移动 */
  /* position: fixed;
  top: 44px; */
  /* relative 不改变原来位置，紧挨navbar，设置层级9，再配合v-show使用 */
  position: relative;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: #fff;
}
.fixed{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;

}

</style>