<template>
  <div class="asc_pariette-footer">
    <div class="asc_pariette-footer-bottom">
      {{ siteInfo.footer }}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['siteInfo'])
}
</script>
<style lang="sass">
  .asc_pariette-footer
    width: 100%
    background: #111
    margin-top: 30px
    height: 60px
    .asc_pariette-footer-bottom
      color: #fff
      text-align: center
      font-size: 12px
      width: 100%
      padding: 10px 0
</style>
