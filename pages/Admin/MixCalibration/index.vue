<template>
  <div class="asc_pariette-pagecard">
    <Table
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
      :create="formData"
      :show-modal="true"
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
      pageApi: 'MixCalibration',
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
      this.$store.commit('setBreadcrumb', { active: this.$t('router.' + this.pageApi), items: { label: 'Akıllı Beton' } })
      this.$store.dispatch('getTableData', { link: apilink })
      this.tableOperation = {
        create: true,
        export: true,
        stop: false,
        actions: false,
        status: true,
        preview: true,
        edit: true
      }
      this.dataFields = ['a', 'activation_energy', 'b', 'created_at', 'description', 'id', 'project', 'status', 'temperature', 'title', 'updated_at', 'user']
      this.formData = [
        { label: 'mix', type: 'InputNumber' },
        { label: 'days', type: 'InputNumber' },
        { label: 'strength', type: 'InputNumber' }
      ]
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'days', label: this.$t('action.days'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'strength', label: this.$t('action.strength'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
