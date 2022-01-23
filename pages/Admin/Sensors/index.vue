<template>
  <div class="asc_pariette-pagecard">
    <Table
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
      :create="formData"
      :show-modal="false"
      :data-fields="dataFields"
      selection-label="DevEUI"
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
      pageApi: 'Sensors',
      tableHead: [],
      tableOperation: {},
      formData: [],
      dataFields: []
    }
  },
  computed: mapState(['lookup']),
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
      this.$store.dispatch('getTableData', { link: apilink })
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'sensor_no', label: this.$t('action.sensor_no'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'title', label: this.$t('action.title'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'DevEUI', label: this.$t('action.DevEUI'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'project', label: this.$t('action.project'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'type', label: this.$t('action.type'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
      this.tableOperation = {
        create: true,
        export: true,
        edit: true,
        links: [
          { route: 'Uplink', query: '/' }
        ]
      }
      this.dataFields = ['DevEUI', 'created_at', 'description', 'id', 'project', 'status', 'title', 'type', 'updated_at']
      this.formData = [
        { label: 'sensor_no', type: 'InputText' },
        { label: 'project', type: 'Dropdown', option: 'projectList', selector: 'id' },
        { label: 'DevEUI', type: 'InputText' },
        { label: 'title', type: 'InputText' },
        { label: 'type', type: 'Dropdown', option: 'sensorTypeList', selector: 'id', val: 'key' },
        { label: 'description', type: 'Textarea' }
      ]
      this.$store.dispatch('getState', { api: 'Projects/1', label: 'project' })
      this.$store.dispatch('getState', { api: 'Projects', label: 'projectList' })
      this.$store.dispatch('getLookup', { api: 'Lookup/sensorTypes', label: 'sensorTypeList' })
      setTimeout(() => {
        this.$store.commit('setBreadcrumb', { active: this.$t('router.' + this.pageApi), items: ['Akıllı Beton', this.lookup.project.title] })
      }, 1000)
    }
  }
}
</script>
