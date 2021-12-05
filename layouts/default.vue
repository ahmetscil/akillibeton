<template>
  <div id="app_target" class="asc_pariette">
    <Header />
    <div class="asc_pariette-default">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
  }),
  computed: mapState([]),
  mounted () {
  },
  methods: {
  }
}
</script>
