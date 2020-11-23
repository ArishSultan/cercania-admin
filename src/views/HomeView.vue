<template>
  <div>
    <v-app-bar app dense color="primary" elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white" />
      <v-toolbar-title style="color: white">
        {{ isAdmin ? 'Admin' : 'Shop' }}
      </v-toolbar-title>

      <v-spacer />
      <app-bar-profile />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item
        dense
        v-for="(route, i) of routes"
        :key="i"
        @click="$router.push({ path: route.path })"
      >
        <v-list-item-icon>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ route.text }}</v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <v-container><router-view /></v-container>
    </v-main>
  </div>
</template>

<script>
import AppBarProfile from '@/components/AppBarProfile'
const shopRoutes = [
  {
    path: '/shop/orders',
    icon: 'mdi-cash-register',
    text: 'Orders'
  },
  {
    path: '/shop/products',
    icon: 'mdi-segment',
    text: 'Products'
  }
]

const adminRoutes = [
  {
    path: '/admin/ads',
    icon: 'mdi-cash',
    text: 'Ads'
  },
  {
    path: '/admin/products',
    icon: 'mdi-segment',
    text: 'Products'
  },
  {
    path: '/admin/shops',
    icon: 'mdi-warehouse',
    text: 'Shops'
  },
  {
    path: '/admin/orders',
    icon: 'mdi-cash-register',
    text: 'Orders'
  },
  {
    path: '/admin/users',
    icon: 'mdi-account-group',
    text: 'Users'
  }
]

export default {
  name: 'HomeView',
  components: { AppBarProfile },

  data: () => ({
    isAdmin: false,
    drawer: false,
    routes: []
  }),

  mounted() {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true'

    if (this.isAdmin) {
      this.routes = adminRoutes
    } else {
      this.routes = shopRoutes
    }
  }
}
</script>

<style scoped></style>
