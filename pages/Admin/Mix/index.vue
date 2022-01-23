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
      pageApi: 'Mix',
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
      this.$store.dispatch('getState', { api: 'Projects', label: 'projectList' })
      this.$store.commit('setBreadcrumb', { active: this.$t('router.' + this.pageApi), items: { label: 'Akıllı Beton' } })
      this.$store.dispatch('getTableData', { link: apilink })
      this.tableOperation = {
        create: true,
        export: true,
        edit: true,
        links: [
          { route: 'MixCalibration', query: '?mix=' }
        ]
      }
      this.dataFields = ['a', 'activation_energy', 'b', 'created_at', 'description', 'id', 'project', 'status', 'temperature', 'title', 'updated_at', 'user']
      this.formData = [
        { label: 'project', type: 'Dropdown', option: 'projectList', selector: 'id' },
        { label: 'title', type: 'InputText' },
        { label: 'description', type: 'Textarea' },
        { label: 'activation_energy', type: 'Temperature' },
        { label: 'temperature', type: 'Temperature' },
        { label: 'a', type: 'InputText' },
        { label: 'b', type: 'InputText' }
      ]
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'title', label: this.$t('action.title'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'projectName', label: this.$t('action.projectName'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'activation_energy', label: this.$t('action.activation_energy'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'a', label: this.$t('action.a'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'b', label: this.$t('action.b'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'temperature', label: this.$t('action.temperature'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'userName', label: this.$t('action.userName'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
