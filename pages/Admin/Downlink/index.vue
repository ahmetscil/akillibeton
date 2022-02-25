<template>
  <div class="asc_pariette-pagecard">
    <ParietteTable
      :head="tableHead"
      :operation="tableOperation"
      :api="pageApi"
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
      pageApi: 'Downlink',
      tableHead: [],
      tableOperation: {
        create: true,
        export: true,
        stop: false,
        actions: false,
        status: true,
        preview: true,
        edit: true
      },
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
      this.$store.commit('setBreadcrumb', { active: this.$t('router.Downlink'), items: { label: 'Akıllı Beton' } })
      this.$store.dispatch('getTableData', { link: this.pageApi })
      this.dataFields = ['DevEUI', 'created_at', 'id', 'measurement', 'payload_hex', 'updated_at']
      this.tableHead = [
        { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'DevEUI', label: this.$t('action.DevEUI'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'measurement', label: this.$t('action.measurement'), type: 'InputText', filter: true, sortable: true, options: [] },
        { col: 'payload_hex', label: this.$t('action.payload_hex'), type: 'InputText', filter: true, sortable: true, options: [] }
      ]
    }
  }
}
</script>
