<template>
  <div id="app_target" class="asc_pariette">
    <Toast position="top-right" />
    <div class="asc_pariette-auth">
      <div class="asc_pariette-auth-form">
        <Nuxt />
      </div>
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
