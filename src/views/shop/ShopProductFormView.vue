<template>
  <form-layout>
    <form-firebase :title="isNew ? 'Create New Product' : 'Update Product'">
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

      <v-select outlined dense label="Category" />
      <v-select
        :disabled="!product.category"
        outlined
        hint="Select Category to enable"
        persistent-hint
        dense
        label="Product Type"
      />

      <images-list class="span--2" />
    </form-firebase>
  </form-layout>
</template>

<script>
import FormLayout from '@/components/layouts/FormLayout'
import { Product } from '@/models/product'
import FormFirebase from '@/components/base/FormComponent'
import ImagesList from '@/components/ImagesList'

// category,
//     disabled,
//     images,
//     productType,

export default {
  name: 'ShopProductFormView',
  components: { ImagesList, FormFirebase, FormLayout },

  data: () => ({
    isNew: true,
    product: {}
  }),

  mounted() {
    const shop = JSON.parse(localStorage.getItem('user'))
    let product = localStorage.getItem('__product')

    if (product) {
      /// Update Product
    } else {
      /// Create New Product
      this.product = new Product({ shopId: shop.username })
    }
  }
}
</script>

<style lang="sass" scoped></style>
