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
    this.$store.commit('setBreadcrumb', { active: 'Mix', items: { label: 'Mix' } })
  },
  methods: {
    getData () {
      this.$store.dispatch('getTableData', { link: 'Mix' })
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
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
