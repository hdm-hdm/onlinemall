const getters = {
  goodsList(state){
    return state.cartList
    },
  cartLength(state,getters){
    return getters.goodsList.length?getters.goodsList.filter(item=>item.checked).length:0
  },
  totalPrice(state,getters){
    return getters.goodsList.filter(item=>{return item.checked}).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
  }
}
export default getters