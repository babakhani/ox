<template>
  <div
    class="text-center"
    fluid
  >
    <v-avatar
      size="115"
    >
      <img
        :src="avatar"
        :alt="name"
      >
    </v-avatar>
    <h3
      class="mt-4"
    >
      {{ name }}
    </h3>
    <p
      class="grey--text pt-2 pb-0 mb-2 email"
    >
      {{ email }}
    </p>
    <p
      class="grey--text description"
    >
      {{ description }}
    </p>
  </div>
</template>
<script>
/**
 * @name Member info component
 * @description To display user profile basic information
 * @version [1.0.0]
 * @property [
     {String} avatar - To display avatar,
     {String} name - diplay name,
     {String} email - display email,
     {String} description - display description,
   ]
 * @note: Replace [*] with new data and keep this comment above all components, for more information please
 follow https://jsdoc.app/index.html
 * @note To write document about props, methods and events you could use jsdoc.
 */

export default {
  name: 'MemberInfo',
  props: {
    avatar: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    }
  }
}
</script>
