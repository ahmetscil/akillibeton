<template>
  <div class="asc_pariette-pagecard">
    <ParietteTable
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
      :show-modal="false"
      responsive-layout="scroll"
      selection-label="id"
    />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      pageApi: 'Authority',
      tableHead: [],
      tableOperation: {
        create: false,
        export: true,
        stop: false,
        actions: false,
        status: false,
        preview: false,
        update: true
      },
      dataFields: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let apilink = 'Users'
      if (process.browser) {
        if (window.location.search) {
          apilink = 'Users' + window.location.search
        }
      }
      this.pageApi = apilink
      this.$store.commit('setBreadcrumb', { active: this.$t('router.Authority'), items: { label: 'Akıllı Beton' } })
      this.$store.dispatch('getLookup', { api: 'Lookup/crudList', label: 'crudList' })
      this.tableHead = [
        { col: 'userName', label: this.$t('action.userName'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'admin', label: this.$t('action.admin'), type: 'Switch', filter: true, sortable: true, options: [] },
        { col: 'boss', label: this.$t('action.boss'), type: 'Switch', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
