<template>
  <div />
</template>
<script>
export default {
  mounted () {
    this.$router.push(this.localeLocation({ name: 'Auth-SelectCompany' }))
  }
}
</script>
