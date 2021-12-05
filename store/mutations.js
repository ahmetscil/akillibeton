export default {
  sendLogin (state, payload) {
    state.customerData = null
    state.selectSiteList = []
    if (process.browser) {
      localStorage.clear()
    }
    this.$auth.logout()
  },
  setError (state, payload) {
    const msgType = typeof payload
    if (msgType === 'string') {
      this.$toast.error(payload)
    } else if (msgType === 'object') {
      for (const property in payload) {
        this.$toast.error(payload[property])
      }
    }
  },
  setLoader (state, payload) {
    state.loader = payload
  },
  setLogin (state, payload) {
    state.returnCount = 0
    if (process.browser) {
      localStorage.setItem('customerData', JSON.stringify(payload.customer.customer))
      localStorage.setItem('customerToken', payload.customer.customer.token)
      localStorage.setItem('companyToken', payload.customer.customer.company)
      localStorage.setItem('companyTitle', process.env.DEMCOM_SITE_TITLE ? process.env.DEMCOM_SITE_TITLE : 'DEMPINS')
      state.customerData = JSON.parse(localStorage.getItem('customerData'))
      state.customerToken = localStorage.getItem('customerToken')
      state.companyToken = localStorage.getItem('companyToken')
      if (payload.customer.isAdmin === 1) {
        state.returnCount = 662
      } else {
        state.returnCount = 661
      }
    }
  },
  killLogin (state) {
    state.getMe = []
    if (process.browser) {
      localStorage.clear()
    }
    state.customerData = null
    state.customerToken = null
  },
  showAlert (state, payload) {
    switch (payload.type) {
      case 'danger':
        switch (payload.msg.response.status) {
          case 401:
            this.dispatch('logout')
            break
          case 403:
            this.$router.push({ name: 'Pins' })
            break
        }
        if (payload.msg.response.data.errors) {
          this._vm.$bvToast.toast(JSON.stringify(payload.msg.response.data.errors), {
            title: JSON.stringify(payload.msg.response.data.message),
            variant: 'danger',
            noCloseButton: false,
            toaster: 'b-toaster-bottom-right'
          })
        } else {
          this._vm.$bvToast.toast(JSON.stringify(payload.msg.response.data.message), {
            title: JSON.stringify(payload.msg.response.statusText),
            variant: 'danger',
            noCloseButton: false,
            toaster: 'b-toaster-bottom-right'
          })
        }
        break
      default:
        this._vm.$bvToast.toast(payload.msg, {
          title: payload.msg,
          variant: payload.type,
          noCloseButton: false,
          toaster: 'b-toaster-bottom-right'
        })
        break
    }
  },
  setBreadcrumb (state, payload) {
    state.breadcrumb.active = payload.active
    state.breadcrumb.items = payload.items
  },
  setLayout (state, payload) {
    if (payload) {
      state.template.showHides = false
      state.template.hamburger = payload
      state.template.sidebar = 'asc_pariette-sidebar'
      state.template.header = 'asc_pariette-header'
      state.template.main = 'asc_pariette-main'
    } else {
      state.template.showHides = true
      state.template.hamburger = payload
      state.template.sidebar = 'asc_pariette-sidebar asc_pariette-sidebar-hide'
      state.template.header = 'asc_pariette-header asc_pariette-header-full'
      state.template.main = 'asc_pariette-main asc_pariette-main-full'
    }
  },
  setMe (state, payload) {
    state.getMe = payload
  },
  setTableData (state, payload) {
    state.tableData = payload
  },
  setTableRows (state, payload) {
    state.tableRows = payload
  },
  setUploadedStatus (state, payload) {
    state.uploadStatus = payload
  },
  setUploadedPins (state, payload) {
    state.uploaded.success = payload.success
    state.uploaded.error = payload.error
  },
  setUploadedImages (state, payload) {
    state.uploadedImages.name = payload.name
    state.uploadedImages.image = payload.url
  },
  clearToken () {
    if (process.browser) {
      localStorage.setItem('signed', false)
      localStorage.clear()
    }
  }
}
