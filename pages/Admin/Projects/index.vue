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
      pageApi: 'Projects',
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
    },
    '$route' () {
      this.getData()
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
      this.pageApi = apilink
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
      this.$store.commit('setBreadcrumb', { active: this.$t('router.Projects'), items: ['Akıllı Beton', this.storeData.companyTitle] })
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
        { label: 'address', type: 'InputText' },
        { label: 'started_at', type: 'Calendar' }
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
        { label: 'started_at', type: 'Calendar' },
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' }
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
