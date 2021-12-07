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
    this.$store.commit('setBreadcrumb', { active: 'Log', items: { label: 'Log' } })
  },
  methods: {
    getData () {
      this.$store.dispatch('getTableData', { link: 'Log' })
      this.tableHead = [
        { col: 'name', label: this.$t('action.name'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'email', label: this.$t('action.email'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'ip', label: this.$t('action.ip'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'phone', label: this.$t('action.phone'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'photo', label: this.$t('action.photo'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'updated_at', label: this.$t('action.updated_at'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
