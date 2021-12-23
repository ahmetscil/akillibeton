<template>
  <div class="asc_pariette-pagecard">
    <Table
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
      :create="formData"
      :show-modal="false"
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
      pageApi: 'Measurement',
      tableHead: [],
      tableOperation: {},
      formData: [],
      dataFields: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let apilink = this.pageApi
      if (process.browser) {
        if (window.location.search) {
          apilink = this.pageApi + window.location.search
        }
      }

      this.$store.dispatch('getState', { api: 'Mix', label: 'mixList' })
      this.$store.dispatch('getState', { api: 'Sensors', label: 'sensorList' })
      this.$store.commit('setBreadcrumb', { active: this.pageApi, items: { label: this.pageApi } })
      this.$store.dispatch('getTableData', { link: apilink })
      this.tableOperation = {
        create: true,
        export: true,
        edit: true
      }
      this.dataFields = ['name', 'description', 'mix', 'sensor', 'max_temp', 'min_temp', 'last_temp', 'readed_max', 'readed_min', 'started_at', 'ended_at', 'deployed_at', 'last_data_at', 'created_at', 'updated_at']
      this.formData = [
        { label: 'name', type: 'InputText' },
        { label: 'description', type: 'InputText' },
        { label: 'mix', type: 'Dropdown', option: 'mixList', selector: 'id' },
        { label: 'sensor', type: 'Dropdown', option: 'sensorList', selector: 'id' },
        { label: 'max_temp', type: 'Temperature' },
        { label: 'min_temp', type: 'Temperature' },
        { label: 'last_temp', type: 'Temperature' },
        { label: 'readed_max', type: 'Temperature' },
        { label: 'readed_min', type: 'Temperature' },
        { label: 'started_at', type: 'Calendar' },
        { label: 'ended_at', type: 'Calendar' },
        { label: 'deployed_at', type: 'Calendar' },
        { label: 'last_data_at', type: 'Calendar' },
        { label: 'last_mail_sended_at', type: 'Calendar' }
      ]
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'name', label: this.$t('action.name'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'sensorsTitle', label: this.$t('action.sensorsTitle'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'mixTitle', label: this.$t('action.mixTitle'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'last_temp', label: this.$t('action.last_temp'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'max_temp', label: this.$t('action.max_temp'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'min_temp', label: this.$t('action.min_temp'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'readed_max', label: this.$t('action.readed_max'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'readed_min', label: this.$t('action.readed_min'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'started_at', label: this.$t('action.started_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'deployed_at', label: this.$t('action.deployed_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'ended_at', label: this.$t('action.ended_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'last_data_at', label: this.$t('action.last_data_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'last_mail_sended_at', label: this.$t('action.last_mail_sended_at'), type: 'Calendar', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
