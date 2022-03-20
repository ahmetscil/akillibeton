<template>
  <div>
    <DataTable
      v-if="showParietteTable"
      ref="dataTable"
      class="p-datatable-sm"
      responsive-layout="scroll"
      :value="tableData"
      :paginator="true"
      :rows="perpage"
      data-key="id"
      :row-hover="true"
      :selection-mode="selectionMode"
      :selection.sync="selectedRow"
      :filters="filters"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[10, 25, 50, 250, 500]"
      current-page-report-template="{first} - {last} / {totalRecords}"
    >
      <template #header>
        <b-row class="mb-1">
          <b-col cols="12" lg="6">
            <h1 class="float-left mr-2">
              {{ $t('router.' + breadcrumb.active ) }}
            </h1>
            <div v-if="selectedRow" class="asc_pariette-table-operations">
              <template v-if="operation.links">
                <span v-for="(link, l) in operation.links" :key="'link' + l" class="mr-1">
                  <nuxt-link
                    v-tooltip="$t('general.' + link.name)"
                    :to="`${link.route}${link.query}${selectedRow[selectionLabel]}${link.after ? link.after : ''}${link.afterLabel ? selectedRow[link.afterLabel] : ''}`"
                  >
                    <i :class="link.icon ? link.icon : 'pi pi-link'" />
                  </nuxt-link>
                </span>
                |
              </template>
              <span v-if="operation.update" v-tooltip="$t('general.edit')">
                <span v-if="showModal">
                  <i class="pi pi-pencil" @click="setUpdateForm(`${api}/${selectedRow[selectionLabel]}`)" />
                </span>
                <span v-else>
                  <nuxt-link :to="`${api}/${selectedRow[selectionLabel]}`">
                    <i class="pi pi-pencil" />
                  </nuxt-link>
                </span>
              </span>
              <span v-if="operation.preview" v-tooltip="$t('general.preview')">
                <nuxt-link :to="`${api}/${selectedRow[selectionLabel]}`"><i class="pi pi-link" /></nuxt-link>
              </span>
              <span v-if="operation.stop" v-tooltip="$t('general.stop')">
                <nuxt-link :to="`${api}/${selectedRow[selectionLabel]}`"><i class="pi pi-ban" /></nuxt-link>
              </span>
              <span v-if="operation.actions" v-tooltip="$t('general.actions')">
                <nuxt-link :to="`${api}/${selectedRow[selectionLabel]}`"><i class="pi pi-bolt" /></nuxt-link>
              </span>
              <span v-if="operation.status" v-tooltip="$t('general.status')">
                <nuxt-link :to="`${api}/${selectedRow[selectionLabel]}`"><i class="pi pi-bookmark" /></nuxt-link>
              </span>
              <span v-if="operation.redirect" v-tooltip="$t('general.status')">
                <nuxt-link :to="`${operation.redirect}${selectedRow[selectionLabel]}`"><i class="pi pi-link" /></nuxt-link>
              </span>
            </div>
          </b-col>
          <b-col cols="12" lg="6" align-self="end">
            <div class="float-right">
              <div v-if="operation.activePassive" style="width: 120px; float:left; margin: 8px 1rem 0 0">
                <v-select
                  v-model="apiFilter.statusText"
                  label="key"
                  :clearable="false"
                  :options="lookup.statusList"
                  :placeholder="$t('general.status')"
                  @input="getFilteredData"
                />
              </div>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global']" :placeholder="$t('general.searchTable')" class="p-inputtext-sm" />
              </span>
              <Button v-if="operation.addUser" icon="pi pi-users" :v-tooltip="$t('general.newUser')" class="p-button-sm p-button-success" @click="getMiniUserList()" />
              <Button v-if="operation.create" icon="pi pi-plus" :v-tooltip="$t('general.newRecord')" class="p-button-sm p-button-primary" @click="setCreateForm(true)" />
              <Button v-if="operation.export" icon="pi pi-file-excel" :v-tooltip="$t('general.exportTable')" class="p-button-sm p-button-secondary" @click="$refs.dataTable.exportCSV()" />
            </div>
          </b-col>
        </b-row>
      </template>
      <template #empty>
        <Message severity="warn" :closable="false">
          {{ $t('general.notFound') }}
        </Message>
      </template>
      <Column v-if="selectionMode === 'multiple'" selection-mode="single" header-style="width: 3em" />
      <Column
        v-for="(column, c) in head"
        :key="'column' + c"
        :field="column.col"
        :header="column.label"
        :sortable="column.sortable"
      >
        <template v-if="column.filter" #filter>
          <template v-if="column.type === 'InputText'">
            <InputText v-model="filters[column.col]" type="text" class="p-column-filter p-inputtext-sm" :placeholder="$t('general.searchBy', { x: column.label})" />
          </template>
          <template v-if="column.type === 'MultiSelect'">
            <MultiSelect
              v-model="filters[column.col]"
              :options="column.options"
              placeholder="All"
              class="p-column-filter"
            >
              <template #option="slot">
                <div class="p-multiselect-color-option">
                  <span class="image-text">{{ slot.option }}</span>
                </div>
              </template>
            </MultiSelect>
          </template>
          <template v-if="column.type === 'Calendar'">
            <Calendar v-model="filters[column.col]" date-format="yyyy-mm-dd" class="p-column-filter" :placeholder="$t('general.searchBy', { x: column.label})" />
          </template>
          <template v-if="column.type === 'Dropdown'">
            <v-select
              v-model="filters[column.col]"
              :label="column.val ? column.val : 'title'"
              :clearable="false"
              :options="lookup[column.options]"
              :placeholder="$t('general.searchBy', { x: column.label})"
              @input="setModel(column.col, $event, column.selector)"
            />
          </template>
          <template v-if="column.type === 'Boolean'">
            {{ filters[column.col] }}
          </template>
        </template>
        <template #body="slot">
          <span v-if="column.col === 'admin'">
            <i v-if="slot.data[column.col] === '1'" class="pi pi-check" />
            <i v-else class="pi pi-times" />
          </span>
          <span v-else-if="column.col === 'boss'">
            <i v-if="slot.data[column.col] === '1'" class="pi pi-check" />
            <i v-else class="pi pi-times" />
          </span>
          <span v-else-if="column.col === 'status'">
            <span v-if="slot.data[column.col] === '0'">
              {{ $t('action.passive') }}
            </span>
            <span v-else-if="slot.data[column.col] === '1'">
              {{ $t('action.active') }}
            </span>
            <span v-else>
              {{ $t('action.waiting') }}
            </span>
          </span>
          <span v-else-if="column.col === 'sf'">
            <template v-if="slot.data[column.col]">
              {{ $t(`action.signal${slot.data[column.col]}`) }}
            </template>
            <template v-else>
              no signal
            </template>
          </span>
          <span v-else>{{ slot.data[column.col] }}</span>
        </template>
      </Column>
    </DataTable>

    <ParietteLoader v-if="!showParietteTable" />

    <Dialog :visible.sync="createModal" :modal="true" :maximizable="true">
      <template #header>
        <h3>{{ $t('form.newRecord') }}</h3>
      </template>
      <div v-if="createForm" class="row p-fluid" :style="{maxWidth: '1000px', width: '50vw'}">
        <div
          v-for="(row, c) in createForm"
          :key="'input' + c"
          :class="create.length >= 6 ? 'col-12 col-md-6 p-field' : 'col-12 p-field'"
        >
          <div>
            <label>{{ $t('action.' + row.label) }}</label>
            <input v-if="row.type === 'Hidden'" v-model="form[row.label]" type="hidden">

            <InputMask
              v-if="row.type === 'InputPhone'"
              v-model="form[row.label]"
              mask="(999)-9999999"
              :required="row.required"
              type="text"
            />

            <InputText
              v-if="row.type === 'InputMail'"
              v-model="form[row.label]"
              :required="row.required"
              type="email"
              @blur="validateEmail(form[row.label])"
            />

            <InputText
              v-if="row.type === 'InputText'"
              v-model="form[row.label]"
              :required="row.required"
              type="text"
            />

            <InputText
              v-if="row.type === 'InputNumber'"
              v-model="form[row.label]"
              :required="row.required"
            />

            <InputText
              v-if="row.type === 'Temperature'"
              v-model="form[row.label]"
              :required="row.required"
              prefix="↑ "
              suffix="℃"
            />

            <Textarea
              v-if="row.type === 'Textarea'"
              v-model="form[row.label]"
              :required="row.required"
              rows="4"
            />

            <Calendar
              v-if="row.type === 'Calendar'"
              v-model="select[row.label]"
              :show-time="false"
              :show-icon="true"
              :required="row.required"
              date-format="yy.mm.dd"
              @date-select="setDate(row.label, $event)"
            />

            <Password
              v-if="row.type === 'Password'"
              v-model="form[row.label]"
              :required="row.required"
              :feedback="false"
              toggle-mask
            />

            <v-select
              v-if="row.type === 'Dropdown'"
              v-model="select[row.label]"
              :label="row.val ? row.val : 'title'"
              :clearable="false"
              :options="row.static ? row.option : lookup[row.option]"
              :required="row.required"
              @input="setModel(row.label, $event, row.selector)"
            />
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12 col-md-3">
          <Button :label="$t('form.cancel')" icon="pi pi-times" class="p-button-text" @click="close()" />
        </div>
        <div class="col-12 col-md-6" />
        <div class="col-12 col-md-3">
          <Button :label="$t('form.confirm')" class="float-right" icon="pi pi-check" autofocus @click="createData(form)" />
        </div>
      </div>
    </Dialog>

    <Dialog :visible.sync="updateModal" :modal="true" :maximizable="true">
      <template #header>
        <h3>{{ $t('form.updateRecord') }}</h3>
      </template>
      <div v-if="updateForm" class="row p-fluid" :style="{maxWidth: '1000px', width: '50vw'}">
        <div v-for="(row, c) in updateForm" :key="'input' + c" :class="create.length >= 6 ? 'col-12 col-md-6 p-field' : 'col-12 p-field'">
          <label>{{ $t('action.' + row.label) }}</label>
          <input
            v-if="row.type === 'Hidden'"
            v-model="form[row.label]"
            type="hidden"
          >

          <InputText
            v-else-if="row.type === 'InputText'"
            v-model="form[row.label]"
            type="text"
          />

          <InputMask
            v-else-if="row.type === 'InputPhone'"
            v-model="form[row.label]"
            mask="(999)-9999999"
            :required="row.required"
            type="text"
          />

          <InputText
            v-else-if="row.type === 'InputMail'"
            v-model="form[row.label]"
            :required="row.required"
            type="email"
            @blur="validateEmail(form[row.label])"
          />

          <InputText
            v-else-if="row.type === 'InputNumber'"
            v-model="form[row.label]"
            type="number"
          />

          <InputText
            v-else-if="row.type === 'Temperature'"
            v-model="form[row.label]"
            prefix="↑ "
            suffix="℃"
            type="number"
          />

          <Textarea
            v-else-if="row.type === 'Textarea'"
            v-model="form[row.label]"
            rows="4"
          />

          <template v-else-if="row.type === 'Calendar'">
            <Calendar
              v-model="form[row.label]"
              :show-time="false"
              :show-icon="true"
              date-format="yy.mm.dd"
              @date-select="setDate(row.label, $event)"
            />
          </template>

          <Password
            v-else-if="row.type === 'Password'"
            v-model="form[row.label]"
            :feedback="false"
            toggle-mask
          />

          <template v-else-if="row.type === 'Dropdown'">
            <v-select
              v-model="select[row.label]"
              :label="row.val ? row.val : 'title'"
              :clearable="false"
              :options="lookup[row.option]"
              @input="setModel(row.label, $event, row.selector)"
            />
          </template>

          <template v-else-if="row.type === 'Switch'">
            <ToggleButton v-model="form[row.label]" on-icon="pi pi-check" off-icon="pi pi-times" @change="setSwitch(row.label, $event, row.selector)" />
          </template>

          <InputText
            v-else
            v-model="form[row.label]"
            type="text"
          />
        </div>

        <div v-if="operation.updatePassword">
          <div class="p-field p-col-12 p-md-4">
            <label for="basic">
              {{ $t('auth.password') }}
            </label>
            <Password v-model="user.password" :feedback="false" toggle-mask />
          </div>
          <div class="p-field p-col-12 p-md-4">
            <Button :label="$t('form.updatePassword')" icon="pi pi-check" @click="updatePass()" />
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12 col-md-3">
          <Button :label="$t('form.cancel')" icon="pi pi-times" class="p-button-text" @click="close()" />
        </div>
        <div class="col-12 col-md-6" />
        <div class="col-12 col-md-3">
          <Button :label="$t('form.update')" class="float-right" icon="pi pi-check" autofocus @click="updateData()" />
        </div>
      </div>
    </Dialog>

    <Dialog :visible.sync="showDataModal" :modal="true">
      <template #header>
        <h3>{{ $t('form.detail') }}</h3>
      </template>
      <div class="row p-fluid" :style="{maxWidth: '1000px', width: '50vw'}">
        <div v-for="(row, c) in dataFields" :key="'show' + c" :class="dataFields.length >= 6 ? 'col-12 col-md-6 p-field' : 'col-12 p-field'">
          <h6>{{ row }}</h6>
          <h4>{{ showingData[row] }}</h4>
        </div>
      </div>
    </Dialog>

    <Dialog :visible.sync="newUserModal" :modal="true">
      <template #header>
        <h3>{{ $t('form.addNewUser') }}</h3>
      </template>
      <div class="row p-fluid" :style="{maxWidth: '1000px', width: '50vw'}">
        <div class="col-12 p-field">
          <label>{{ $t('action.user') }}</label>
          <v-select
            v-model="newUser.name"
            label="name"
            :clearable="false"
            :options="miniUserList"
            @input="setNewUser"
          />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12 col-md-3">
          <Button :label="$t('form.cancel')" icon="pi pi-times" class="p-button-text" @click="close()" />
        </div>
        <div class="col-12 col-md-6" />
        <div class="col-12 col-md-3">
          <Button :label="$t('form.update')" class="float-right" icon="pi pi-check" autofocus @click="createData(newUser, 'Authority')" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    head: {
      type: [Array],
      default () {
        return []
      }
    },
    api: {
      type: [String],
      default: ''
    },
    selectionLabel: {
      type: [String],
      default: 'id'
    },
    showModal: {
      type: [Boolean],
      default: false
    },
    dataFields: {
      type: [Array],
      default () {
        return ['title', 'id']
      }
    },
    operation: {
      type: [Object],
      default () {
        return {
          create: true,
          export: true,
          stop: false,
          actions: false,
          status: false,
          preview: false,
          update: false
        }
      }
    },
    create: {
      type: [Array],
      default () {
        return []
      }
    },
    update: {
      type: [Array],
      default () {
        return []
      }
    }
  },
  data () {
    return {
      newUserModal: false,
      updateForm: {},
      createForm: {},
      apiFilter: {
        statusText: 'Aktif',
        status: 1
      },
      newUser: {
        name: '',
        project: null,
        user: null,
        company: '',
        status: '1'
      },
      updateApi: '',
      selectionMode: 'single',
      search: '',
      perpage: 10,
      customers: null,
      selectedRow: null,
      filters: {},
      form: {
        DevEUI: '',
        activation_energy: 0,
        temperature: 0,
        max_temp: 0,
        min_temp: 0,
        days: 0,
        strength: 0,
        password: null
      },
      user: {
        password: ''
      },
      select: {
        company: null,
        country: null,
        sensor_no: null,
        project: null,
        started_at: null,
        ended_at: null,
        deployed_at: null,
        last_data_at: null,
        last_mail_sended_at: null,
        mix: null,
        sensor: null,
        status: null,
        days: null,
        type: null,
        strength: null
      },
      updateModal: false,
      createModal: false,
      showingData: [],
      showDataModal: false,
      miniUserList: []
    }
  },
  computed: {
    ...mapState(['breadcrumb', 'companyToken', 'tableData', 'lookup', 'returnCode', 'projectList', 'showParietteTable'])
  },
  watch: {
    'returnCode' (e) {
      switch (e) {
        case 403:
          this.$toast.add({ severity: 'warn', summary: 'authorization Error', life: 3000 })
          this.$router.push(this.localeLocation({ name: 'Admin-Dashboard' }))
          break
        case 500:
          this.$toast.add({ severity: 'warn', summary: 'Lütfen Tekrar Deneyin', life: 3000 })
          break
      }
    }
  },
  mounted () {
    this.getData()
    this.$store.dispatch('getLookup', { api: 'Lookup/statusList', label: 'statusList' })
  },
  methods: {
    async createData (form, api = this.api) {
      this.$store.commit('setReturn', 200)
      this.$store.commit('setLoader', true)
      await this.$axios.$post(this.companyToken + '/' + api, form)
        .then((res) => {
          if (res.status === false) {
            if (res.code === 500) {
              this.$toast.add({ severity: 'warn', summary: this.$t(res.error), life: 3000 })
            } else {
              this.$toast.add({ severity: 'warn', summary: 'error', life: 3000 })
              this.setCreateForm(false)
              this.newUserModal = false
            }
          } else {
            if (res.data.authority) {
              const bb = { data: { authority: res.data.authority } }
              this.$store.commit('setSelectSite', bb)
              this.$store.commit('setSidebar', true)
            }
            this.setCreateForm(true)
            this.form = {}
            this.createModal = false
            this.$store.commit('setReturn', 202)
            this.$store.commit('setLoader', false)
            this.getData()
          }
        })
        .catch((err) => {
          this.setCreateForm(false)
          this.$store.commit('setLoader', false)
          this.$store.commit('setError', err.message)
        })
    },
    async updateData () {
      this.$store.commit('setReturn', 200)
      this.$store.commit('setLoader', true)
      await this.$axios.$put(this.updateApi, this.form)
        .then((res) => {
          if (res.status) {
            this.form = {}
            this.updateModal = false
            this.$store.commit('setReturn', 203)
            this.$store.commit('setLoader', false)
            this.apiFilter.statusText = 'Aktif'
            this.apiFilter.status = 1
            this.getData()
          } else {
            this.getData()
            this.$store.commit('setReturn', 500)
            this.$toast.add({ severity: 'warn', summary: res.error, life: 3000 })
          }
        })
        .catch((err) => {
          this.updateModal = true
          this.$store.commit('setLoader', false)
          const msgType = typeof err.message
          this.getData()
          if (msgType === 'string') {
            this.$toast.add({ severity: 'warn', summary: err.message, life: 3000 })
          } else if (msgType === 'object') {
            for (const property in err.message) {
              this.$toast.add({ severity: 'warn', summary: err.message[property], life: 3000 })
            }
          }
        })
    },
    async updatePass () {
      this.$store.commit('setReturn', 200)
      this.$store.commit('setLoader', true)
      await this.$axios.$put(`${this.companyToken}/Users/UpdatePassword/${this.selectedRow[this.selectionLabel]}`, this.user)
        .then((res) => {
          if (res.status) {
            this.form = {}
            this.updateModal = false
            this.$store.commit('setReturn', 203)
            this.$store.commit('setLoader', false)
            this.apiFilter.statusText = 'Aktif'
            this.apiFilter.status = 1
            this.getData()
          } else {
            this.getData()
            this.$store.commit('setReturn', 500)
            this.$toast.add({ severity: 'warn', summary: res.error, life: 3000 })
          }
        })
        .catch((err) => {
          this.updateModal = true
          this.$store.commit('setLoader', false)
          const msgType = typeof err.message
          this.getData()
          if (msgType === 'string') {
            this.$toast.add({ severity: 'warn', summary: err.message, life: 3000 })
          } else if (msgType === 'object') {
            for (const property in err.message) {
              this.$toast.add({ severity: 'warn', summary: err.message[property], life: 3000 })
            }
          }
        })
    },
    async setUpdateForm (e) {
      this.$store.commit('setLoader', true)
      this.updateApi = this.companyToken + '/' + e
      this.clearSelect()
      await this.$axios.$get(this.updateApi)
        .then((res) => {
          this.$store.commit('setLoader', false)
          this.showingData = res.data
          this.updateModal = true
          const frm = this.update
          frm.forEach((c) => {
            const a = this.showingData[c.label]
            if (isNaN(a)) {
              this.form[c.label] = a
            } else {
              this.form[c.label] = parseInt(a)
            }
            const nm = c.label + 'Name'
            if (this.showingData[nm]) {
              this.select[c.label] = this.showingData[nm]
            } else {
              this.select[c.label] = this.showingData[c.label]
            }
            if (c.label === 'status') {
              this.select[c.label] = parseInt(this.showingData[c.label]) === 1 ? 'Aktif' : 'Pasif'
            }
          })
          this.updateForm = frm.filter(f => f.type !== 'Hidden')
        })
        .catch((err) => {
          this.setCreateForm(false)
          this.$store.commit('setLoader', false)
          this.$store.commit('setError', err.message)
          this.updateModal = false
        })
    },
    async getMiniUserList () {
      await this.$axios.$get(`${this.companyToken}/Users?miniUserList=true`)
        .then((res) => {
          this.miniUserList = res.data
          this.newUserModal = true
        })
    },
    setNewUser (e) {
      this.newUser.name = e.userName
      this.newUser.project = parseInt(e.project)
      this.newUser.user = parseInt(e.id)
      this.newUser.company = parseInt(e.company)
    },
    getData () {
      let apilink = this.api
      if (process.browser) {
        if (window.location.search) {
          apilink = this.api + window.location.search
        }
      }
      this.$store.dispatch('getTableData', { link: apilink })
    },
    getFilteredData (e) {
      // this.apiFilter.statusText = e.key
      this.apiFilter.status = e.value
      let apilink = this.api
      if (process.browser) {
        if (window.location.search) {
          apilink = `${this.api + window.location.search}&status=${this.apiFilter.status}`
        } else {
          apilink = `${this.api}?status=${this.apiFilter.status}`
        }
      }
      this.$store.dispatch('getTableData', { link: apilink })
    },
    setDate (model, event) {
      this.select[model] = this.$moment(event).format('YYYY-MM-DD')
      this.form[model] = this.$moment(event).format('YYYY-MM-DD HH:mm:ss')
    },
    validateEmail (e) {
      let show = false
      if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
        show = false
      } else {
        show = true
      }
      if (show) {
        this.$toast.add({ severity: 'warn', summary: this.$t('form.typeEmail'), life: 3000 })
      }
    },
    close () {
      this.createModal = false
      this.updateModal = false
    },
    setModel (model, event, selector) {
      this.select[model] = event.title ? event.title : event.key
      this.form[model] = event[selector]
    },
    setSwitch (model, event, selector) {
      this.form[model] = event
      if (event.value !== null) {
        this.select[model] = event.value.value
        this.form[model] = event[selector]
      }
    },
    filterDate (value, filter) {
      if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true
      }

      if (value === undefined || value === null) {
        return false
      }

      return value === this.formatDate(filter)
    },
    formatDate (date) {
      let month = date.getMonth() + 1
      let day = date.getDate()

      if (month < 10) {
        month = '0' + month
      }

      if (day < 10) {
        day = '0' + day
      }

      return date.getFullYear() + '-' + month + '-' + day
    },
    setCreateForm (e) {
      const frm = this.create
      if (e) {
        frm.forEach((c) => {
          if (c.default) {
            this.form[c.label] = c.default
            this.select[c.label] = c.default
          } else {
            this.form[c.label] = ''
            this.select[c.label] = ''
          }
        })
      }
      this.createForm = frm.filter(f => f.type !== 'Hidden')
      this.createModal = e
    },
    clearSelect () {
      this.select.company = null
      this.select.country = null
      this.select.sensor_no = null
      this.select.project = null
      this.select.started_at = null
      this.select.ended_at = null
      this.select.deployed_at = null
      this.select.last_data_at = null
      this.select.last_mail_sended_at = null
      this.select.mix = null
      this.select.sensor = null
      this.select.status = null
      this.select.days = null
      this.select.strength = null
      this.form.activation_energy = 0
      this.form.temperature = 0
      this.form.max_temp = 0
      this.form.min_temp = 0
      this.form.days = 0
      this.form.strength = 0
    }
  }
}
</script>
