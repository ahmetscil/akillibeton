<template>
  <div class="asc_pariette-pagecard">
    <Table
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
    />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      pageApi: 'Uplink',
      tableHead: [],
      tableOperation: {
        create: true,
        export: true,
        stop: false,
        actions: false,
        status: true,
        preview: true,
        edit: true
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.commit('setBreadcrumb', { active: this.pageApi, items: { label: this.pageApi } })
      this.$store.dispatch('getTableData', { link: this.pageApi })
      this.tableHead = [
        { col: 'DevEUI', label: this.$t('action.DevEUI'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'LrrRSSI', label: this.$t('action.LrrRSSI'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'LrrSNR', label: this.$t('action.LrrSNR'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'maturity', label: this.$t('action.maturity'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'measurement', label: this.$t('action.measurement'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'temperature', label: this.$t('action.temperature'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
