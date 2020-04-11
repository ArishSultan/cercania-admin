<template>
  <DataTableFirebase
    title="Users"
    collection="profiles"
    :headers="headers"
    can-remove
  >
    <template v-slot:imgUrl="{ bind }">
      <div style="display: flex; align-items: center">
        <img
          v-if="bind.imgUrl"
          :src="bind.imgUrl"
          alt="No Image"
          width="37"
          height="37"
          style="border-radius: 25px"
        />
        <em v-else style="color: #aaa">No Image</em>
      </div>
    </template>
  </DataTableFirebase>
</template>

<script>
import DataTableFirebase from '../../components/DataTableFirebase'

export default {
  name: 'UsersView',
  components: { DataTableFirebase },

  data: () => ({
    headers: [
      { text: 'Image', value: 'imgUrl', width: 100 },
      { text: 'Name', value: 'name' },
      { text: 'Username', value: 'username' }
    ]
  })
}
</script>
