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
      dataFields: ['DevEUI', 'created_at', 'description', 'id', 'project', 'status', 'title', 'type', 'sf', 'last_data_at', 'updated_at']
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
        { col: 'sf', label: this.$t('action.signal'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'last_data_at', label: this.$t('action.last_data_at'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
      this.tableOperation = {
        create: true,
        export: true,
        activePassive: true,
        update: true,
        links: [
          { name: 'Measurement', route: '../Admin/Measurement', query: '?sensor=', after: null, afterLabel: null }
        ]
      }
      // const snsrList = [
      //   { id: 1, key: 'sensor 1', value: '1' },
      //   { id: 2, key: 'sensor 2', value: '2' },
      //   { id: 3, key: 'sensor 3', value: '3' },
      //   { id: 4, key: 'sensor 4', value: '4' }
      // ]
      this.createForm = [
        { label: 'project', type: this.$route.query.project ? 'Hidden' : 'Dropdown', default: this.$route.query.project ? this.$route.query.project : null, option: 'projectList', selector: 'id', val: 'title' },
        { label: 'title', type: 'InputText' },
        { label: 'DevEUI', type: 'InputText' },
        { label: 'sf', type: 'InputText' },
        // { label: 'sensor_no', type: 'Dropdown', option: snsrList, selector: 'id', static: true, val: 'value' },
        // { label: 'type', type: 'Dropdown', required: false, option: 'sensorTypeList', selector: 'id', val: 'key' },
        { label: 'description', type: 'Textarea' }
      ]
      this.updateForm = [
        { label: 'project', type: this.$route.query.project ? 'Hidden' : 'Dropdown', default: this.$route.query.project ? this.$route.query.project : null, option: 'projectList', selector: 'id', val: 'title' },
        { label: 'title', type: 'InputText' },
        { label: 'DevEUI', type: 'InputText' },
        // { label: 'sensor_no', type: 'Dropdown', option: snsrList, selector: 'id', static: true, val: 'value' },
        // { label: 'type', type: 'Dropdown', required: false, option: 'sensorTypeList', selector: 'id', val: 'key' },
        { label: 'description', type: 'Textarea' },
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' },
        { col: 'last_data_at', label: this.$t('action.last_data_at'), type: 'Calendar', filter: true, sortable: true, options: [] }
      ]
      this.$store.dispatch('getBreadcrumb', { query: `where=sensors${this.$route.query.project ? `&project=${this.$route.query.project}` : ''}` })
      setTimeout(() => {
        this.isShowTable = true
      }, 100)
    }
  }
}
</script>
