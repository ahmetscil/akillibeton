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
      pageApi: 'Projects',
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
      this.$store.dispatch('getLookup', { api: 'Lookup/countryList', label: 'countryList' })
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
        { label: 'company', type: 'InputText' },
        { label: 'code', type: 'InputText' },
        { label: 'title', type: 'InputText' },
        { label: 'description', type: 'InputText' },
        { label: 'email_title', type: 'InputText' },
        { label: 'email', type: 'InputText' },
        { label: 'telephone_title', type: 'InputText' },
        { label: 'telephone', type: 'InputText' },
        { label: 'country', type: 'Dropdown', option: 'countryList', selector: 'id', val: 'key' },
        { label: 'city', type: 'InputText' },
        { label: 'address', type: 'InputText' },
        { label: 'started_at', type: 'Calendar' },
        { label: 'ended_at', type: 'Calendar' }
      ]
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'code', label: this.$t('action.code'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'title', label: this.$t('action.title'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'email', label: this.$t('action.email'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'telephone', label: this.$t('action.telephone'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'country', label: this.$t('action.country'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'city', label: this.$t('action.city'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'started_at', label: this.$t('action.started_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'ended_at', label: this.$t('action.ended_at'), type: 'Calendar', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
