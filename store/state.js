export default () => ({
  siteInfo: {
    name: 'AKILLIBETON',
    logo: 'pariette-header-logo.svg',
    cdn_url: 'https://pariette-cdn.s3.eu-central-1.amazonaws.com/uploads/',
    copyright: '© 2021 CANVAS TEKNOLOJI',
    footer: '© 2021 AKILLI BETON. All Rights Reserved.'
  },
  myStore: {
    cdn_url: 'https://pariette-cdn.s3.eu-central-1.amazonaws.com/uploads/',
    logo: 'pariette.png',
    css: '',
    name: ''
  },
  user: process.browser ? localStorage.getItem('userData') : {},
  breadcrumb: {
    active: '',
    items: []
  },
  template: {
    hamburger: true,
    showHides: false,
    sidebar: 'asc_pariette-sidebar',
    header: 'asc_pariette-header',
    main: 'asc_pariette-main'
  },
  isClosed: false,
  carousel: [],
  uploadStatus: false,
  uploaded: {
    success: [],
    errors: []
  },
  uploadedImages: {
    name: '',
    image: ''
  },
  loader: true,
  tableData: [],
  locale: 'de-DE',
  registeredUser: '',
  lookup: {},
  canvas: {},
  navigation: []
})
