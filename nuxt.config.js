// https://i18n.nuxtjs.org/basic-usage
// https://github.com/madmod/nuxt-vue-select
// https://github.com/nuxt-community/style-resources-module
// https://github.com/nuxt-community/fontawesome-module
// https://dev.auth.nuxtjs.org/providers/laravel-jwt
// https://github.com/nuxt-community/community-modules/tree/master/packages/toast
// https://github.com/sandoche/nuxtjs-darkmode-js-module
export default {
  target: 'static',
  server: {
    port: 8080,
    host: '0.0.0.0'
  },
  head: {
    title: 'Akıllı Beton',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/css/pariette.sass',
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css'
  ],

  plugins: [
    '~/plugins/vuelidate.js',
    '~/plugins/select.js',
    { src: '~/plugins/editor.js', ssr: false },
    { src: '~/plugins/datagrid.js', ssr: false }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/style-resources',
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    ['@nuxtjs/fontawesome', {
      component: 'fa',
      suffix: true,
      regular: true
    }]
  ],
  googleFonts: {
    families: {
      Inter: [100, 400, 600, 900],
      Poppins: [100, 300, 400, 700]
    }
  },
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    ['primevue/nuxt', {
      components: [
        'ProgressSpinner',
        'Badge',
        'DataTable',
        'TabView',
        'TabPanel',
        'InputSwitch',
        'InputMask',
        'Message',
        'Card',
        'Toast',
        'Column',
        'Button',
        'Calendar',
        'ToggleButton',
        'Dropdown',
        'MultiSelect',
        'InputText',
        'SplitButton',
        'ConfirmDialog',
        'Password',
        'Dialog',
        'Checkbox',
        'Chart',
        'Tooltip',
        'Textarea',
        'Menu',
        'Sidebar',
        'InputNumber'
      ],
      directives: ['Tooltip', 'Badge']
    }],
    // 'nuxtjs-darkmode-js-module',
    'nuxt-vue-select',
    ['nuxt-i18n', {
      locales: [
        {
          code: 'tr',
          file: 'tr-TR.js'
        },
        {
          code: 'en',
          file: 'en-US.js'
        }
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'tr'
    }]
  ],

  axios: {
    baseURL: process.env.CANVAS_API_URL
  },

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  auth: {
    redirect: {
      login: '/Auth/Login',
      logout: '/',
      callback: '/Auth/Login',
      home: '/'
    },
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: process.env.CANVAS_API_URL,
        endpoints: {
          login: { url: 'auth/login', method: 'post' },
          refresh: { url: 'auth/refresh', method: 'post' },
          logout: { url: 'auth/logout', method: 'post' },
          user: { url: 'auth/me', method: 'get' }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        }
      }
    }
  },

  toast: {
    position: 'top-right',
    duration: 5000
  },
  darkmodejs: {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff', // default: '#fff'
    buttonColorDark: '#100f2c', // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true, // default: true
    disableWidget: false // default: false
  },

  build: {
    transpile: ['primevue']
  }
}
