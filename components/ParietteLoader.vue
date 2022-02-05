<template>
  <div v-if="loader" class="asc_pariette-loader">
    <ProgressSpinner />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['loader'])
  }
}
</script>
<style lang="sass">
  .asc_pariette-loader
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: #fff
    text-align: center
    padding-top: 20%
    z-index: 9999
</style>
