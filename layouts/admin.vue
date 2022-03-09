<template>
  <div id="app_target" class="asc_pariette">
    <ConfirmDialog />
    <Toast position="top-right" />
    <ParietteHeader />
    <div :class="template.sidebar">
      <ParietteSidebar />
    </div>
    <div :class="template.main">
      <Nuxt />
    </div>
    <Sidebar :visible.sync="showSidebar" position="right" :show-close-icon="false">
      <b-row>
        <b-col cols="10">
          {{ $t('general.selectCompany') }}
        </b-col>
        <b-col cols="2">
          <Button icon="pi pi-times" class="p-button-warning p-button-sm" @click="close()" />
        </b-col>
        <b-col cols="12" style="height: 75vh; overflow:auto">
          <div
            v-for="(companies, c) in pleaseSelect"
            :key="'cmp' + c"
            class="asc_pariette-auth-card pointer"
            @click="selectSite(companies)"
          >
            <h4>
              {{ companies.companyTitle }}
            </h4>
            <h3>
              {{ companies.projectTitle }}
            </h3>
          </div>
        </b-col>
        <b-col cols="12" class="text-center">
          <Button :label="$t('general.logout')" icon="pi pi-sign-out" class="p-button-warning p-button-sm" @click="logout()" />
        </b-col>
      </b-row>
    </Sidebar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
  }),
  computed: mapState(['template', 'showSidebar', 'pleaseSelect']),
  mounted () {
    this.$store.commit('getSelectSite')
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
    selectSite (e) {
      this.$store.commit('setStore', { company: e })
      this.$router.push(this.localeLocation({ name: 'Admin-Dashboard' }))
      if (process.browser) {
        location.reload()
      }
      this.close()
    },
    close () {
      this.$store.commit('setSidebar', false)
    }
  }
}
</script>
