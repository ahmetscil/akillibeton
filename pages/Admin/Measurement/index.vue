<template>
  <div class="asc_pariette-pagecard">
    <Table
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
      :create="formData"
    />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      pageApi: 'Measurement',
      tableHead: [],
      tableOperation: {},
      formData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.commit('setBreadcrumb', { active: this.pageApi, items: { label: this.pageApi } })
      this.$store.dispatch('getTableData', { link: this.pageApi })
      this.tableOperation = {
        create: true,
        export: true,
        stop: false,
        actions: false,
        status: true,
        preview: true,
        edit: true
      }
      this.formData = [
        { label: 'name', type: 'InputText' },
        { label: 'description', type: 'InputText' },
        { label: 'mix', type: 'InputNumber' },
        { label: 'sensor', type: 'InputText' },
        { label: 'max_temp', type: 'Temperature' },
        { label: 'min_temp', type: 'Temperature' },
        { label: 'last_temp', type: 'Temperature' },
        { label: 'readed_max', type: 'Temperature' },
        { label: 'readed_min', type: 'Temperature' },
        { label: 'started_at', type: 'Calendar' },
        { label: 'ended_at', type: 'Calendar' },
        { label: 'deployed_at', type: 'Calendar' },
        { label: 'last_data_at', type: 'Calendar' }
      ]
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'name', label: this.$t('action.name'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'sensorsTitle', label: this.$t('action.sensorsTitle'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'mixTitle', label: this.$t('action.mixTitle'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'last_temp', label: this.$t('action.last_temp'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'max_temp', label: this.$t('action.max_temp'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'min_temp', label: this.$t('action.min_temp'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'readed_max', label: this.$t('action.readed_max'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'readed_min', label: this.$t('action.readed_min'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'started_at', label: this.$t('action.started_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'deployed_at', label: this.$t('action.deployed_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'ended_at', label: this.$t('action.ended_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'last_data_at', label: this.$t('action.last_data_at'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
