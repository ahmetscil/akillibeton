<template>
  <div class="asc_pariette-pagecard">
    <ParietteTable
      v-if="isShowTable"
      :head="tableHead"
      :operation="tableOperation"
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
      pageApi: 'Mix',
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
          this.isShowTable = false
          this.getData()
          break
        case 203:
          this.$toast.add({ severity: 'success', summary: this.$t('general.updated'), life: 3000 })
          this.isShowTable = false
          this.getData()
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
      this.$store.dispatch('getState', { api: 'Projects', label: 'projectList' })
      this.$store.dispatch('getLookup', { api: 'Lookup/statusList', label: 'statusList' })
      this.$store.dispatch('getBreadcrumb', { query: 'where=mix' })
      this.tableOperation = {
        create: true,
        export: true,
        update: true,
        links: [
          { name: 'MixCalibration', route: '../Admin/MixCalibration', query: '?mix=' }
        ]
      }
      this.dataFields = ['a', 'activation_energy', 'b', 'created_at', 'description', 'id', 'project', 'status', 'temperature', 'title', 'updated_at', 'user']
      this.createForm = [
        { label: 'project', type: this.$route.query.project ? 'Hidden' : 'Dropdown', default: this.$route.query.project ? this.$route.query.project : null, option: 'projectList', selector: 'id', val: 'title' },
        { label: 'title', type: 'InputText' },
        { label: 'description', type: 'Textarea' },
        { label: 'activation_energy', type: 'Temperature' },
        { label: 'temperature', type: 'Temperature' },
        { label: 'a', type: 'InputText' },
        { label: 'b', type: 'InputText' }
      ]
      this.updateForm = [
        { label: 'title', type: 'InputText' },
        { label: 'description', type: 'Textarea' },
        { label: 'activation_energy', type: 'Temperature' },
        { label: 'temperature', type: 'Temperature' },
        { label: 'a', type: 'InputText' },
        { label: 'b', type: 'InputText' },
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' }
      ]
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'title', label: this.$t('action.title'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'projectName', label: this.$t('action.projectName'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'activation_energy', label: this.$t('action.activation_energy'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'a', label: this.$t('action.a'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'b', label: this.$t('action.b'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'temperature', label: this.$t('action.temperature'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'userName', label: this.$t('action.userName'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'Boolean', filter: true, sortable: true, options: [] }
      ]
      setTimeout(() => {
        this.isShowTable = true
      }, 100)
    }
  }
}
</script>
