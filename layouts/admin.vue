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
          {{ userData.name }}
        </b-col>
        <b-col cols="2">
          <Button icon="pi pi-times" class="p-button-warning p-button-sm" @click="close()" />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <h5>
            {{ $t('general.selectLang') }}
          </h5>
        </b-col>
        <b-col>
          <div
            v-for="(lang, c) in languages"
            :key="'lang' + c"
            class="pointer d-block mx-3"
            @click="setLang(lang.code)"
          >
            <p>
              <i :class="`fas fa-${lang.flag}`" /> {{ lang.title }}
            </p>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col cols="12">
          <h5>
            {{ $t('general.selectCompany') }}
          </h5>
        </b-col>
        <b-col cols="12" style="height: 58vh; overflow:auto;">
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
    languages: [
      { title: 'Türkçe', code: 'tr', flag: 'tr' },
      { title: 'English', code: 'en', flag: 'us' }
    ]
  }),
  computed: mapState(['template', 'userData', 'showSidebar', 'pleaseSelect']),
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
    setLang (e) {
      this.$i18n.setLocale(e)
    },
    selectSite (e) {
      this.$store.commit('setStore', { company: e })
      // this.$router.push(this.localeLocation({ name: 'Admin-Projects' }))
      if (process.browser) {
        setTimeout(() => {
          location.reload()
        }, 1000)
      }
      this.close()
    },
    close () {
      this.$store.commit('setSidebar', false)
    }
  }
}
</script>
