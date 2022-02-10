<template>
  <div class="asc_pariette-header-panel-shortcut">
    <nuxt-link
      v-b-tooltip.bottom.hover
      :to="localePath({ name: 'Sales-update', params: {update: token } })"
      :title="$t('list.salesReport')"
      exact
      active-class="asc_pariette-header-panel-active"
    >
      <i class="fas fa-chart-line" />
    </nuxt-link>
    <nuxt-link
      v-b-tooltip.bottom.hover
      :to="localePath({ name: 'Discount-update', params: {update: token } })"
      :title="$t('list.discount')"
      exact
      active-class="asc_pariette-header-panel-active"
    >
      <i class="fas fa-percent" />
    </nuxt-link>
    <nuxt-link
      v-b-tooltip.bottom.hover
      :to="localePath({ name: 'Balance-update', params: {update: token } })"
      :title="$t('list.balance')"
      exact
      active-class="asc_pariette-header-panel-active"
    >
      <i class="fas fa-money-bill" />
    </nuxt-link>
    <nuxt-link
      v-b-tooltip.bottom.hover
      :to="localePath({ name: 'Authority-update', params: {update: token } })"
      :title="$t('list.users')"
      exact
      active-class="asc_pariette-header-panel-active"
    >
      <i class="fas fa-users" />
    </nuxt-link>
    <nuxt-link
      v-b-tooltip.bottom.hover
      :to="localePath({ name: 'Customer-update', params: {update: token } })"
      :title="$t('list.setttings')"
      exact
      active-class="asc_pariette-header-panel-active"
    >
      <i class="fas fa-cog" />
    </nuxt-link>
  </div>
</template>
<script>
export default {
  computed: {
    token () {
      return this.$route.params.update
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-header-panel-shortcut
    position: relative
    float: left
    & a
      background: #fff !important
      color: #2f2f2f !important
      & i
        padding-right: 0 !important
    .asc_pariette-header-panel-active
      background: #2f2f2f !important
      color: #fff !important
</style>
