<template>
  <b-row>
    <b-col cols="12">
      <h1>
        {{ $t('general.selectCompany') }}
      </h1>
    </b-col>
    <b-col cols="12" style="height: 63vh; overflow-x:hidden; overflow-y:auto">
      <div
        v-for="(company, c) in pleaseSelect"
        :key="'cmp' + c"
        class="asc_pariette-auth-card pointer"
        @click="selectSite(company)"
      >
        <h2>
          {{ company.companyTitle }}
        </h2>
        <h1>
          {{ company.projectTitle }}
        </h1>
      </div>
    </b-col>
    <b-col cols="12">
      <Button :label="$t('general.logout')" icon="pi pi-sign-out" class="p-button-warning p-button-sm" @click="logoutUser" />
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'auth',
  middleware: 'authenticated',
  computed: mapState(['pleaseSelect']),
  mounted () {
    this.$store.commit('getSelectSite')
  },
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
      this.$router.push(this.localeLocation({ name: 'Admin-Projects' }))
    }
  }
}
</script>
