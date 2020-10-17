import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast' 
//图片懒加载 1.导入vue-lazyload插件
import vueLazyLoad from 'vue-lazyload'
Vue.use(toast)
//安装vue-lazyload插件，并传入参数
Vue.use(vueLazyLoad,{
  preLoad: 1,
  loading: require('assets/img/common/loading.png')
})
//解决移动端300毫秒延迟问题
const fastTick = require('fastclick')
fastTick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
