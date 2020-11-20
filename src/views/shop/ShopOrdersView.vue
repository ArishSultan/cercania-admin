<template>
  <v-card>
    <div class="header-row">
      <h2>Orders</h2>
      <v-spacer />

      <v-btn icon @click="loadData">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </div>

    <v-data-table :headers="columns" :loading="loading" :items="data" />
  </v-card>
</template>

<script>
import { firestore } from '@/firebase'

export default {
  name: 'ShopOrdersView',
  data: () => ({
    columns: [
      {
        width: 100,
        text: 'Address',
        value: 'address'
      },
      {
        width: 150,
        text: 'Business Name',
        value: 'business-name'
      },
      {
        width: 120,
        text: 'Commission',
        value: 'commission'
      },
      {
        width: 100,
        text: 'Product',
        value: 'name'
      },
      {
        width: 100,
        text: 'Phone #',
        value: 'phone'
      },
      {
        width: 100,
        text: 'Price',
        value: 'price'
      },
      {
        width: 100,
        text: 'Quantity',
        value: 'quantity'
      },
      {
        width: 100,
        text: 'Status',
        value: 'status'
      },
      {
        width: 100,
        text: 'Time',
        value: 'time'
      },
      {
        width: 120,
        text: 'Customer',
        value: 'username'
      }
    ],

    loading: false,
    shopId: null,
    data: []
  }),

  mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.shopId = user.username

    this.loadData()
  },

  methods: {
    async loadData() {
      this.loading = true
      const data = await firestore
        .collection('orders')
        .where('shopId', '==', this.shopId)
        .get()
      this.loading = false

      this.data = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
  }
}
</script>

<style lang="sass" scoped>
.header-row
  display: flex
  padding: 10px 15px
  flex-direction: row
  border-bottom: 1px solid rgba(black, .15)
</style>
