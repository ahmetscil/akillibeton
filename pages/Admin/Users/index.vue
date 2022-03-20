<template>
  <div class="asc_pariette-pagecard">
    <ParietteTable
      v-if="isShowTable"
      :head="tableHead"
      :operation="tableOperation"
      selection-label="id"
      :api="pageApi"
      :create="createForm"
      :update="updateForm"
      :show-modal="true"
      :data-fields="dataFields"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      pageApi: 'Users',
      isShowTable: true,
      tableHead: [],
      tableOperation: {},
      createForm: [],
      updateForm: [],
      dataFields: []
    }
  },
  computed: mapState(['storeData', 'returnCode']),
  watch: {
    'returnCode' (e) {
      switch (e) {
        case 202:
          this.$toast.add({ severity: 'success', summary: this.$t('general.success'), life: 3000 })
          break
        case 203:
          this.$toast.add({ severity: 'success', summary: this.$t('general.updated'), life: 3000 })
          break
        case 402:
          this.$toast.add({ severity: 'error', summary: this.$t('general.error'), life: 3000 })
          break
      }
    },
    '$route' () {
      this.isShowTable = false
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.dispatch('getLookup', { api: 'Lookup/statusList', label: 'statusList' })
      this.$store.dispatch('getState', { api: 'Projects', label: 'projectList' })
      this.$store.dispatch('getBreadcrumb', { query: 'where=users' })
      this.tableOperation = {
        create: true,
        export: true,
        stop: false,
        actions: false,
        status: false,
        preview: false,
        activePassive: true,
        addUser: true,
        update: true,
        updatePassword: true,
        links: [
          { name: 'Authority', route: '../Admin/Authority', query: '/' }
        ]
      }
      this.dataFields = ['created_at', 'userName', 'id']
      this.createForm = [
        { label: 'project', type: this.$route.query.project ? 'Hidden' : 'Dropdown', default: this.$route.query.project ? this.$route.query.project : null, option: 'projectList', selector: 'id', val: 'title' },
        { label: 'name', type: 'InputText' },
        { label: 'phone', type: 'InputPhone' },
        { label: 'email', type: 'InputMail' },
        { label: 'password', type: 'Password' }
      ]
      this.updateForm = [
        { label: 'name', type: 'InputText' },
        { label: 'phone', type: 'InputPhone' },
        { label: 'email', type: 'InputMail' },
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' }
      ]
      this.tableHead = [
        { col: 'userName', label: this.$t('action.name'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'companyName', label: this.$t('action.companyName'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'projectName', label: this.$t('action.projectName'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'phone', label: this.$t('action.phone'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'email', label: this.$t('action.email'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'created_at', label: this.$t('action.created_at'), type: 'Calendar', filter: true, sortable: true, options: [] }
      ]
      setTimeout(() => {
        this.isShowTable = true
      }, 100)
    }
  }
}
</script>
