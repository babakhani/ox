<template>
  <div class="page-title-component d-flex flex-column flex-sm-row justify-content-between align-items-center w-100 mb-3">
    <div class="d-flex flex-row pb-3 pb-sm-0">
      <h2
        class="h4"
      >
        {{ title }}
      </h2>
      <slot name="status"></slot>
    </div>
    <v-spacer></v-spacer>
    <slot></slot>
  </div>
</template>

<script>
/**
 * @name pageTitle
 * @description Page title component for pages
 * @version 1.0.0
 * @property {string} [title] - title of page.
 */
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
