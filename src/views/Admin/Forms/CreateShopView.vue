<template>
  <FormLayout>
    <SingleImageFormFirebase
      title="Create new User"
      subtitle="provide required Shop details"
      collection="shops"
      :data="() => shop"
      :image="shop.image"
    >
      <v-text-field
        v-model="shop.name"
        label="Display Name"
        :rules="[(v) => !!v || 'Provide a Valid Name']"
        class="span--2"
        outlined
      />

      <v-text-field
        v-model="shop.contact"
        :rules="[(v) => !!v || 'Provide a valid Contact']"
        label="Contact #"
        outlined
      />

      <v-text-field
        v-model="shop.email"
        :rules="[(v) => !!v || 'Provide a valid Email']"
        label="Shop Email"
        outlined
      />

      <v-text-field
        v-model="shop['tag-line']"
        label="Shop Tag Line"
        class="span--2"
        outlined
      />

      <v-textarea
        v-model="shop.address"
        :rules="[(v) => !!v || 'Provide a Valid Address']"
        label="Shop Address"
        class="span--2"
        outlined
      />

      <v-text-field
        v-model="shop.username"
        label="Username or Login ID"
        :rules="[(v) => !!v || 'Provide a Valid Username']"
        class="span--2"
        outlined
      />

      <v-text-field
        v-model="shop.password"
        :rules="[(v) => !!v || 'Provide a Valid Password']"
        label="Password"
        outlined
      />

      <v-text-field
        label="Confirm Password"
        :rules="[(v) => v === shop.password || 'Passwords do not match']"
        outlined
      />
    </SingleImageFormFirebase>
  </FormLayout>
</template>

<script>
import { ShopModel } from '../../models/shop_model'
import FormLayout from '../../components/Layouts/FormLayout'
import SingleImageFormFirebase from '../../components/SingleImageFormFirebase'

export default {
  name: 'CreateShopView',
  components: {
    SingleImageFormFirebase,
    FormLayout
  },

  props: {
    shop: {
      type: ShopModel,
      default: () => new ShopModel()
    }
  },

  data: () => ({
    isUpdate: false
  }),

  mounted() {
    if (this.shop.id) this.isUpdate = true
  }
}
</script>

<style lang="scss" scoped>
.span--2 {
  display: flex;
  justify-content: center;

  &:first-of-type {
    margin-bottom: 20px;
  }
}
</style>
