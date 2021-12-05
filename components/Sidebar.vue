<template>
  <div class="asc_pariette-sidebar-menu">
    <div class="asc_pariette-sidebar-menu-head">
      <h1>
        {{ siteInfo.name }}
      </h1>
    </div>
    <div class="asc_pariette-sidebar-menu-list">
      <ul>
        <li v-for="(nav, navigationkey) in navigation" :key="'sidebar' + navigationkey">
          <template v-if="nav.sub">
            <span v-b-toggle="'sidenav' + navigationkey">
              <i :class="nav.icon" /> {{ $t(nav.title) }}
            </span>
            <b-collapse :id="'sidenav' + navigationkey">
              <nuxt-link v-for="(sub, s) in nav.sub" :key="'sidesub' + s" :to="localeLocation({ name: sub.route })">
                <i :class="sub.icon" /> {{ $t(sub.title) }}
              </nuxt-link>
            </b-collapse>
          </template>
          <template v-else>
            <nuxt-link :to="localeLocation({ name: nav.route })">
              <i :class="nav.icon" /> {{ $t(nav.title) }}
            </nuxt-link>
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
    defaultIcon: 'far fa-circle',
    navigation: [
      {
        title: 'header.Dashboard',
        route: 'Admin-Dashboard',
        icon: 'pi pi-folder'
      },
      {
        title: 'header.Action',
        route: 'Admin-Action',
        icon: 'pi pi-folder'
      },
      {
        title: 'header.Company',
        route: 'Admin-Dashboard',
        icon: 'pi pi-folder',
        sub: [
          {
            title: 'header.Dashboard',
            route: 'Admin-Dashboard',
            icon: 'pi pi-folder'
          }
        ]
      }
    ]
  }),
  computed: {
    ...mapState(['siteInfo'])
  },
  mounted () {
  }
}
</script>
<style lang="sass">
  .asc_pariette-sidebar-menu
    background: linear-gradient(45deg, #10172a, #090a0e)
    width: 95%
    margin-top: .5vh
    border-radius: 0 20px 20px 0
    .asc_pariette-sidebar-menu-head
      height: 40px
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
      background: lighten(#2d3344, 10) !important
    .asc_pariette-sidebar-menu-list
      height: calc(99vh - 100px)
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
              background: lighten(#2d3344, 10)
          & a
            border-radius: 10px
            background: transparent
            padding: 10px 10px
            transition: .3s
            display: block
            text-decoration: none
            color: #fff
            &:hover
              background: lighten(#2d3344, 10)
          &:hover
            & i
              width: 35px
              transition: .3s
          .collapse
            padding: 10px 0 10px 5px
</style>
