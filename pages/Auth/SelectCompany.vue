<template>
  <b-row>
    <b-col cols="12">
      <h1>
        {{ $t('general.selectCompany') }}
      </h1>
    </b-col>
    <b-col
      v-for="(companies, c) in pleaseSelect"
      :key="'cmp' + c"
      cols="12"
      @click="selectSite(companies)"
    >
      <div class="asc_pariette-auth-card pointer">
        <h2>
          {{ companies.companyTitle }}
        </h2>
        <h1>
          {{ companies.projectTitle }}
        </h1>
      </div>
    </b-col>
    <b-col cols="12">
      <div @click="logoutUser">
        logout
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'auth',
  middleware: 'authenticated',
  computed: mapState(['pleaseSelect']),
  methods: {
    async logoutUser () {
      this.$store.commit('killLogin')
      if (process.browser) {
        await this.$auth.logout(
          localStorage.clear()
        )
      }
    },
    selectSite (e) {
      this.$store.commit('setStore', { company: e })
      this.$router.push(this.localeLocation({ name: 'Admin-Dashboard' }))
    }
  }
}
</script>
