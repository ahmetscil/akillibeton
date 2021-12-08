<template>
  <div>
    index | <nuxt-link :to="localeLocation({ name: 'Auth-Login' })">
      login
    </nuxt-link> | <nuxt-link :to="localeLocation({ name: 'Admin-Dashboard' })">
      dashboard
    </nuxt-link>
  </div>
</template>

<script>
export default {
}
</script>
