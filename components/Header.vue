<template>
  <div :class="template.header">
    <b-row>
      <b-col>
        <span v-if="template.showHides" class="asc_pariette-sitename-mobile">
          {{ siteInfo.name }}
        </span>
        <ul v-if="breadcrumb.items" class="asc_pariette-breadcrumb">
          <li v-for="(item, i) in breadcrumb.items" :key="'breadcrumb' + i" class="asc_pariette-breadcrumb-links">
            {{ item }}
          </li>
          <li class="asc_pariette-breadcrumb-active">
            {{ breadcrumb.active }}
          </li>
        </ul>
      </b-col>
      <b-col class="asc_pariette-header-operations">
        {{ userData.name }}
        <div class="asc_pariette-header-operations-opt" @click="hamburger()">
          <i class="pi pi-bars" />
        </div>
        <div class="asc_pariette-header-operations-opt" @click="logoutUser()">
          <i class="pi pi-sliders-h" />
        </div>
        <div class="asc_pariette-header-operations-opt">
          <i class="pi pi-user" @click="toggle" />
        </div>
      </b-col>
      <Menu ref="menu" :model="items" :popup="true" />
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    defaultIcon: 'far fa-circle',
    items: [
      {
        label: 'Logout',
        icon: 'pi pi-refresh',
        command: () => {
          this.logoutUser()
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 })
        }
      },
      {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        url: 'https://vuejs.org/'
      },
      {
        label: 'Router',
        icon: 'pi pi-upload',
        to: '/fileupload'
      }
    ]
  }),
  computed: mapState(['siteInfo', 'userData', 'breadcrumb', 'template']),
  mounted () {
    this.$store.commit('setUser')
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
    hamburger () {
      this.$store.commit('setLayout', !this.template.hamburger)
    },
    toggle (event) {
      this.$refs.menu.toggle(event)
    }
  }
}
</script>
<style lang="sass">
</style>
