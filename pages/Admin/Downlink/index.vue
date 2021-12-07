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
      this.$store.dispatch('getTableData', { link: 'Downlink' })
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'DevEUI', label: this.$t('action.DevEUI'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'measurement', label: this.$t('action.measurement'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'payload_hex', label: this.$t('action.payload_hex'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
