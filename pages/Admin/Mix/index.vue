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
      pageApi: 'Mix',
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
        { label: 'user', type: 'InputNumber' },
        { label: 'project', type: 'InputNumber' },
        { label: 'title', type: 'InputText' },
        { label: 'description', type: 'Textarea' },
        { label: 'activation_energy', type: 'Temperature' },
        { label: 'temperature', type: 'Temperature' },
        { label: 'a', type: 'InputText' },
        { label: 'b', type: 'InputText' }
      ]
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
