<template>
  <div class="asc_pariette-pagecard">
    <ParietteTable
      v-if="isShowTable"
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
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
      pageApi: 'Log',
      isShowTable: true,
      tableHead: [],
      tableOperation: {
        create: false,
        export: false,
        stop: false,
        actions: false,
        status: false,
        preview: false,
        update: false
      },
      dataFields: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.dispatch('getBreadcrumb', { query: 'where=log' })
      this.dataFields = ['name', 'email', 'ip', 'phone', 'photo', 'status', 'created_at', 'updated_at']
      this.tableHead = [

        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'companyName', label: this.$t('action.companyName'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'info', label: this.$t('action.info'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'operation', label: this.$t('action.operation'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'projectName', label: this.$t('action.projectName'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'userName', label: this.$t('action.userName'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
      setTimeout(() => {
        this.isShowTable = true
      }, 100)
    }
  }
}
</script>
