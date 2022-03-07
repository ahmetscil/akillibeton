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
      isShowTable: true,
      pageApi: 'Sensors',
      tableHead: [],
      tableOperation: {},
      createForm: [],
      updateForm: [],
      dataFields: []
    }
  },
  computed: mapState(['lookup', 'storeData', 'returnCode', 'project']),
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
      if (this.$route.query.project) {
        this.$store.dispatch('getSingle', { api: `Projects/${this.$route.query.project}`, label: 'project' })
      }

      this.$store.dispatch('getLookup', { api: 'Lookup/statusList', label: 'statusList' })
      this.$store.dispatch('getLookup', { api: 'Lookup/sensorTypes', label: 'sensorTypeList' })
      this.$store.dispatch('getState', { api: 'Projects', label: 'projectList' })

      this.tableHead = [
        { col: 'projectName', label: this.$t('action.projectName'), type: 'InputText', filter: false, sortable: true, options: [] },
        { col: 'title', label: this.$t('action.title'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'DevEUI', label: this.$t('action.DevEUI'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'sensor_no', label: this.$t('action.sensor_no'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'type', label: this.$t('action.type'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
      this.tableOperation = {
        create: true,
        export: true,
        update: true,
        links: [
          { name: 'Measurement', route: '../Admin/Measurement', query: '?sensor=', after: null, afterLabel: null }
        ]
      }
      this.dataFields = ['DevEUI', 'created_at', 'description', 'id', 'project', 'status', 'title', 'type', 'updated_at']
      const snsrList = [
        { id: 1, key: 'sensor 1', value: '1' },
        { id: 2, key: 'sensor 2', value: '2' },
        { id: 3, key: 'sensor 3', value: '3' },
        { id: 4, key: 'sensor 4', value: '4' }
      ]
      this.createForm = [
        { label: 'project', type: this.$route.query.project ? 'Hidden' : 'Dropdown', default: this.$route.query.project ? this.$route.query.project : null, option: 'projectList', selector: 'id', val: 'title' },
        { label: 'title', type: 'InputText' },
        { label: 'DevEUI', type: 'InputText' },
        { label: 'sensor_no', type: 'Dropdown', option: snsrList, selector: 'value', static: true, val: 'value' },
        { label: 'type', type: 'Dropdown', option: this.lookup.sensorTypeList, selector: 'id', val: 'key' },
        { label: 'type', type: 'Hidden', default: 1 },
        { label: 'description', type: 'Textarea' }
      ]
      this.updateForm = [
        { label: 'project', type: 'Dropdown', option: 'projectList', selector: 'id', val: 'title' },
        { label: 'title', type: 'InputText' },
        { label: 'DevEUI', type: 'InputText' },
        { label: 'sensor_no', type: 'Dropdown', option: snsrList, selector: 'value', static: true },
        { label: 'type', type: 'Hidden', default: 1 },
        { label: 'description', type: 'Textarea' },
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' }
      ]
      this.$store.dispatch('getBreadcrumb', { query: `where=sensors${this.$route.query.project ? `&project=${this.$route.query.project}` : ''}` })
      setTimeout(() => {
        this.isShowTable = true
      }, 100)
    }
  }
}
</script>
