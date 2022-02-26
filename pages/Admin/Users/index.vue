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
      pageApi: 'Users',
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
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.dispatch('getLookup', { api: 'Lookup/statusList', label: 'statusList' })
      this.$store.commit('setBreadcrumb', { active: this.$t('router.Users'), items: { label: 'Akıllı Beton' } })
      this.tableOperation = {
        create: true,
        export: true,
        stop: false,
        actions: false,
        status: false,
        preview: false,
        update: true,
        links: [
          { name: 'Authority', route: '../Admin/Authority', query: '/' }
        ]
      }
      this.dataFields = ['created_at', 'userName', 'id']
      this.createForm = [
        { label: 'name', type: 'InputText' },
        { label: 'phone', type: 'InputText' },
        { label: 'email', type: 'InputText' },
        { label: 'password', type: 'Password' }
      ]
      this.updateForm = [
        { label: 'name', type: 'InputText' },
        { label: 'phone', type: 'InputText' },
        { label: 'email', type: 'InputText' },
        { label: 'status', type: 'Dropdown', option: 'statusList', selector: 'value', val: 'key' }
      ]
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'Calendar', filter: true, sortable: true, options: [] },
        { col: 'userName', label: this.$t('action.name'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'phone', label: this.$t('action.phone'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'email', label: this.$t('action.email'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
