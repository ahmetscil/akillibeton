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
      pageApi: 'Sensors',
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
      this.$store.dispatch('getState', { api: 'Projects', label: 'projectList' })
      this.$store.dispatch('getLookup', { api: 'Lookup/sensorTypes', label: 'sensorTypeList' })
      this.$store.commit('setBreadcrumb', { active: this.pageApi, items: { label: this.pageApi } })
      this.$store.dispatch('getTableData', { link: this.pageApi })
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'title', label: this.$t('action.title'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'DevEUI', label: this.$t('action.DevEUI'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'project', label: this.$t('action.project'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'type', label: this.$t('action.type'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
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
        { label: 'project', type: 'Dropdown', option: 'projectList', selector: 'id' },
        { label: 'DevEUI', type: 'InputText' },
        { label: 'title', type: 'InputText' },
        { label: 'type', type: 'Dropdown', option: 'sensorTypeList', selector: 'id', val: 'key' },
        { label: 'description', type: 'Textarea' }
      ]
    }
  }
}
</script>
