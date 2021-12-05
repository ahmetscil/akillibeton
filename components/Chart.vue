<template>
  <div class="asc_pariette-chart">
    {{ options }}
  </div>
</template>
<script>
export default {
  name: 'Chart',
  props: {
    type: {
      type: [String, Number],
      default: 'bar'
    },
    options: {
      type: [Array],
      default: null
    }
  },
  data () {
    return {
      datacollection: null
    }
  }
}
</script>
<style>
</style>
