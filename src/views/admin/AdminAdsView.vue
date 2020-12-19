<template>
  <div>
    <div
      v-if="loading"
      style="display: flex; align-items: center; justify-content: center; height: 90vh"
    >
      <v-progress-circular indeterminate color="primary" />
      <span style="padding-left: 20px">Loading Ads</span>
    </div>
    <div v-else>
      <div>
        Accessories Ads
        <images-list
          :images="ads1"
          @removed="removed('accessories-ads', $event)"
          @uploaded="newAd('accessories-ads', $event)"
        />
      </div>

      <div>
        Artesanía y artes Ads
        <images-list
          :images="ads2"
          @removed="removed('artesanía-y-artes-ads', $event)"
          @uploaded="newAd('artesanía-y-artes-ads', $event)"
        />
      </div>

      <div>
        Productos Cosmeticos Ads
        <images-list
          :images="ads3"
          @removed="removed('productos-cosmeticos-ads', $event)"
          @uploaded="newAd('productos-cosmeticos-ads', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ImagesList from '@/components/ImagesList'
import { firestore } from '@/firebase'
export default {
  name: 'AdsView',
  components: { ImagesList },

  data: () => ({
    loading: true,
    ads1: [],
    ads2: [],
    ads3: []
  }),

  mounted() {
    this.loadData()
  },

  methods: {
    async loadData() {
      this.loading = true
      this.ads1 = (
        await firestore.collection('accessories-ads').get()
      ).docs.map(doc => ({ id: doc.id, ...doc.data() }))
      this.ads2 = (
        await firestore.collection('artesanía-y-artes-ads').get()
      ).docs.map(doc => ({ id: doc.id, ...doc.data() }))
      this.ads3 = (
        await firestore.collection('productos-cosmeticos-ads').get()
      ).docs.map(doc => ({ id: doc.id, ...doc.data() }))
      this.loading = false
    },

    removed(collection, data) {
      firestore
        .collection(collection)
        .doc(data.data.id)
        .delete()
    },
    async newAd(collection, data) {
      const obj = await firestore.collection(collection).add(data.data)
      data.source[data.index] = { id: obj.id, ...data }
    }
  }
}
</script>

<style scoped></style>
