<template>
  <div class="asc_pariette-pagecard">
    <ParietteTable
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
      pageApi: 'MixCalibration',
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
          setTimeout(() => {
            this.getData()
          }, 200)
          break
        case 203:
          this.$toast.add({ severity: 'success', summary: this.$t('general.updated'), life: 3000 })
          setTimeout(() => {
            this.getData()
          }, 200)
          break
        case 402:
          this.$toast.add({ severity: 'error', summary: this.$t('general.error'), life: 3000 })
          break
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let apilink = this.pageApi
      if (process.browser) {
        if (window.location.search) {
          apilink = this.pageApi + window.location.search
        }
      }
      this.$store.commit('setBreadcrumb', { active: this.$t('router.' + this.pageApi), items: { label: 'Akıllı Beton' } })
      this.$store.dispatch('getLookup', { api: 'Mix', label: 'mixList' })
      this.$store.dispatch('getTableData', { link: apilink })
      this.tableOperation = {
        create: true,
        export: true,
        stop: false,
        actions: false,
        status: true,
        preview: true,
        update: true
      }
      this.dataFields = ['a', 'activation_energy', 'b', 'created_at', 'description', 'id', 'project', 'status', 'temperature', 'title', 'updated_at', 'user']
      this.createForm = [
        { label: 'mix', type: this.$route.query.mix ? 'Hidden' : 'Dropdown', default: this.$route.query.mix ? this.$route.query.mix : null, option: 'mixList', selector: 'id', val: 'title' },
        { label: 'days', type: 'InputNumber' },
        { label: 'strength', type: 'InputNumber' }
      ]
      this.updateForm = [
        { label: 'mix', type: this.$route.query.mix ? 'Hidden' : 'Dropdown', default: this.$route.query.mix ? this.$route.query.mix : null, option: 'mixList', selector: 'id', val: 'title' },
        { label: 'days', type: 'InputNumber' },
        { label: 'strength', type: 'InputNumber' },
        { label: 'status', type: 'Switch' }
      ]
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'days', label: this.$t('action.days'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'strength', label: this.$t('action.strength'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
