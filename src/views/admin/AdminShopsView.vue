<template>
  <v-card>
    <div class="header-row">
      <h2>Shops</h2>
      <v-spacer />

      <v-btn
        color="primary"
        elevation="0"
        @click="$router.push({ path: '/admin/shops/new' })"
        style="border-radius: 8px; margin-right: 10px"
      >
        Add New
      </v-btn>

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
      <template v-slot:item.image="{ item }">
        <img
          v-if="item.image"
          :src="item.image.url"
          alt=""
          width="50"
          height="50"
          style="border-radius: 100px"
        />
        <p v-else style="color: grey">None</p>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small color="green" @click="editProd(item)">mdi-pencil</v-icon>
        <v-icon small color="error" @click="deleteProd(item)"
          >mdi-delete</v-icon
        >
      </template>

      <template v-slot:item.disabled="{ item }">
        <v-checkbox v-model="item.disabled" @change="disableShop(item)" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { firestore, storage } from '@/firebase'

export default {
  name: 'AdminShopsView',

  data: () => ({
    search: '',
    columns: [
      {
        width: 90,
        filterable: false,
        sortable: false,
        text: 'Image',
        value: 'image'
      },
      {
        width: 200,
        text: 'Name',
        value: 'name'
      },
      {
        width: 250,
        text: 'Tag Line',
        value: 'tag-line'
      },
      {
        width: 120,
        text: 'Username',
        value: 'username'
      },
      {
        width: 120,
        text: 'Email',
        value: 'email'
      },
      {
        width: 100,
        text: 'Is For Handicapped',
        value: 'is-for-handicapped'
      },
      {
        width: 140,
        text: 'Commission',
        value: 'commission'
      },
      {
        width: 250,
        text: 'Address',
        value: 'address'
      },
      {
        width: 120,
        text: 'Contact',
        value: 'contact'
      },
      {
        width: 100,
        text: 'Disabled',
        value: 'disabled'
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
    const user = JSON.parse(localStorage.getItem('user'))
    this.shopId = user.username

    this.loadData()
  },

  methods: {
    editProd(item) {
      localStorage.setItem('__shop' + item.id, JSON.stringify(item))
      this.$router.push({ path: `/admin/shops/${item.id}/edit` })
    },

    async deleteProd(item) {
      if (confirm('Are you sure?')) {
        await firestore
          .collection('shops')
          .doc(item.id)
          .delete()

        await storage.ref('images/' + item.image.name).delete()
        await this.loadData()
      }
    },

    disableShop(item) {
      firestore
        .collection('shops')
        .doc(item.id)
        .set(item)
    },

    async loadData() {
      this.loading = true
      const data = await firestore.collection('shops').get()
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

.search-row
  display: flex
  flex-direction: row
  padding: 0 15px 15px 15px
  border-bottom: 1px solid rgba(black, .15)
</style>
