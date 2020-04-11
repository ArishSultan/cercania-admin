<template>
  <DataTableFirebase
    title="Products"
    collection="products"
    :headers="headers"
    can-remove
  >
    <template v-slot:images="{ bind }">
      <div style="display: flex; align-items: center">
        <img
          v-if="bind.images"
          :src="bind.images[0].url"
          alt="No Image"
          width="37"
          height="37"
          style="border-radius: 25px"
        />
      </div>
    </template>
  </DataTableFirebase>
</template>

<script>
import DataTableFirebase from '../../components/DataTableFirebase'

export default {
  name: 'ProductsView',
  components: { DataTableFirebase },

  data: () => ({
    headers: [
      { text: 'Image', value: 'images' },
      { text: 'Name', value: 'name' },
      { text: 'Price (GS)', value: 'price' },
      { text: 'Category', value: 'category' },
      { text: 'Type', value: 'product-type' },
      { text: 'Discount (%)', value: 'discount' },
      { text: 'Shop', value: 'shopId' }
    ]
  })
}
</script>
