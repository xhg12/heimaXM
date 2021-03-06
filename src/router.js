import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Welcome from './pages/Welcome.vue'
import Users from './pages/user/Users.vue'
import Rights from './pages/power/Rights.vue'
import Roles from './pages/power/Roles.vue'
import Cate from './pages/goods/Cate.vue'
import Params from './pages/goods/Params.vue'
import List from './pages/goods/List.vue'
import Add from './pages/goods/Add.vue'
import Order from './pages/order/Order.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: List },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Order }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   //to  将要访问的路径
//   //from  代表从哪个路径跳转而来
//   //next  是一个函数，表示放行
//   // next()   放行    next('/login')  强制跳转

//   if (to.path === '/login') return next()
//   //获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
