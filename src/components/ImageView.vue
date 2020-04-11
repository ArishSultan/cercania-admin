<template>
  <div class="image-view">
    <div v-if="loading" class="image-view__loader">
      <v-progress-circular indeterminate />
    </div>

    <main v-else class="image-view__content">
      <div v-if="onRemove || viewable" class="image-view__actions">
        <v-btn
          v-if="onRemove"
          icon
          outlined
          color="white"
          large
          @click="onRemove(source)"
        >
          <v-icon>delete</v-icon>
        </v-btn>

        <span v-if="onRemove && viewable" style="padding: 0 8px" />

        <v-btn v-if="viewable" icon outlined color="white" large @click="view">
          <v-icon>remove_red_eye</v-icon>
        </v-btn>
      </div>

      <img
        :src="image"
        alt="Error in Image"
        class="image-view__content--image"
      />
    </main>

    <!--  Zoomed Image Viewer  TODO: Add here  -->
  </div>
</template>

<script>
export default {
  name: 'ImageView',

  props: {
    source: { type: [String, Object], required: true },
    onRemove: { type: Function, default: null },
    viewable: { type: Boolean, default: () => false },
    useNativeLoading: { type: Boolean, default: () => false }
  },

  data: () => ({
    image: null,
    loading: true
  }),

  watch: {
    source() {
      this.resolve()
    }
  },

  mounted() {
    this.resolve()
  },

  methods: {
    async resolve() {
      let blob

      if (!this.useNativeLoading && typeof this.source === 'string') {
        const res = await this.$axios.$get(
          this.source.startsWith('http')
            ? this.source
            : `/images/${this.source}`,
          {
            responseType: 'blob'
          }
        )

        blob = new Blob([res.data])
      } else if (typeof this.source === 'object') {
        blob = this.source
        this.loading = false
      }

      if (blob) this.image = URL.createObjectURL(blob)
      else this.image = 'http://localhost:4000/images/' + this.source
      this.loading = false
    },

    view() {}
  }
}
</script>

<style lang="scss" scoped>
.image-view {
  display: flex !important;
  overflow: hidden !important;

  &__loader {
    flex: 1 !important;

    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    background: rgba(0, 0, 0, 0.14);
  }

  &__content {
    width: 100% !important;
    height: 100% !important;

    position: relative !important;

    &:hover {
      & > .image-view__actions {
        opacity: 1 !important;
      }
    }

    &--image {
      width: 100% !important;
      height: 100% !important;

      object-fit: cover !important;
    }
  }

  &__actions {
    opacity: 0;

    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    position: absolute !important;
    align-items: center !important;
    justify-content: center !important;
    transition: 0.5s opacity !important;
    background: rgba(0, 0, 0, 0.5) !important;
  }
}

.spacer {
  padding: 0 5px;
}
</style>
