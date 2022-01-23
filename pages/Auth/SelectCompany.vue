<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <h1>
          {{ $t('general.selectCompany') }}
        </h1>
      </b-col>
      <b-col
        v-for="(site, s) in pleaseSelect"
        :key="'sites' + s"
        cols="12"
        md="4"
      >
        <div class="asc_pariette-card" @click="selectSite(site)">
          <h1>
            {{ site.title }}
          </h1>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
    }
  },
  computed: mapState(['pleaseSelect']),
  mounted () {
  },
  methods: {
    selectSite (e) {
      this.$store.commit('setStore', { company: e })
      this.$router.push(this.localeLocation({ name: 'Admin-Dashboard' }))
    }
  }
}
</script>
