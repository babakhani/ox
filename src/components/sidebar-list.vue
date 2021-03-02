<template>
  <div class="sidebar-list-component">
    <v-list dense>
      <v-list-item
        v-for="(item, index) in innerItems"
        :key="'sidebar-list-item-' + index"
        link
        exact
        :to="item.path"
        >
        <v-list-item-action>
          <v-icon> {{ item.iconName }} </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title> {{ item.title }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
/**
 * @name sidebarList
 * @description Simple sidebar list with dynamic item rendering
 * @version 1.0.0
 * @property {Object[]} [items=pages] - The elements of list.
 * @property {string} items[].title - The title of element.
 * @property {string} items[].iconName - The icon name of element (just mdi supported).
 * @property {string} items[].path - The route path of element.
 */
export default {
  name: 'SidebarList',
  props: {
    items: {
      type: [Boolean, Array],
      default: null,
      required: false
    }
  },
  computed: {
    innerItems () {
      let out
      if (this.item) {
        out = this.item
      } else {
        const routes = this.$router.options.routes[0]
        const visibleRoutes = routes.children
          .filter(route => route.meta.isVisible || !('isVisible' in route.meta))
          .filter((route) => {
            if (route.meta.workspaces) {
              return route.meta.workspaces.includes(this.$store.state.workspace.workspace)
            } else {
              return true
            }
          })
          .filter((route) => {
            if (route.meta.roles) {
              return route.meta.roles.includes(this.$store.state.layout.profile.role)
            } else {
              return true
            }
          })

        visibleRoutes.sort((a, b) => a.meta.order < b.meta.order ? -1 : 1)

        out = visibleRoutes.map(route => ({
          title: this.$vuetify.lang.t(`$vuetify.pages.${route.name}.title`),
          path: `${routes.path}${route.path}`,
          iconName: route.meta.iconName
        }))
      }
      return out
    }
  }
}
</script>
