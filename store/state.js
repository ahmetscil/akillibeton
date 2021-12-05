export default () => ({
  siteInfo: {
    name: 'PARIETTE',
    logo: 'pariette-header-logo.svg',
    cdn_url: 'https://pariette-cdn.s3.eu-central-1.amazonaws.com/uploads/',
    copyright: '© 2021 CANVAS TEKNOLOJI',
    footer: '© 2021 PARIETTE. All Rights Reserved.'
  },
  myStore: {
    cdn_url: 'https://pariette-cdn.s3.eu-central-1.amazonaws.com/uploads/',
    logo: 'pariette.png',
    css: '',
    name: ''
  },
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
  loader: false,
  tableData: [],
  locale: 'de-DE',
  registeredUser: '',
  lookup: {},
  canvas: {},
  navigation: [],
  loginUser: {
    signed: process.browser ? localStorage.getItem('signed') : '',
    userPortalId: process.browser ? localStorage.getItem('userPortalId') : '',
    email: process.browser ? localStorage.getItem('userEmail') : '',
    name: process.browser ? localStorage.getItem('userName') : '',
    phoneNumber: process.browser ? localStorage.getItem('phoneNumber') : '',
    faxNumber: process.browser ? localStorage.getItem('faxNumber') : '',
    address: process.browser ? localStorage.getItem('address') : '',
    ip: process.browser ? localStorage.getItem('userIP') : '',
    token: process.browser ? localStorage.getItem('userToken') : ''
  }
})
