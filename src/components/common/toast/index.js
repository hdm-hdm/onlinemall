import Toast from './Toast'
const obj = {};
obj.install = function(Vue){
  //1.创建组件构造器
  const toastConstuctor = Vue.extend(Toast)
  //2.根据组件构造器，new一个组件对象
  const toast = new toastConstuctor()
  //3.将组件对象手动挂载到一个div
  toast.$mount(document.createElement('div'))
  //4.将组件.$el添加到DOM
  document.body.appendChild(toast.$el)
  //5.在Vue原型上保存$toast
  Vue.prototype.$toast = toast
}
export default obj