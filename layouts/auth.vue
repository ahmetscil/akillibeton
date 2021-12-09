<template>
  <div id="app_target" class="asc_pariette">
    <div class="asc_pariette-auth">
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
<style lang="sass">
  .asc_pariette-auth-form
    position: fixed
    background: #f7f7f7
    height: 100vh
    width: 35vw
    right: 0
    top: 0
    padding: 5vh 2vw
</style>
