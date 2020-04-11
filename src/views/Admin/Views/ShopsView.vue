<template>
  <DataTableFirebase
    title="Shops"
    collection="shops"
    :headers="headers"
    add-route="/shops/add"
    can-edit
    can-add
    can-remove
  >
    <template v-slot:image="{ bind }">
      <div style="display: flex; align-items: center">
        <img
          :src="bind.image.url"
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
  name: 'ShopsView',
  components: { DataTableFirebase },

  data: () => ({
    headers: [
      { text: 'Image', value: 'image', width: 100 },
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Contact #', value: 'contact' },
      { text: 'Address', value: 'address' }
    ]
  })
}
</script>
