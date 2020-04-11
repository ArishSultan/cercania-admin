<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
    origin="top right"
    transition="scale-transition"
    class="asd"
  >
    <template v-slot:activator="{ on }">
      <div class="app-bar-profile" v-on="on" />
    </template>

    <!--    <div class="profile-popup">-->
    <!--      <div style="padding: 10px">-->
    <!--        <div class="profile-popup__header">-->
    <!--          <div-->
    <!--            :style="{ 'background-image': `url(${user.image})` }"-->
    <!--            class="profile-popup__image"-->
    <!--          />-->
    <!--          <h1 class="profile-popup__name">{{ user.name }}</h1>-->
    <!--          <h2 class="profile-popup__username">{{ user.username }}</h2>-->
    <!--        </div>-->

    <!--        <div class="profile-popup__divider" />-->

    <!--        <div class="profile-popup__actions">-->
    <!--          <v-btn-->
    <!--            @click="signOut"-->
    <!--            style="padding: 5px;"-->
    <!--            class="google-material-btn"-->
    <!--            color="primary"-->
    <!--            text-->
    <!--            >Sign out</v-btn-->
    <!--          >-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </v-menu>
</template>

<script>
export default {
  name: 'AppBarProfile',

  data: () => ({
    user: {}
  }),

  mounted() {
    this.user = this.$auth.user
  },

  methods: {
    signOut() {
      this.$auth.logout().then(() => window.location.reload())
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar-profile {
  width: 32px;
  height: 32px;
  background: red;
  border-radius: 20px;
}

.profile-popup {
  width: 250px;
  background: white;
  border-radius: 8px;

  &__header {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  &__image {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-size: cover;
    background-color: dodgerblue;
  }

  &__name {
    color: #202124;
    font-size: 16px;
    padding-top: 10px;
    font-family: google-sans, sans-serif;
  }

  &__username {
    color: #5f6368;
    font-size: 14px;
    font-weight: normal;
  }

  &__divider {
    width: 100%;
    margin: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.14);
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
