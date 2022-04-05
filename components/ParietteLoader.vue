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
