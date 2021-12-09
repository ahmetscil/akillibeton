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
      pageApi: 'Users',
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
      this.$store.commit('setBreadcrumb', { active: this.pageApi, items: { label: this.pageApi } })
      this.$store.dispatch('getTableData', { link: this.pageApi })
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
        { label: 'name', type: 'InputText' },
        { label: 'phone', type: 'InputText' },
        { label: 'email', type: 'InputText' },
        { label: 'password', type: 'Password' }
      ]
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'name', label: this.$t('action.name'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'phone', label: this.$t('action.phone'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'email', label: this.$t('action.email'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
