import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home'
const Category = ()=>import('../views/category/Category')
const Cart = ()=>import('../views/cart/Cart')
const Profile = ()=>import('../views/profile/Profile')
const Details = ()=>import('../views/details/Details')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path:'/details/:id',
    name:'Details',
    component:Details
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
