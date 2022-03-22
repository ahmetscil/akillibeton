<template>
  <div class="asc_pariette-sidebar-menu">
    <div class="asc_pariette-sidebar-menu-head">
      <img src="@/assets/akillibeton-light.png" :alt="siteInfo.name">
    </div>
    <div class="asc_pariette-sidebar-menu-list">
      <ul>
        <li v-for="(nav, navigationkey) in navigation" :key="'sidebar' + navigationkey">
          <template v-if="nav.sub">
            <span v-b-toggle="'sidenav' + navigationkey">
              <i :class="nav.icon" /> {{ $t('router.' + nav.code) }}
            </span>
            <b-collapse :id="'sidenav' + navigationkey">
              <nuxt-link v-for="(sub, s) in nav.sub" :key="'sidesub' + s" :to="localeLocation({ name: sub.route })">
                <i :class="sub.icon" /> {{ $t('router.' + sub.code) }}
              </nuxt-link>
            </b-collapse>
          </template>
          <template v-else>
            <nuxt-link v-if="nav.code" :to="localeLocation({ name: nav.route })">
              <i :class="nav.icon" /> {{ $t('router.' + nav.code) }}
            </nuxt-link>
            <hr v-else>
          </template>
        </li>
      </ul>
    </div>
    <div class="asc_pariette-sidebar-menu-footer">
      {{ siteInfo.footer }}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
  }),
  computed: {
    ...mapState(['siteInfo', 'navigation'])
  },
  mounted () {
    this.$store.dispatch('getNavigation')
  }
}
</script>
<style lang="sass">
  .asc_pariette-sidebar-menu
    width: 95%
    margin-top: .5vh
    border-radius: 0 20px 20px 0
    .asc_pariette-sidebar-menu-head
      height: 40px
      & img
        margin: 15px 0 0 15px
        width: 80%
      & h1
        font-weight: bold
        letter-spacing: -0.1rem
        font-size: 26px
        padding: 10px
    .asc_pariette-sidebar-menu-footer
      text-align: center
      font-size: 10px
      font-weight: 600
      color: lighten(#2d3344, 50)
      height: 60px
    .nuxt-link-active
      background: #3e3e3e8a !important
    .asc_pariette-sidebar-menu-list
      height: calc(99vh - 100px)
      overflow-y: auto
      overflow-x: hidden
      & ul
        list-style: none
        padding: 10px
        .active
          background: #2d3344
        & li
          display: block
          cursor: pointer
          margin-bottom: .6rem
          width: 100%
          font-size: 13px
          & i
            width: 30px
            transition: .3s
          & span
            border-radius: 10px
            background: transparent
            padding: 10px 10px
            transition: .3s
            color: #fff
            display: block
            &:hover
              background: #3e3e3e8a !important
          & a
            border-radius: 10px
            background: transparent
            padding: 10px 10px
            transition: .3s
            display: block
            text-decoration: none
            color: #fff
            &:hover
              background: #3e3e3e8a !important
          &:hover
            & i
              width: 35px
              transition: .3s
          .collapse
            padding: 10px 0 10px 5px
</style>
