<template>
  <form-layout>
    <form-firebase
      :updater="!isNew"
      :after-action="clearItem"
      :other-action="() => {}"
      :title="isNew ? 'Create New Product' : 'Update Product'"
      collection="products"
      :data="() => ({ 'product-type': product.productType, ...product })"
    >
      <v-text-field
        v-model="product.name"
        label="Product Name"
        outlined
        class="span--2"
      />

      <v-text-field
        v-model="product.price"
        label="Product Price"
        outlined
        suffix="CZK"
        dense
      />

      <v-text-field
        v-model="product.discount"
        label="Discount"
        type="number"
        outlined
        :rules="[
          v => {
            const num = +v

            return (num >= 0 && num <= 100) || 'Number must be between 0 - 100'
          }
        ]"
        dense
      >
        <template v-slot:append>
          <v-icon>mdi-percent</v-icon>
        </template>
      </v-text-field>

      <v-textarea
        v-model="product.detail"
        label="Product Details"
        outlined
        class="span--2"
      />

      <v-select
        v-model="product.category"
        outlined
        dense
        label="Category"
        :items="categories"
      />

      <v-select
        v-model="product.productType"
        :disabled="!product.category"
        outlined
        hint="Select Category to enable"
        persistent-hint
        dense
        :items="productTypes[product.category]"
        label="Product Type"
      />

      <images-list
        class="span--2"
        @uploaded="product.images.push($event)"
        @removed="product.images.splice($event, i)"
      />
    </form-firebase>
  </form-layout>
</template>

<script>
import FormLayout from '@/components/layouts/FormLayout'
import { Product } from '@/models/product'
import FormFirebase from '@/components/base/FormComponent'
import ImagesList from '@/components/ImagesList'

export default {
  name: 'ShopProductFormView',
  components: { ImagesList, FormFirebase, FormLayout },

  data: () => ({
    isNew: true,
    product: {},

    categories: Product.categories,
    productTypes: Product.productType
  }),

  mounted() {
    const shop = JSON.parse(localStorage.getItem('user'))
    let product = localStorage.getItem('__product' + this.$route.params.id)

    if (product) {
      this.isNew = false
      this.product = JSON.parse(product)
    } else {
      this.product = new Product({ shopId: shop.username })
    }
  },

  methods: {
    clearItem() {
      localStorage.delete('__product' + this.$route.params.id)
    }
  }
}
</script>
