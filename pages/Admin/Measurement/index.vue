<template>
  <div class="asc_pariette-pagecard">
    <ParietteTable
      v-if="isShowTable"
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
      isShowTable: true,
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
          break
        case 203:
          this.$toast.add({ severity: 'success', summary: this.$t('general.updated'), life: 3000 })
          break
        case 402:
          this.$toast.add({ severity: 'error', summary: this.$t('general.error'), life: 3000 })
          break
      }
    },
    '$route' () {
      this.isShowTable = false
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let q = ''
      let mixListQ = 'Mix'
      let sensorListQ = 'Sensors'
      if (this.$route.query.sensor) {
        q = `&sensor=${this.$route.query.sensor}`
      } else if (this.$route.query.project) {
        q = `&project=${this.$route.query.project}`
        sensorListQ = `Sensors?project=${this.$route.query.project}`
        mixListQ = `Mix?project=${this.$route.query.project}`
      } else {
        q = ''
      }

      this.$store.dispatch('getState', { api: mixListQ, label: 'mixList' })
      this.$store.dispatch('getLookup', { api: 'Lookup/statusList', label: 'statusList' })
      this.$store.dispatch('getLookup', { api: sensorListQ, label: 'sensorList' })
      this.$store.dispatch('getBreadcrumb', { query: `where=measurement${q}` })
      this.tableOperation = {
        create: true,
        export: true,
        update: true,
        activePassive: true,
        links: [
          { name: 'Uplink', lang: 'data', route: '../Admin/Uplink', query: '/', after: '?measurement=', afterLabel: 'id' }
        ]
      }
      this.dataFields = ['name', 'description', 'mix', 'sensor', 'max_maturity', 'max_temp', 'min_temp', 'last_temp', 'readed_max', 'readed_min', 'started_at', 'ended_at', 'deployed_at', 'last_data_at', 'created_at', 'updated_at']
      this.createForm = [
        { label: 'name', type: 'InputText' },
        { label: 'description', type: 'InputText' },
        { label: 'mix', type: 'Dropdown', option: 'mixList', selector: 'id' },
        { label: 'sensor', type: this.$route.query.sensor ? 'Hidden' : 'Dropdown', default: this.$route.query.sensor ? this.$route.query.sensor : null, option: 'sensorList', selector: 'id', val: 'title' },
        { label: 'sensor_no', type: 'Dropdown', default: 0, option: 'sensorList', selector: 'id', val: 'title' },
        { label: 'max_maturity', type: 'Temperature' },
        { label: 'max_temp', type: 'Temperature' },
        { label: 'min_temp', type: 'Temperature' },
        { label: 'started_at', type: 'Calendar' },
        { label: 'deployed_at', type: 'Calendar' }
      ]
      this.updateForm = [
        { label: 'name', type: 'InputText' },
        { label: 'description', type: 'InputText' },
        { label: 'sensor_no', type: 'Dropdown', option: 'sensorList', selector: 'id', static: true, val: 'title' },
        { label: 'max_maturity', type: 'Temperature' },
        { label: 'max_temp', type: 'Temperature' },
        { label: 'min_temp', type: 'Temperature' },
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' }
      ]
      this.tableHead = [
        { col: 'projectName', label: this.$t('action.projectName'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'name', label: this.$t('action.name'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'sensorsTitle', label: this.$t('action.sensorsTitle'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'sensor_no', label: this.$t('action.probe_no'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'mixTitle', label: this.$t('action.mixTitle'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'last_temp', label: this.$t('action.last_temp'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'readed_max', label: this.$t('action.readed_max'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'readed_min', label: this.$t('action.readed_min'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'sf', label: this.$t('action.signal'), type: 'InputText', filter: false, sortable: true, options: [] },
        { col: 'started_at', label: this.$t('action.started_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'deployed_at', label: this.$t('action.deployed_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'ended_at', label: this.$t('action.ended_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'last_data_at', label: this.$t('action.last_data_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'created_at', label: this.$t('action.created_at'), type: 'Calendar', filter: true, sortable: true, options: [] }
      ]
      setTimeout(() => {
        this.isShowTable = true
      }, 100)
    }
  }
}
</script>
