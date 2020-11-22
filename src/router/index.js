import Vue from 'vue'
import VueRouter from 'vue-router'
import SignInView from '@/views/SignInView'
import HomeView from '@/views/HomeView'
import ShopOrdersView from '@/views/shop/ShopOrdersView'
import ShopProductsView from '@/views/shop/ShopProductsView'
import ShopProductFormView from '@/views/shop/ShopProductFormView'
import AdsView from '@/views/admin/AdminAdsView'
import AdminOrdersView from '@/views/admin/AdminOrdersView'
import AdminProductsView from '@/views/admin/AdminProductsView'
import AdminUsersView from '@/views/admin/AdminUsersView'
import AdminShopsView from '@/views/admin/AdminShopsView'

Vue.use(VueRouter)

const routes = [
  {
    name: 'sign-in',
    path: '/sign-in',
    component: SignInView
  },
  {
    name: 'admin-home',
    path: '/admin',
    component: HomeView,
    children: [
      {
        path: '/admin/ads',
        component: AdsView
      },
      {
        path: '/admin/orders',
        component: AdminOrdersView
      },
      {
        path: '/admin/products',
        component: AdminProductsView
      },
      {
        path: '/admin/users',
        component: AdminUsersView
      },
      {
        path: '/admin/shops',
        component: AdminShopsView
      }
    ]
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
    next()
    // const isAdmin = localStorage.getItem('isAdmin')
    // if (isAdmin === 'true') {
    //   if (to.path.includes('/admin')) next()
    //   else next('/admin')
    // } else {
    //   if (to.path.includes('/shop')) next()
    //   else next('/shop')
    // }
  } else if (to.path === '/sign-in') {
    next()
  } else {
    next('/sign-in')
  }
})

export default router
