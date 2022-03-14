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
      pageApi: 'Projects',
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
      this.$store.dispatch('getLookup', { api: 'Lookup/countryList', label: 'countryList' })
      this.$store.dispatch('getLookup', { api: 'Lookup/statusList', label: 'statusList' })
      this.$store.dispatch('getLookup', { api: 'Companies', label: 'companyList' })
      this.tableOperation = {
        create: true,
        update: true,
        export: true,
        links: [
          { name: 'Sensors', route: '../Admin/Sensors', query: '?project=', icon: 'pi pi-wifi' },
          { name: 'Measurement', route: '../Admin/Measurement', query: '?project=', icon: 'pi pi-chart-bar' },
          { name: 'Mix', route: '../Admin/Mix', query: '?project=', icon: 'pi pi-palette' }
        ]
      }
      this.$store.dispatch('getBreadcrumb', { query: `where=projects${this.$route.query.company ? `&company=${this.$route.query.company}` : ''}` })

      this.dataFields = ['address', 'city', 'code', 'company', 'country', 'created_at', 'description', 'email', 'email_title', 'id', 'logo', 'started_at', 'status', 'telephone', 'telephone_title', 'title', 'updated_at']
      this.createForm = [
        { label: 'company', type: this.$route.query.company ? 'Hidden' : 'Dropdown', default: this.$route.query.company ? this.$route.query.company : null, option: 'companyList', selector: 'id', val: 'title' },
        { label: 'code', type: 'InputText' },
        { label: 'title', type: 'InputText' },
        { label: 'description', type: 'InputText' },
        { label: 'email_title', type: 'InputText' },
        { label: 'email', type: 'InputText' },
        { label: 'telephone_title', type: 'InputText' },
        { label: 'telephone', type: 'InputText' },
        { label: 'country', type: 'Dropdown', option: 'countryList', selector: 'id', val: 'key' },
        { label: 'city', type: 'InputText' },
        { label: 'address', type: 'InputText' }
      ]
      this.updateForm = [
        { label: 'company', type: this.$route.query.company ? 'Hidden' : 'Dropdown', default: this.$route.query.company ? this.$route.query.company : null, option: 'companyList', selector: 'id', val: 'title' },
        { label: 'code', type: 'InputText' },
        { label: 'title', type: 'InputText' },
        { label: 'description', type: 'InputText' },
        { label: 'email_title', type: 'InputText' },
        { label: 'email', type: 'InputText' },
        { label: 'telephone_title', type: 'InputText' },
        { label: 'telephone', type: 'InputText' },
        { label: 'country', type: 'Dropdown', option: 'countryList', selector: 'key', val: 'key' },
        { label: 'city', type: 'InputText' },
        { label: 'address', type: 'InputText' },
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' }
      ]
      this.tableHead = [
        { col: 'companName', label: this.$t('action.companName'), type: 'InputText', filter: false, sortable: true, options: [] },
        { col: 'code', label: this.$t('action.code'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'title', label: this.$t('action.title'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'email', label: this.$t('action.email'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'telephone', label: this.$t('action.telephone'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'country', label: this.$t('action.country'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'city', label: this.$t('action.city'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'created_at', label: this.$t('action.created_at'), type: 'Calendar', filter: true, sortable: true, options: [] }
      ]
      setTimeout(() => {
        this.isShowTable = true
      }, 100)
    }
  }
}
</script>
