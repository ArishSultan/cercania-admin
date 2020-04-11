<template>
  <DataTableFirebase
    title="Notifications"
    collection="notifications"
    :headers="headers"
    can-add
  />
</template>

<script>
import DataTableFirebase from '../../components/DataTableFirebase'

export default {
  name: 'NotificationsView',
  components: { DataTableFirebase },

  data: () => ({
    headers: [
      { text: 'Notification Title', value: 'title' },
      { text: 'Notification Body', value: 'body' }
    ]
  })
}
</script>

<style scoped></style>
