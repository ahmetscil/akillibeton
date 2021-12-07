<template>
  <div class="asc_pariette-pagecard">
    <Table
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
    />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      pageApi: 'Uplink',
      tableHead: [],
      tableOperation: {
        create: true,
        export: true,
        stop: false,
        actions: false,
        status: true,
        preview: true,
        edit: true
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.commit('setBreadcrumb', { active: this.pageApi, items: { label: this.pageApi } })
      this.$store.dispatch('getTableData', { link: this.pageApi })
      this.tableHead = [
        { col: 'sku', label: this.$t('action.sku'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'title', label: this.$t('action.title'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'available', label: this.$t('action.available'), type: 'Dropdown', filter: true, sortable: true, options: [] },
        { col: 'sale_price', label: this.$t('action.sale_price'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'stock', label: this.$t('action.stock'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'Dropdown', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
