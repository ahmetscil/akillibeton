<template>
  <div class="asc_pariette-pagecard">
    <Table
      v-if="tableData"
      :items="tableData"
      :head="tableHead"
      :operation="tableOperation"
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
    this.$store.commit('setBreadcrumb', { active: 'Downlink', items: { label: 'Downlink' } })
  },
  methods: {
    getData () {
      this.$store.dispatch('getTableData', { link: 'Companies' })
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'title', label: this.$t('action.title'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'email', label: this.$t('action.email'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'telephone', label: this.$t('action.telephone'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'address', label: this.$t('action.address'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'city', label: this.$t('action.city'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'country', label: this.$t('action.country'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
