<template>
  <div class="image-view">
    <main class="image-view__content">
      <div v-if="!uploaded" class="image-view__uploading">
        <div
          v-if="uploading"
          style="display: flex; width: 100%; height: 100%; align-items: center; justify-content: center"
        >
          <v-progress-circular
            size="50"
            style="position: absolute"
            color="#aaaaaa"
            :value="uploadProgress"
            :indeterminate="uploadProgress === 0"
          />
          <v-btn
            icon
            color="white"
            @click="cancelUpload"
            style="position: absolute"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </div>

        <v-btn
          v-else
          icon
          color="white"
          outlined
          large
          @click="upload(source.file)"
        >
          <v-icon>mdi-upload</v-icon>
        </v-btn>
      </div>

      <div v-else-if="src" class="image-view__actions">
        <v-btn icon outlined color="white" large @click="onRemove(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>

        <span v-if="viewable" style="padding: 0 8px" />

        <v-btn v-if="viewable" icon outlined color="white" large @click="view">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </div>

      <img :src="src" alt="Error in Image" class="image-view__content--image" />
    </main>

    <!--  Zoomed Image Viewer  TODO: Add here  -->
  </div>
</template>

<script>
import { storage } from '@/firebase'
import firebase from 'firebase'

export default {
  name: 'ExtendedImageView',
  props: {
    folder: {
      type: String,
      required: true
    },

    index: {
      type: Number,
      required: true
    },

    source: {
      type: [Object],
      required: true
    },

    viewable: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    src: '',
    ref: null,
    name: '',
    uploadedData: undefined,
    uploaded: true,
    uploading: false,
    uploadProgress: 0
  }),

  mounted() {
    if (!this.source) {
      return
    }

    if (this.source.file) {
      this.uploaded = false
    }

    if (this.uploaded) {
      this.src = this.source.url
      this.name = this.source.name
    } else {
      this.src = URL.createObjectURL(this.source.file)
      this.upload(this.source.file)
    }
  },

  methods: {
    cancelUpload() {
      if (this.ref) {
        this.ref.cancel()
        this.uploading = false
      }
    },

    upload(source) {
      this.uploading = true
      this.uploadProgress = 0
      const name = Date.now().toString()
      this.ref = storage.ref(this.folder + '/' + name).put(source)

      this.ref.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          this.uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        console.log,
        async () => {
          this.name = name
          this.uploaded = true
          this.uploading = false
          const url = await this.ref.snapshot.ref.getDownloadURL()
          this.uploadedData = { name, url }
          this.$emit('uploaded', this.uploadedData)
        }
      )
    },

    view() {},
    onRemove() {
      storage.ref(this.folder + '/' + this.name).delete()
      this.$emit('removed', this.uploadedData)
    }
  }
}
</script>

<style lang="sass" scoped>
.image-view
  display: flex !important
  overflow: hidden !important

  &__loader
    flex: 1 !important
    display: flex !important
    align-items: center !important
    justify-content: center !important
    background: rgba(0, 0, 0, 0.14)

  &__content
    width: 100% !important
    height: 100% !important
    position: relative !important

    &:hover
      & > .image-view__actions
        opacity: 1 !important

    &--image
      width: 100% !important
      height: 100% !important

      object-fit: cover !important

  &__uploading
    opacity: 1
    z-index: 100
    width: 100% !important
    height: 100% !important
    display: flex !important
    position: absolute !important
    align-items: center !important
    justify-content: center !important
    transition: 0.5s opacity !important
    background: rgba(0, 0, 0, 0.5) !important

    & > *
      position: absolute


  &__actions
    opacity: 0
    width: 100% !important
    height: 100% !important
    display: flex !important
    position: absolute !important
    align-items: center !important
    justify-content: center !important
    transition: 0.5s opacity !important
    background: rgba(0, 0, 0, 0.5) !important

.spacer
  padding: 0 5px
</style>
