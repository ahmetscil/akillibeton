<template>
  <div class="asc_pariette-pagecard">
    <ParietteTable
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
      :create="createForm"
      :update="updateForm"
      :show-modal="true"
      :data-fields="dataFields"
      selection-label="id"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      pageApi: 'Measurement',
      tableHead: [],
      tableOperation: {},
      createForm: [],
      updateForm: [],
      dataFields: []
    }
  },
  computed: mapState(['storeData', 'returnCode']),
  watch: {
    'returnCode' (e) {
      switch (e) {
        case 202:
          this.$toast.add({ severity: 'success', summary: this.$t('general.success'), life: 3000 })
          setTimeout(() => {
            this.getData()
          }, 200)
          break
        case 203:
          this.$toast.add({ severity: 'success', summary: this.$t('general.updated'), life: 3000 })
          setTimeout(() => {
            this.getData()
          }, 200)
          break
        case 402:
          this.$toast.add({ severity: 'error', summary: this.$t('general.error'), life: 3000 })
          break
      }
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
      this.$store.dispatch('getLookup', { api: 'Lookup/statusList', label: 'statusList' })
      this.$store.dispatch('getLookup', { api: 'Sensors', label: 'sensorList' })
      this.$store.commit('setBreadcrumb', { active: this.$t('router.' + this.pageApi), items: { label: 'Akıllı Beton' } })
      this.$store.dispatch('getTableData', { link: apilink })
      this.tableOperation = {
        create: true,
        export: true,
        update: true,
        links: [
          { route: 'Uplink', query: '/', after: '?measurement=', afterLabel: 'id' }
        ]
      }
      this.dataFields = ['name', 'description', 'mix', 'sensor', 'max_temp', 'min_temp', 'last_temp', 'readed_max', 'readed_min', 'started_at', 'ended_at', 'deployed_at', 'last_data_at', 'created_at', 'updated_at']
      this.createForm = [
        { label: 'name', type: 'InputText' },
        { label: 'description', type: 'InputText' },
        { label: 'mix', type: 'Dropdown', option: 'mixList', selector: 'id' },
        { label: 'sensor', type: this.$route.query.sensor ? 'Hidden' : 'Dropdown', default: this.$route.query.sensor ? this.$route.query.sensor : null, option: 'sensorList', selector: 'id', val: 'title' },
        { label: 'max_temp', type: 'Temperature' },
        { label: 'min_temp', type: 'Temperature' },
        { label: 'last_temp', type: 'Temperature' },
        { label: 'readed_max', type: 'Temperature' },
        { label: 'readed_min', type: 'Temperature' },
        { label: 'started_at', type: 'Calendar' },
        { label: 'ended_at', type: 'Calendar' },
        { label: 'deployed_at', type: 'Calendar' }
      ]
      this.updateForm = [
        { label: 'name', type: 'InputText' },
        { label: 'description', type: 'InputText' },
        { label: 'max_temp', type: 'Temperature' },
        { label: 'min_temp', type: 'Temperature' },
        { label: 'last_temp', type: 'Temperature' },
        { label: 'readed_max', type: 'Temperature' },
        { label: 'readed_min', type: 'Temperature' },
        { label: 'started_at', type: 'Calendar' },
        { label: 'ended_at', type: 'Calendar' },
        { label: 'deployed_at', type: 'Calendar' },
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' }
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
