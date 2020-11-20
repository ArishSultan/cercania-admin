<template>
  <div class="center-children">
    <v-card class="card">
      <v-card-title style="text-align: center">Sign in</v-card-title>

      <div>
        <v-text-field v-model="username" label="Username" outlined dense />
        <v-text-field
          v-model="password"
          label="Password"
          outlined
          dense
          type="password"
        />
      </div>

      <v-card-actions style="float: right; margin-right: -8px">
        <v-btn color="primary" elevation="0" @click="signIn">Submit</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar" color="error">
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { AuthService } from '@/services/auth-service'

export default {
  name: 'SignInView',

  data: () => ({
    username: 'carmenwendell53@gmail.com',
    password: 'CarmenR-0987',

    snackbar: false,
    snackbarMessage: ''
  }),

  methods: {
    async signIn() {
      const resp = await AuthService.signIn(this.username, this.password)
      if (resp !== true) {
        this.snackbar = true
        this.snackbarMessage = resp
      } else {
        await this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.center-children
  height: 100vh
  background: linear-gradient(dodgerblue 40%, white 40%)

.card
  width: 400px
  margin-bottom: 70px
  padding: 20px 30px 20px 30px
</style>
