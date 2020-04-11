<template>
  <FormFirebase
    :title="title"
    :subtitle="subtitle"
    :data="() => data__"
    :collection="collection"
    :other-action="submit"
  >
    <div class="span--2">
      <ProfilePicture
        size="130"
        :image="data.image"
        @selected="imageSelected($event)"
      />
    </div>
    <slot />
  </FormFirebase>
</template>

<script>
import ProfilePicture from './ProfilePicture'
import FormFirebase from './FormFirebase'
import { storage } from '../firebase'

export default {
  name: 'SingleImageFormFirebase',
  extends: FormFirebase,
  components: { FormFirebase, ProfilePicture },

  props: {
    data: {
      type: Function,
      default: () => ({})
    },

    image: {
      type: [File, Object]
    }
  },

  data: () => ({
    img: null,
    data__: null
  }),

  mounted() {
    this.data__ = this.data()
  },

  methods: {
    imageSelected(image) {
      if (image && image.url) {
        storage.ref('cercania-images/' + image.name).delete()
      }

      this.data__.image = image
    },

    async submit() {
      if (!this.data__.image.url) {
        try {
          /// Generate Name for Image File;
          const name = Date.now().toString()

          const task = await storage
            .ref('cercania-images/' + name)
            .put(this.data__.image)

          this.data__.image = {
            name: name,
            url: await task.ref.getDownloadURL()
          }
        } catch (ex) {
          throw new Error(ex.toString())
        }
      }
    }
  }
}
</script>

<style scoped>
.span--2 {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
