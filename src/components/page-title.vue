<template>
  <div class="page-title-component d-flex flex-column flex-sm-row justify-content-between align-items-center w-100 mb-3">
      <h3>
        {{ title }}
      </h3>
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
