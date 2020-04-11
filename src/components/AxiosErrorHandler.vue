<template>
  <v-dialog v-model="flag" max-width="350">
    <v-card v-if="error" class="axios-error-handler">
      <v-card-title class="axios-error-handler__title">
        <v-icon color="red">error</v-icon>
        <span>{{ parsedError.title }}</span>
      </v-card-title>

      <v-card-text class="axios-error-handler__detail">
        <p v-for="(detail, i) in parsedError.details" :key="i">{{ detail }}</p>
      </v-card-text>

      <v-card-actions class="axios-error-handler__status">
        <div
          v-if="parsedError.status !== 0"
          class="axios-error-handler__status--description"
        >
          <span class="axios-error-handler__status--type">{{
            parsedError.type
          }}</span>
          <v-spacer />
          <span class="axios-error-handler__status--code">
            Code: <span>{{ parsedError.status }}</span>
          </span>
        </div>
        <v-spacer />
        <v-btn color="primary" text @click="flag = null">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AxiosErrorHandler',

  props: {
    error: { type: Error, default: null }
  },

  data: () => ({
    flag: false,

    detail: {
      404: [
        'Server Responded with not found',
        'This is a client side error, Check the axios path again'
      ],
      401: [
        'You are Unauthorized',
        'Authorize yourself to access further features, in case of any problem contact the Expert'
      ],
      0: [
        'The Source was not found by Axios',
        'The Provided Server Address is not correct or the Server might not be running'
      ]
    }
  }),

  computed: {
    /**
     * This parses the Error Produced by Axios
     * to add a meaningful error message.
     *
     */
    parsedError() {
      let title, type
      let status = 0

      let filler = null
      if (this.error.response) {
        filler = this.error.response
      }

      if (filler) {
        title = filler.statusText
        status = filler.status

        if (status >= 400 && status < 500) {
          type = 'Client'
        } else {
          type = 'Server'
        }
      } else {
        title = 'Unknown Error Occurred'
      }

      const details = this.detail[status]

      return {
        title,
        type,
        status,
        details
      }
    }
  },

  watch: {
    error() {
      this.flag = this.error != null
    }
  }
}
</script>

<style lang="scss" scoped>
.axios-error-handler {
  &__title {
    font-size: 14px;
    padding-bottom: 0;
    margin-bottom: -5px;
  }

  &__detail {
    margin-top: 20px;
    font-size: 15px;
    padding-bottom: 0;
    margin-bottom: -20px;
  }

  &__status {
    &--type {
      font-size: 14px;
      font-weight: bold;
      padding-right: 7px;
      font-family: roboto-condensed, sans-serif;
    }

    &--code {
      font-size: 12px;
      font-family: roboto-condensed, sans-serif;
    }

    &--description {
      color: gray;
      display: flex;
      padding-left: 10px;
      align-items: center;
    }
  }
}
</style>
