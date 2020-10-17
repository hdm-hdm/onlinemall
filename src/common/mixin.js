export const imgLoadMixin = {


    mounted(){
        //防抖，防止图片加载后频繁刷新
        //this.$refs.scroll.refresh不加（），表示传入refresh这个函数
         const refresh = debounce(this.$refs.scroll.refresh,1000)
         //监听GoodsViewItem传过来的imgLoad事件，图片加载后刷新，重新计算scrollerHeight
         this.$bus.$on('imgLoad',()=>{
         refresh()
        })
      },
}
export const backTopMixin = {
    data:function(){
        return {
            isShow:false,
        }
    },
    methods:{
    topClick:function(){
        //*this.$refs.scroll拿到scroll组件，在scroll组件定义一个ref='scroll'属性
        this.$refs.scroll.scroll.scrollTo(0,0)
      },
    }
}