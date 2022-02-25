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
      pageApi: 'Companies',
      tableHead: [],
      tableOperation: {},
      createForm: [],
      updateForm: [],
      dataFields: []
    }
  },
  computed: mapState(['storeData', 'returnCode', 'projectUrl']),
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
      this.$store.commit('setBreadcrumb', { active: this.$t('router.Companies'), items: { label: 'Akıllı Beton' } })
      this.$store.dispatch('getLookup', { api: 'Lookup/countryList', label: 'countryList' })
      this.$store.dispatch('getLookup', { api: 'Lookup/statusList', label: 'statusList' })
      if (process.browser) {
        this.tableOperation = {
          create: true,
          export: true,
          update: true,
          links: [
            { name: 'Projects', route: '../Admin/Projects', query: '?company=' }
          ]
        }
      }
      this.dataFields = ['address', 'city', 'country', 'created_at', 'email', 'email_title', 'id', 'logo', 'status', 'telephone', 'telephone_title', 'title', 'updated_at']
      this.createForm = [
        { label: 'title', type: 'InputText', required: true },
        { label: 'email_title', type: 'InputText', required: false },
        { label: 'email', type: 'InputText', required: true },
        { label: 'telephone_title', type: 'InputText', required: false },
        { label: 'telephone', type: 'InputText', required: false },
        { label: 'country', type: 'Dropdown', required: false, option: 'countryList', selector: 'id', val: 'key' },
        { label: 'city', type: 'InputText', required: false },
        { label: 'address', type: 'InputText', required: false }
      ]
      this.updateForm = [
        { label: 'title', type: 'InputText' },
        { label: 'email_title', type: 'InputText' },
        { label: 'email', type: 'InputText' },
        { label: 'telephone_title', type: 'InputText' },
        { label: 'telephone', type: 'InputText' },
        { label: 'country', type: 'Dropdown', option: 'countryList', selector: 'id', val: 'key', display: 'countryName' },
        { label: 'city', type: 'InputText' },
        { label: 'address', type: 'InputText' },
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' }
      ]
      this.tableHead = [
        { col: 'title', label: this.$t('action.title'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'email', label: this.$t('action.email'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'telephone', label: this.$t('action.telephone'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'countryName', label: this.$t('action.country'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'city', label: this.$t('action.city'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'created_at', label: this.$t('action.created_at'), type: 'Calendar', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
