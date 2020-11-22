<template>
  <div class="images-list">
    <v-card class="images-list__picked-images">
      <extended-image-view
        v-for="(image, i) of temp"
        :key="image.id || image.name"
        :index="i"
        :source="image"
        use-native-loading
        @removed="remove(i)"
        @uploaded="$emit('uploaded', $event)"
        viewable
        class="picked-image"
        :folder="endpoint"
      />

      <div v-if="temp.length === 0" class="images-list__empty">
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
        @change="pickFile"
      />
    </div>
  </div>
</template>

<script>
import ExtendedImageView from '@/components/ExtendedImageView'
export default {
  components: { ExtendedImageView },

  props: {
    endpoint: {
      type: String,
      default: 'images'
    },
    images: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    temp: []
  }),

  mounted() {
    this.temp = [...this.images]
  },

  methods: {
    pickFile(event) {
      if (event.target.files.length > 0)
        this.temp.push(
          ...Object.values(event.target.files).map(file => ({ file }))
        )
    },

    remove(index) {
      this.temp.splice(index, 1)
      const _temp = this.temp
      this.temp = []
      this.temp = _temp
      this.$emit('changed', this.temp)
      this.$emit('removed', index)
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

<!--<script>-->
<!--import ImageView from './ImageView'-->

<!--export default {-->
<!--  name: 'ImagesList',-->
<!--  components: { ImageView },-->

<!--  props: {-->
<!--    folder: {-->
<!--      type: String,-->
<!--      default: 'images'-->
<!--    },-->

<!--    images: {-->
<!--      type: Array,-->
<!--      default: () => []-->
<!--    }-->
<!--  },-->

<!--  data: () => ({-->
<!--    temp: []-->
<!--  }),-->

<!--  mounted() {-->
<!--    if (this.images) this._images = this.images.map(image => image)-->
<!--  },-->

<!--  methods: {-->
<!--    removeImage($image) {-->
<!--      const index = this._images.indexOf($image)-->

<!--      if (index > -1) this._images.splice(index, 1)-->

<!--      this.$emit('changed', this._images)-->
<!--      this.$emit('removed', $image)-->
<!--    },-->

<!--    addImage($event) {-->
<!--      if ($event.target.files.length > 0) {-->
<!--        for (let i = 0; i < $event.target.files.length; i++) {-->
<!--          this.temp.push($event.target.files[i])-->
<!--        }-->

<!--        this.$emit('changed', this._images)-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
