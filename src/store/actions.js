const actions={
    addToCart(context,payload){
      return new Promise((resolve,reject)=>{
        const oldProduct = context.state.cartList.find(item=>payload.iid===item.iid)
        if(oldProduct){
        context.commit('addCounter',oldProduct)
        resolve('当前商品数量+1')
        }else{
        context.commit('addGoods',payload)
        resolve('成功加入购物车')
        }
      })
      }
}
export default actions