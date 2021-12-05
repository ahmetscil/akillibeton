<template>
  <div class="asc_pariette-pagecard">
    <Table
      v-if="tableData.products"
      :items="tableData.products.data"
      :head="tableHead"
      :operation="tableOperation"
      :api="tableApi"
    />
    <Loader v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      tableHead: [],
      tableApi: '',
      tableOperation: {
        stop: false,
        actions: false,
        status: true,
        preview: true,
        edit: true
      }
    }
  },
  computed: {
    ...mapState(['tableData'])
  },
  mounted () {
    this.getData()
    this.$store.commit('setBreadcrumb', { active: 'Actions', items: { label: 'Actions' } })
  },
  methods: {
    getData () {
      this.$store.dispatch('getTableData', { link: 'pr/categoryProduct/marble' })
      this.tableApi = 'mahmut'
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
