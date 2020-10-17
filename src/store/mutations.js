const mutations = {
    addCounter(state,payload){
        payload.count += 1
    },
    addGoods(state,payload){
        payload.count=1
        payload.checked=true
        state.cartList.push(payload)
    },
    checked(state,payload){
        payload.checked = !payload.checked
    }
}
export default mutations