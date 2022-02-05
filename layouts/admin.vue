<template>
  <div id="app_target" class="asc_pariette">
    <Toast position="top-right" />
    <ParietteHeader />
    <div :class="template.sidebar">
      <ParietteSidebar />
    </div>
    <div :class="template.main">
      <Nuxt />
    </div>
    <Sidebar :visible.sync="showSidebar" position="right" :show-close-icon="false">
      content
      <Button label="close" @click="close()" />
      <Button label="logout" @click="logout()" />
    </Sidebar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
  }),
  computed: mapState(['template', 'showSidebar']),
  mounted () {
  },
  methods: {
    async logout () {
      this.$store.commit('killLogin')
      if (process.browser) {
        await this.$auth.logout(
          localStorage.clear()
        )
      }
    },
    close () {
      this.$store.commit('setSidebar', false)
    }
  }
}
</script>
