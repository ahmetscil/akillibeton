<template>
  <transition name="back-to-top-fade">
    <div
      v-show="visible"
      class="vue-back-to-top"
      @click="backToTop"
    >
      <slot>
        <div class="default">
          <span class="h3">
            <i class="fas fa-angle-up" />
          </span>
        </div>
      </slot>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'BackToTop',
  props: {
    visibleoffset: {
      type: [String, Number],
      default: 600
    },
    visibleoffsetbottom: {
      type: [String, Number],
      default: 0
    },
    scrollFn: {
      type: Function,
      default (eventObject) {}
    }
  },
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    if (process.browser) {
      window.smoothscroll = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(window.smoothscroll)
          window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
        }
      }
      window.addEventListener('scroll', this.catchScroll)
    }
  },
  destroyed () {
    if (process.browser) {
      window.removeEventListener('scroll', this.catchScroll)
    }
  },
  methods: {
    /**
     * Catch window scroll event
     * @return {void}
     */
    catchScroll () {
      if (process.browser) {
        const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset)
        const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleoffsetbottom)
        this.visible = parseInt(this.visibleoffsetbottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset
        this.scrollFn(this)
      }
    },
    /**
     * The function who make the magics
     * @return {void}
     */
    backToTop () {
      if (process.browser) {
        window.smoothscroll()
        this.$emit('scrolled')
      }
    }
  }
}
</script>
<style>
.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
  transition: opacity .7s;
}
.back-to-top-fade-enter,
.back-to-top-fade-leave-to {
  opacity: 0;
}

.vue-back-to-top {
  cursor:pointer;
  position: fixed;
  z-index: 1000;
  bottom: 30px;
  right: 40px;
}

.vue-back-to-top .default {
  background-color: #d21e26;
  border-radius: 3px;
  color: #ffffff;
  height: 50px;
  line-height: 60px;
  text-align: center;
  width: 50px;
}

.vue-back-to-top .default span{
  color:#ffffff;
}

.vue-back-to-top--is-footer {
  bottom: 50% !important;
  position: absolute;
  transform: translateY(50%);
}
</style>
