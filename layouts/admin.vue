<template>
  <div id="app_target" class="asc_pariette">
    <Header />
    <div :class="template.sidebar">
      <Sidebar />
    </div>
    <div :class="template.main">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
  }),
  computed: mapState(['template']),
  mounted () {
  },
  methods: {
    async logoutUser () {
      this.$store.commit('killLogin')
      this.$store.commit('selectSite', [])
      if (process.browser) {
        await this.$auth.logout(
          localStorage.clear()
        )
      }
    }
  }
}
</script>
