<template>
  <div class="images-list">
    <v-card class="images-list__picked-images">
      <image-view
        v-for="(image, i) of images_"
        :key="i"
        :source="image"
        :on-remove="removeImage"
        use-native-loading
        viewable
        class="picked-image"
      />

      <div v-if="images_.length === 0" class="images-list__empty">
        <p>No Images Attached</p>
      </div>
    </v-card>

    <div class="images-list__actions">
      <v-btn
        fab
        small
        color="green"
        dark
        elevation="5"
        @click="$refs.picker.click()"
      >
        <v-icon small>mdi-camera</v-icon>
      </v-btn>

      <div class="images-list__actions--spacer" />

      <v-btn
        fab
        small
        color="orange"
        dark
        elevation="5"
        @click="$refs.picker.click()"
      >
        <v-icon small>mdi-folder</v-icon>
      </v-btn>

      <input
        ref="picker"
        multiple
        type="file"
        accept="image/*"
        style="display: none;"
        @change="addImage"
      />
    </div>
  </div>
</template>

<script>
import ImageView from './ImageView'

export default {
  name: 'ImagesList',
  components: { ImageView },

  props: {
    images: { type: Array, default: () => [] }
  },

  data: () => ({ images_: [] }),

  mounted() {
    if (this.images) this.images_ = this.images.map(image => image)
  },

  methods: {
    removeImage($image) {
      const index = this.images_.indexOf($image)

      if (index > -1) this.images_.splice(index, 1)

      this.$emit('changed', this.images_)
      this.$emit('removed', $image)
    },

    addImage($event) {
      if ($event.target.files.length > 0) {
        for (let i = 0; i < $event.target.files.length; i++) {
          this.images_.push($event.target.files[i])
        }

        this.$emit('changed', this.images_)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.images-list {
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;

  &__picked-images {
    width: 100%;
    display: flex !important;
    height: 200px !important;
    padding-top: 15px !important;
    overflow-y: hidden !important;
    overflow-x: scroll !important;
    border-radius: 8px !important;
  }

  &__empty {
    top: 0 !important;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    position: absolute !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgba(grey, 0.2) !important;

    & > p {
      color: grey !important;
      font-weight: bold !important;
      padding-top: 20px !important;
      font-family: gilroy, serif !important;
    }
  }

  &__actions {
    width: 100% !important;
    display: flex !important;
    padding-top: 10px !important;
    padding-right: 5px !important;
    justify-content: flex-end !important;

    &--spacer {
      padding: 0 10px !important;
      display: inline-block !important;
    }
  }
}

.picked-image {
  height: 100%;
  margin: 0 5px;
  min-width: 185px;
  max-width: 185px;
  background: white;
  position: relative;
  display: inline-block;
  border-radius: 4px !important;
}
</style>
