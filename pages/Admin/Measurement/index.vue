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
    this.$store.commit('setBreadcrumb', { active: 'Measurement', items: { label: 'Measurement' } })
  },
  methods: {
    getData () {
      this.$store.dispatch('getTableData', { link: 'Measurement' })
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'name', label: this.$t('action.name'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'sensorsTitle', label: this.$t('action.sensorsTitle'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'mixTitle', label: this.$t('action.mixTitle'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'last_temp', label: this.$t('action.last_temp'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'max_temp', label: this.$t('action.max_temp'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'min_temp', label: this.$t('action.min_temp'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'readed_max', label: this.$t('action.readed_max'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'readed_min', label: this.$t('action.readed_min'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'started_at', label: this.$t('action.started_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'deployed_at', label: this.$t('action.deployed_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'ended_at', label: this.$t('action.ended_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'last_data_at', label: this.$t('action.last_data_at'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
