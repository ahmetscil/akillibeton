<template>
  <div v-if="shtdwn">
    <div class="asc_pariette-myStore-closed">
      {{ mssg }}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    shtdwn: false,
    connected: true,
    mssg: ''
  }),
  computed: {
    ...mapState(['isClosed', 'companyToken'])
  },
  watch: {
    'companyToken' () {
      this.customer(this.companyToken)
    }
  },
  mounted () {
    this.shtdwn = false
    // this.check()
    if (this.isClosed) {
      this.shtdwn = true
      this.mssg = this.$t('general.maintenanceMode')
    }
  },
  methods: {
    // async check () {
    //   this.connected = await isOnline()
    //   if (this.connected) {
    //     this.shtdwn = false
    //   } else {
    //     this.shtdwn = true
    //     this.mssg = this.$t('general.connectionError')
    //   }
    // }
  }
}
</script>
<style lang="sass">
  .asc_pariette-myStore-closed
    position: fixed
    top: 0
    left: 0
    z-index: 99999999999
    width: 100vw
    height: 100vh
    background: #000
    color: #ffff
    text-align: center
    line-height: 100vh
</style>
