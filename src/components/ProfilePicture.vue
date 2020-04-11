<template>
  <div
    :style="
      `width: ${size}px; height: ${size}px;
      background: ${img ? `url(${img})` : 'dodgerblue'}`
    "
    class="profile-picture"
  >
    <div class="profile-picture__picker">
      <input
        ref="picker"
        type="file"
        accept=".jpg,.jpeg,.png"
        style="display: none;"
        @change="onFileSelection"
      />
      <v-btn elevation="0" fab x-small @click="$refs.picker.click()">
        <svg
          class="gb_nb"
          enable-background="new 0 0 24 24"
          focusable="false"
          height="26"
          viewBox="0 0 24 24"
          width="18"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14H4V7h16v12zM12 9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
          />
        </svg>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePicture',

  props: {
    size: {
      type: [String, Number],
      default: 86
    },

    image: {
      type: [Object, File],
      default: () => ({})
    }
  },

  data: () => ({
    img: '',
    localImage: {}
  }),

  mounted() {
    this.img = this.image.url || this.image
    this.localImage = {}
  },

  methods: {
    onFileSelection($event) {
      const file = $event.target.files[0]
      $event.target.value = ''

      this.img = URL.createObjectURL(file)

      this.$emit('selected', file);
    }
  }
}
</script>

<style scoped lang="scss">
.profile-picture {
  width: 86px;
  height: 86px;
  position: relative;
  border-radius: 50%;
  background: dodgerblue;
  border: 1px solid rgba(0, 0, 0, 0.14);
  margin-bottom: 10px;
  background-size: cover !important;

  &__picker {
    right: -5px;
    bottom: -5px;
    width: 37%;
    height: 37%;
    position: absolute;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    & > button {
      width: 72%;
      height: 72%;
      fill: #5f6368;
      box-shadow: 0 1px 1px 0 rgba(65, 69, 73, 0.3),
        0 1px 3px 1px rgba(65, 69, 73, 0.15) !important;

      &:hover {
        fill: #3367d6;
      }
    }
  }
}
</style>
