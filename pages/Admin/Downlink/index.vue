<template>
  <div class="asc_pariette-pagecard">
    <Table
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
      :show-modal="true"
      :data-fields="dataFields"
    />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      pageApi: 'Downlink',
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
      this.$store.commit('setBreadcrumb', { active: this.pageApi, items: { label: this.pageApi } })
      this.$store.dispatch('getTableData', { link: this.pageApi })
      this.dataFields = ['DevEUI', 'created_at', 'id', 'measurement', 'payload_hex', 'updated_at']
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'DevEUI', label: this.$t('action.DevEUI'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'measurement', label: this.$t('action.measurement'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'payload_hex', label: this.$t('action.payload_hex'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
