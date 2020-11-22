<template>
  <v-card>
    <div class="header-row">
      <h2>Users</h2>
      <v-spacer />

      <!--      <v-btn-->
      <!--        color="primary"-->
      <!--        elevation="0"-->
      <!--        @click="$router.push({ path: '/shop/products/new' })"-->
      <!--        style="border-radius: 8px; margin-right: 10px"-->
      <!--      >-->
      <!--        Add New-->
      <!--      </v-btn>-->

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
      <template v-slot:item.imageUrl="{ item }">
        <img
          :src="item.imageUrl"
          alt=""
          width="50"
          height="50"
          style="border-radius: 100px"
        />
      </template>

      <template v-slot:item.platform="{ item }">
        <v-icon v-if="item.platform === 'android'" color="green"
          >mdi-android</v-icon
        >
        <v-icon v-else>mdi-apple-ios</v-icon>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small color="green" @click="editProd(item)">mdi-pencil</v-icon>
        <v-icon small color="error" @click="deleteProd(item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { firestore } from '@/firebase'

export default {
  name: 'ShopProductsView',
  data: () => ({
    search: '',
    columns: [
      {
        width: 90,
        filterable: false,
        sortable: false,
        text: 'Image',
        value: 'imageUrl'
      },
      {
        width: 100,
        text: 'Name',
        value: 'name'
      },
      {
        width: 130,
        sortable: false,
        text: 'Device Platform',
        value: 'platform'
      },
      {
        width: 120,
        text: 'Username',
        value: 'username'
      },
      {
        width: 100,
        text: 'Actions',
        value: 'actions',
        align: 'right',
        sortable: false,
        filterable: false
      }
    ],

    loading: false,
    shopId: null,
    data: []
  }),

  mounted() {
    this.loadData()
  },

  methods: {
    editProd(item) {
      console.log(item)
    },

    async deleteProd(item) {
      if (confirm('Are you sure?')) {
        await firestore
          .collection('profiles')
          .doc(item.id)
          .delete()
        ;(await firestore.collection('shop-orders').get()).forEach(item => {
          firestore
            .collection('shop-orders')
            .doc(item.id)
            .delete()
        })

        await this.loadData()
      }
    },

    async loadData() {
      this.loading = true
      const data = await firestore.collection('profiles').get()
      this.loading = false

      this.data = data.docs.map(doc => {
        const data = doc.data()

        return {
          id: doc.id,
          name: data.name,
          imageUrl: data.imageUrl,
          platform: data.platform,
          username: data.username
        }
      })
      console.log(this.data)
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
  border-bottom: 1px solid rgba(black, .15)
</style>
