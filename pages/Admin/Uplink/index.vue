<template>
  <div class="asc_pariette-pagecard">
    <Table
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
      :show-modal="true"
      :data-fields="dataFields"
      selection-label="DevEUI"
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
      },
      dataFields: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.commit('setBreadcrumb', { active: this.$t('router.' + this.pageApi), items: { label: 'Akıllı Beton' } })
      this.$store.dispatch('getTableData', { link: this.pageApi })
      this.dataFields = ['DevEUI', 'LrrRSSI', 'LrrSNR', 'created_at', 'id', 'maturity', 'measurement', 'payload_hex', 'strength', 'temperature', 'updated_at']
      this.tableHead = [
        { col: 'measurementName', label: this.$t('action.measurement'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'DevEUI', label: this.$t('action.DevEUI'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'LrrRSSI', label: this.$t('action.LrrRSSI'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'LrrSNR', label: this.$t('action.LrrSNR'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'maturity', label: this.$t('action.maturity'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'temperature', label: this.$t('action.temperature'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
