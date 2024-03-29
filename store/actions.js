export default {
  async getNavigation ({ state, commit }) {
    const row = await this.$axios.$get(`${state.companyToken}/Navigation`)
    if (row.status) {
      commit('setNavigation', row.data)
    } else {
      commit('setError', row)
    }
  },
  async getBreadcrumb ({ state, commit }, data) {
    const row = await this.$axios.$get(`${state.companyToken}/Breadcrumb?${data.query}`)
    if (row.status) {
      commit('setBreadcrumb', row.data)
    } else {
      commit('setError', row)
    }
  },
  async getState ({ state, commit }, data) {
    commit('setState', { data: [], label: data.label })
    commit('setLoader', true)
    await this.$axios.$get(`${state.companyToken}/${data.api}`)
      .then((res) => {
        commit('setLoader', false)
        switch (res.code) {
          case 401:
            commit('sendLogin')
            break
          case 404:
            this.$toast.add({ severity: 'warn', summary: res.error, life: 3000 })
            break
          case 200:
            commit('setState', { data: res.data, label: data.label })
            break
          default:
            this.$toast.add({ severity: 'warn', summary: res.error, life: 3000 })
            commit('setState', { data: [], label: data.label })
            break
        }
      })
      .catch((err) => {
        commit('setLoader', false)
        commit('setError', err.message)
      })
  },
  async getSingle ({ state, commit }, data) {
    commit('setState', { data: [], label: data.label })
    commit('setLoader', true)
    await this.$axios.$get(`${state.companyToken}/${data.api}`)
      .then((res) => {
        commit('setLoader', false)
        switch (res.code) {
          case 401:
            commit('sendLogin')
            break
          case 404:
            this.$toast.add({ severity: 'warn', summary: res.error, life: 3000 })
            break
          case 200:
            commit('setSingle', { data: res.data, label: data.label })
            break
          default:
            this.$toast.add({ severity: 'warn', summary: res.error, life: 3000 })
            commit('setSingle', { data: [], label: data.label })
            break
        }
      })
      .catch((err) => {
        commit('setLoader', false)
        commit('setError', err.message)
      })
  },
  async getLookup ({ state, commit }, data) {
    await this.$axios.$get(`${state.companyToken}/${data.api}`)
      .then((res) => {
        if (res.code === 200) {
          if (res.data !== null) {
            commit('setLookup', { data: res.data.items ? res.data.items : res.data, label: data.label })
          }
        } else {
          console.log(res.error, res.code)
        }
      })
      .catch((err) => {
        commit('setError', err.message)
      })
  },
  async getTableState ({ state, commit }, data) {
    commit('setState', { data: [], label: data.label })
    commit('setTableLoader', true)
    await this.$axios.$get(`${state.companyToken}/${data.api}`)
      .then((res) => {
        commit('setTableLoader', false)
        switch (res.code) {
          case 401:
            commit('sendLogin')
            break
          case 404:
            this.$toast.add({ severity: 'warn', summary: res.error, life: 3000 })
            break
          case 200:
            commit('setState', { data: res.data, label: data.label })
            break
          default:
            this.$toast.add({ severity: 'warn', summary: res.error, life: 3000 })
            commit('setState', { data: [], label: data.label })
            break
        }
      })
      .catch((err) => {
        commit('setLoader', false)
        commit('setError', err.message)
      })
  },
  async getCanvas ({ state, commit }, data) {
    const row = await this.$axios.$get(`${state.companyToken}/p/canvas/${data.query}`)
    if (row.status) {
      const pyld = {
        modal: data.modal ? data.modal : false,
        label: data.var,
        value: row.data
      }
      commit('setCanvas', pyld)
    } else {
      this.$toast.error(row.error)
    }
  },
  async showMe ({ state, commit }, data) {
    if (data.param) {
      const res = await this.$axios.$get(`${state.companyToken}/customer/${data.param}`)
      if (res.status) {
        switch (res.code) {
          case 404:
            commit('setState', { data: [], label: data.label })
            commit('setMe', res.error)
            break
          case 200:
            commit('setMe', res.data)
            break
          default:
            commit('setMe', res.error)
            break
        }
      } else {
        this.$toast.add({ severity: 'warn', summary: res.error, life: 3000 })
      }
    }
  },
  async getTableData ({ state, commit }, data) {
    commit('setParietteTable', false)
    commit('setReturn', 0)
    commit('setLoader', true)
    commit('setTableData', [])
    await this.$axios.$get(`${state.companyToken}/${data.link}`)
      .then((res) => {
        commit('setReturn', res.code)
        switch (res.code) {
          case 200:
            commit('setTableData', res.data)
            commit('setParietteTable', true)
            break
        }
        commit('setLoader', false)
      })
      .catch((err) => {
        commit('setLoader', false)
        commit('setError', err.error)
      })
  },
  async createData ({ state, commit }, data) {
    commit('setReturn', 200)
    commit('setLoader', true)
    await this.$axios.$post(`${state.companyToken}/${data.api}`, data.query)
      .then((res) => {
        commit('setLoader', false)
        this.$router.push(this.localeLocation({ name: `Admin-${data.api}` }))
      })
      .catch((err) => {
        commit('setLoader', false)
        commit('setError', err.message)
      })
  },
  async updateData ({ state, commit }, data) {
    commit('setReturn', 200)
    commit('setLoader', true)
    await this.$axios.$put(`${state.companyToken}/${data.api}/${data.id}`, data.info)
      .then((res) => {
        commit('setLoader', false)
        if (res.status) {
          switch (res.code) {
            case 200:
              commit('setReturn', 202)
              break
          }
        } else {
          commit('setReturn', 402)
          commit('setError', res.error)
        }
      })
      .catch((err) => {
        commit('setLoader', false)
        commit('setError', err.message)
      })
  },
  async deleteData ({ state, commit }, data) {
    commit('setReturn', 200)
    await this.$axios.$delete(`${state.companyToken}/${data.api}/${data.info}`)
      .then((res) => {
        commit('setReturn', 203)
      })
      .catch((err) => {
        commit('setError', err.message)
      })
  }
}
