<template>
  <v-card>
    <div class="header-row">
      <h2>Notifications</h2>
      <v-spacer />

      <v-btn
        color="primary"
        elevation="0"
        @click="dialog = true"
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
      dense
      :headers="columns"
      :loading="loading"
      :items="data"
      :search="search"
    >
      <template v-slot:item.time="{ item }">
        {{ format(item.time) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="sendNotification(item)">mdi-bell</v-icon>
        <v-icon small color="red" @click="deleteProd(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="550">
      <v-card>
        <form-firebase
          :go-back="false"
          :after-action="clearData"
          :data="parseData"
          collection="notifications"
          title="Create New Notification"
        >
          <v-text-field
            v-model="notificationTitle"
            label="Notification Title"
            :rules="[v => !!v || 'Title is required']"
            outlined
            class="span--2"
            dense
          />
          <v-textarea
            v-model="notificationMessage"
            :rules="[v => !!v || 'Message is required']"
            label="Notification Message"
            outlined
            class="span--2"
            dense
          />
        </form-firebase>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { firestore } from '@/firebase'
import FormFirebase from '@/components/base/FormComponent'

export default {
  name: 'AdminNotificationsView',
  components: { FormFirebase },
  data: () => ({
    dialog: false,
    search: '',
    columns: [
      {
        text: 'Title',
        value: 'title'
      },
      {
        text: 'Message',
        value: 'body'
      },
      {
        align: 'right',
        text: 'Actions',
        value: 'actions'
      }
    ],

    notificationTitle: '',
    notificationMessage: '',

    loading: false,
    shopId: null,
    data: []
  }),

  mounted() {
    this.loadData()
  },

  methods: {
    parseData() {
      return {
        title: this.notificationTitle,
        body: this.notificationMessage
      }
    },

    clearData() {
      this.dialog = false
      this.sendNotification({
        title: this.notificationTitle,
        body: this.notificationMessage
      })

      this.notificationMessage = this.notificationTitle = ''
    },

    sendNotification(item) {
      const headers = new Headers()
      headers.append('content-type', 'application/json')
      headers.append(
        'authorization',
        'key=AAAAR74OWhE:APA91bEWab7Ul4M1l3TRYrmqqZ5Pxh41Iguy--LZ6A4YJMIdqYppG0SrTiREozNXso1ZiYFJipi5tn5A9UGjGfcFsS8KnDkyT_DxmLUPV3neOIq876wz2UZ60LnC6Ze1AtxDmj6uELTk'
      )

      fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        body: JSON.stringify({
          to: '/topics/news',
          notification: {
            title: item.title,
            body: item.body
          }
        }),
        headers
      })
    },

    async deleteProd(item) {
      if (confirm('Are you sure?')) {
        await firestore
          .collection('notifications')
          .doc(item.id)
          .delete()

        await this.loadData()
      }
    },

    async loadData() {
      this.loading = true
      const data = await firestore.collection('notifications').get()
      this.loading = false

      this.data = data.docs.map(doc => {
        const data = doc.data()

        return {
          id: doc.id,
          title: data.title,
          body: data.body
        }
      })
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
  //padding-bottom: 10px
  border-bottom: 1px solid rgba(black, .15)
</style>
