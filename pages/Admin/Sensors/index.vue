<template>
  <div class="asc_pariette-pagecard">
    <ParietteTable
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
      :create="createForm"
      :update="updateForm"
      :show-modal="false"
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
      pageApi: 'Sensors',
      tableHead: [],
      tableOperation: {},
      createForm: [],
      updateForm: [],
      dataFields: []
    }
  },
  computed: mapState(['lookup', 'storeData', 'returnCode']),
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
        update: true,
        links: [
          { route: 'Measurement', query: '?sensor=', after: null, afterLabel: null }
        ]
      }
      this.dataFields = ['DevEUI', 'created_at', 'description', 'id', 'project', 'status', 'title', 'type', 'updated_at']
      this.createForm = [
        { label: 'sensor_no', type: 'InputText' },
        { label: 'project', type: 'Dropdown', option: 'projectList', selector: 'id' },
        { label: 'DevEUI', type: 'InputText' },
        { label: 'title', type: 'InputText' },
        { label: 'type', type: 'Dropdown', option: 'sensorTypeList', selector: 'id', val: 'key' },
        { label: 'description', type: 'Textarea' }
      ]
      this.updateForm = [
        { label: 'sensor_no', type: 'InputText' },
        { label: 'project', type: 'Dropdown', option: 'projectList', selector: 'id' },
        { label: 'DevEUI', type: 'InputText' },
        { label: 'title', type: 'InputText' },
        { label: 'type', type: 'Dropdown', option: 'sensorTypeList', selector: 'id', val: 'key' },
        { label: 'description', type: 'Textarea' },
        { label: 'status', type: 'Switch' }
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
