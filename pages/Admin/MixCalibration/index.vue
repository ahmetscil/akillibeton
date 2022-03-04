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
      pageApi: 'MixCalibration',
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
      this.$store.dispatch('getBreadcrumb', { query: 'where=mixCalibration' })
      this.$store.dispatch('getLookup', { api: 'Lookup/statusList', label: 'statusList' })
      this.$store.dispatch('getLookup', { api: 'Mix', label: 'mixList' })
      this.tableOperation = {
        create: true,
        export: true,
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
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' }
      ]
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'days', label: this.$t('action.days'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'strength', label: this.$t('action.strength'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'status', label: this.$t('action.status'), type: 'Boolean', filter: true, sortable: true, options: [] }
      ]
      setTimeout(() => {
        this.isShowTable = true
      }, 100)
    }
  }
}
</script>
