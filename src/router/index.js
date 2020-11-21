import Vue from 'vue'
import VueRouter from 'vue-router'
import SignInView from '@/views/SignInView'
import HomeView from '@/views/HomeView'
import ShopOrdersView from '@/views/shop/ShopOrdersView'
import ShopProductsView from '@/views/shop/ShopProductsView'
import ShopProductFormView from '@/views/shop/ShopProductFormView'

Vue.use(VueRouter)

const routes = [
  {
    name: 'sign-in',
    path: '/sign-in',
    component: SignInView
  },
  {
    name: 'shop-home',
    path: '/shop',
    component: HomeView,
    props: {
      isAdmin: false
    },

    children: [
      {
        path: '/shop/orders',
        component: ShopOrdersView
      },
      {
        path: '/shop/products',
        component: ShopProductsView
      },
      {
        path: '/shop/products/edit'
        // component: ''
      }
    ]
  },
  {
    path: '/shop/products/new',
    component: ShopProductFormView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _, next) => {
  const user = localStorage.getItem('user')
  if (user) {
    const isAdmin = localStorage.getItem('isAdmin')
    if (isAdmin === 'true') {
      if (to.path.includes('/admin')) next()
      else next('/admin')
    } else {
      if (to.path.includes('/shop')) next()
      else next('/shop')
    }
  } else if (to.path === '/sign-in') {
    next()
  } else {
    next('/sign-in')
  }
})

export default router
