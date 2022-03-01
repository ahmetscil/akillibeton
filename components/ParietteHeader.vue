<template>
  <div :class="template.header">
    <b-row>
      <b-col>
        <span v-if="template.showHides" class="asc_pariette-sitename-mobile">
          <img src="@/assets/akillibeton-dark.png" :alt="siteInfo.name">
        </span>
        <ul v-if="breadcrumb.items" class="asc_pariette-breadcrumb">
          <li v-for="(item, i) in breadcrumb.items" :key="'breadcrumb' + i" class="asc_pariette-breadcrumb-links">
            <router-link :to="item.route">
              <span v-if="item.locale">
                {{ item.title }}
              </span>
              <span v-else>
                {{ $t('router.' + item.title) }}
              </span>
            </router-link>
          </li>
          <li class="asc_pariette-breadcrumb-active">
            {{ $t('router.' + breadcrumb.active ) }}
          </li>
        </ul>
      </b-col>
      <b-col class="asc_pariette-header-operations">
        <div class="asc_pariette-header-operations-opt" @click="hamburger()">
          <i class="pi pi-bars" />
        </div>
        <div class="asc_pariette-header-operations-opt-nowidth" @click="showMenu(true)">
          <i class="pi pi-user" /> {{ userData.name }}
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    cities: [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ]
  }),
  computed: mapState(['siteInfo', 'userData', 'breadcrumb', 'template']),
  mounted () {
    this.$store.commit('setUser')
  },
  methods: {
    showMenu (e) {
      this.$store.commit('setSidebar', e)
    },
    hamburger () {
      this.$store.commit('setLayout', !this.template.hamburger)
    }
  }
}
</script>
<style lang="sass">
</style>
