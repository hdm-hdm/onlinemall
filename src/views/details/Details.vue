<template>
  <div id="detail">
     <detail-nav @navClick = "navClick" ref="nav"/>
     <scroll class='content' ref="scroll" @scroll="itemScroll" :probe-type="3">
     <detail-swiper :swiper-imgs="topImages"  @swiper-load='swiperLoad' ref="product"/>
     <detail-base-info :goods='goods'/>
     <detail-shop-info :shop='shop'/>
     <detail-info :detail-info='detailInfo' @imageLoad='imageLoad'/>
     <detail-param  :param-info='itemParams' ref="param"/>
     <detail-rate-info :comment-info='rate' ref="rate"/>
     <goods-view :goodslist="recommend" ref="recommend"/>
     </scroll>
     <back-top @click.native="topClick" :isShow="isShow"/>
     <detail-bottom-bar @addToCart ="addToCart"/>
  </div>
</template>

<script>
import detailNav from 'views/details/childComps/DetailNav'
import detailSwiper from 'views/details/childComps/DetailSwiper'
import detailBaseInfo from 'views/details/childComps/DetailBaseInfo'
import detailShopInfo from 'views/details/childComps/DetailShopInfo'
import detailParam from 'views/details/childComps/DetailParam'
import detailInfo from 'views/details/childComps/DetailInfo'
import detailRateInfo from 'views/details/childComps/DetailRateInfo'
import detailBottomBar from 'views/details/childComps/DetailBottomBar'

import scroll from 'components/common/scroll/Scroll'
import goodsView from 'components/content/goods/GoodsView'
import backTop from 'components/common/backtop/BackTop'
import {debounce} from 'src/common/util'
import {backTopMixin} from 'src/common/mixin'
import {getDetails,Goods,ItemParams,Shop,getRecommend} from 'network/details'
export default {
    name:'Details',
    components:{
         detailNav,
         detailSwiper,
         detailBaseInfo,
         detailShopInfo,
         detailParam,
         detailInfo,
         detailRateInfo,
         detailBottomBar,
         goodsView,
         backTop,
         scroll
    },
    mixins:[backTopMixin],
    data(){
        return {
            iid:'',
            datas:{},
            topImages:[],
            goods:{},
            itemParams:{},
            shop:{},
            detailInfo:{},
            rate:{},
            recommend:[],
            imgLoadListener:null,
            positionY:[],
            getPositionY:null,
            currentIndex:0,
            // isShow:false,
        }
    },
    created(){
        this.getDetails()
        this.getRecommend()
        this.getPositionY = debounce(()=>{
            this.positionY = []
            this.positionY.push(0)
            this.positionY.push(this.$refs.param.$el.offsetTop)
            this.positionY.push(this.$refs.rate.$el.offsetTop)
            this.positionY.push(this.$refs.recommend.$el.offsetTop)
            this.positionY.push(Number.MAX_VALUE)
            console.log(this.positionY);

        },2000)

    },
    mounted(){
        let refresh = debounce(this.$refs.scroll.refresh,500)
        this.imgLoadListener = ()=>{
            console.log('详情页刷');
            refresh()
        }
        this.$bus.$on('imgLoad',this.imgLoadListener)
    },
    destroyed(){
        this.$bus.$off('imgLoad',this.imgLoadListener)
    },
    methods:{
        getDetails(){
          this.iid = this.$route.params.id
          getDetails(this.iid).then(res=>{
              this.datas = res.result
              console.log(this.datas);
              //请求顶部轮播图
              this.topImages = this.datas.itemInfo.topImages;
              //请求商品信息
              this.goods = new Goods(this.datas.itemInfo,this.datas.columns,this.datas.shopInfo.services);
              //请求商品参数
              this.itemParams = new ItemParams(this.datas.itemParams.info,this.datas.itemParams.rule);
              //请求店铺信息..
              this.shop = new Shop(this.datas.shopInfo)
              //请求商品细节信息
              this. detailInfo = this.datas.detailInfo
              //请求评论信息
              this.rate = this.datas.rate.list?this.datas.rate.list[0]:{}
              //请求产品推荐信息
              //数据渲染过后回调$nextTick，但图片高度没有计算在内
            //   this.$nextTick(()=>{
            //       this.positionY.push(0)
            //       this.positionY.push(this.$refs.param.$el.offsetTop)
            //       this.positionY.push(this.$refs.rate.$el.offsetTop)
            //       this.positionY.push(this.$refs.recommend.$el.offsetTop)
            //       this.positionY.push(Number.MAX_VALUE)
            //       console.log(this.positionY);
            //   })
          })
        },
        getRecommend(){
            getRecommend().then(res=>{
                this.recommend = res.data.list
            })
        },
        swiperLoad(){
            this.$refs.scroll.refresh()
        },
        imageLoad(){
        const refresh = debounce(this.$refs.scroll.refresh,1000);
        refresh()
        this.getPositionY()
        },
        navClick(index){
            this.$refs.scroll.scroll.scrollTo(0,-(this.positionY[index]),100)
        },
    //      topClick(){
    //     //*this.$refs.scroll拿到scroll组件，在scroll组件定义一个ref='scroll'属性
    //     this.$refs.scroll.scroll.scrollTo(0,0)
    //   },
        itemScroll(position){
            //注意是position.y是负值，而positionY是正值，所以position.y做一个取反
            const y = -position.y
            this.isShow = y >1000
            for(let i=0;i<this.positionY.length-1;i++){
                //this.currentIndex!==i避免多次赋值
            if (this.currentIndex!==i&&(y>=this.positionY[i] && y<this.positionY[i+1])) {
                console.log(i);
                this.currentIndex=i
                this.$refs.nav.currentIndex = this.currentIndex
            }
            }

        },
        addToCart(){
            const cartGoods = {};
            cartGoods.image = this.topImages[0];
            cartGoods.title = this.goods.title;
            cartGoods.desc = this.goods.desc;
            cartGoods.price = this.goods.nowPrice;
            cartGoods.iid = this.iid;
            //向actions发送请求，actions可返回Promise
            this.$store.dispatch('addToCart',cartGoods).then(res=>{
                this.$toast.show(res,2000)
            })

        }

    },


}
</script>

<style scoped>
#detail{
    height: 100vh;
    position: relative;
    background-color: #fff;
    z-index: 9;
}
.content{
    height: calc(100% - 44px);
    overflow: hidden;
}
</style>