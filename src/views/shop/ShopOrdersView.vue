<template>
  <v-card>
    <div class="header-row">
      <h2>Orders</h2>
      <v-spacer />

      <v-btn icon @click="loadData">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </div>

    <div class="search-row">
      <v-spacer />
      <div style="width: 300px">
        <v-text-field
          v-model="search"
          outlined
          dense
          label="Search"
          hide-details
          color="primary"
        >
          <template v-slot:append>
            <v-icon>mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </div>
    </div>

    <v-data-table
      :headers="columns"
      :loading="loading"
      :items="data"
      :search="search"
    >
      <template v-slot:item.status="{ item }">
        <v-edit-dialog
          :return-value.sync="item.status"
          @save="updateData(item)"
          @close="updateData(item)"
        >
          {{ item.status }}
          <template v-slot:input>
            <v-text-field
              v-model="item.status"
              label="Edit"
              single-line
              counter
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.time="{ item }">
        {{ format(item.time) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { firestore } from '@/firebase'
import firebase from 'firebase'

export default {
  name: 'ShopOrdersView',
  data: () => ({
    search: '',
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

    console.log(user)
    this.loadData()
  },

  methods: {
    async loadData() {
      this.loading = true
      const data = await firestore
        .collection('shop-orders')
        .where('shopId', '==', this.shopId)
        .get()
      this.loading = false

      this.data = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    updateData(item) {
      firestore
        .collection('shop-orders')
        .doc(item.id)
        .set(item)
    },

    format(time) {
      if (!time) return

      let date
      if (time.seconds) {
        date = new firebase.firestore.Timestamp(
          time.seconds,
          time.nanoseconds
        ).toDate()
      } else {
        date = time.toDate()
      }

      return Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date)
    }
  }
}
</script>

<style lang="sass" scoped>
.header-row
  display: flex
  padding: 10px 15px
  flex-direction: row

.search-row
  display: flex
  flex-direction: row
  padding: 0 15px 15px 15px
  //padding-bottom: 10px
  border-bottom: 1px solid rgba(black, .15)
</style>
