<template>
  <div>
    <Loader />
    <DataTable
      v-if="tableData"
      ref="dataTable"
      class="p-datatable-sm"
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
          <b-col cols="12" lg="3">
            <h1 class="float-left mr-2">
              {{ breadcrumb.active }}
            </h1>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global']" :placeholder="$t('general.searchTable')" class="p-inputtext-sm" />
            </span>
          </b-col>
          <b-col cols="12" lg="9" align-self="end">
            <div class="float-right">
              <Button v-if="operation.create" icon="pi pi-plus" :label="$t('general.newRecord')" class="p-button-sm p-button-primary" @click="setCreateForm(true)" />
              <Button v-if="operation.export" icon="pi pi-file-excel" :v-tooltip="$t('general.exportTable')" class="p-button-sm p-button-secondary" @click="$refs.dataTable.exportCSV()" />
            </div>
            <div v-if="selectedRow" class="asc_pariette-table-operations">
              <template v-if="operation.links">
                <span v-for="(link, l) in operation.links" :key="'link' + l" class="mr-1">
                  <nuxt-link
                    v-tooltip="$t('general.' + link.route)"
                    :to="`${link.route}${link.query}${selectedRow[selectionLabel]}${link.after ? link.after : ''}${link.afterLabel ? selectedRow[link.afterLabel] : ''}`"
                  >
                    <i :class="link.icon ? link.icon : 'pi pi-link'" />
                  </nuxt-link>
                </span>
                |
              </template>
              <template v-if="showModal">
                <span v-if="operation.edit" v-tooltip="$t('general.edit')">
                  <i class="pi pi-pencil" @click="getData(`${api}/${selectedRow[selectionLabel]}`)" />
                </span>
              </template>
              <template v-else>
                <span v-if="operation.edit" v-tooltip="$t('general.edit')">
                  <nuxt-link :to="`${api}/${selectedRow[selectionLabel]}`"><i class="pi pi-pencil" /></nuxt-link>
                </span>
              </template>
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
        </b-row>
      </template>
      <template #empty>
        no data
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
            <Dropdown v-model="filters[column.col]" :options="column.options" :placeholder="$t('general.searchBy', { x: column.label})" class="p-column-filter" :show-clear="true">
              <template #option="slot">
                <span :class="'customer-badge status-' + slot.option">{{ slot.option }}</span>
              </template>
            </Dropdown>
          </template>
        </template>
        <template #body="slot">
          <span v-if="column.col === 'status'">
            <i v-if="slot.data[column.col] === 1" class="pi pi-check" />
            <i v-else class="pi pi-times" />
          </span>
          <span v-else>{{ slot.data[column.col] }}</span>
        </template>
      </Column>
    </DataTable>

    <Dialog :visible.sync="createModal" :modal="true" :maximizable="true">
      <template #header>
        <h3>{{ $t('form.newRecord') }}</h3>
      </template>
      <div v-if="createForm" class="row p-fluid" :style="{maxWidth: '1000px', width: '50vw'}">
        <div v-for="(row, c) in createForm" :key="'input' + c" :class="create.length >= 6 ? 'col-12 col-md-6 p-field' : 'col-12 p-field'">
          <label>{{ $t('action.' + row.label) }}</label>
          <input v-if="row.type === 'Hidden'" v-model="form[row.label]" type="hidden">
          <InputText v-if="row.type === 'InputText'" v-model="form[row.label]" type="text" />
          <InputNumber v-if="row.type === 'InputNumber'" v-model="form[row.label]" />
          <InputNumber
            v-if="row.type === 'Temperature'"
            v-model="form[row.label]"
            prefix="↑ "
            suffix="℃"
            :min="0"
            :max="40"
          />
          <Textarea v-if="row.type === 'Textarea'" v-model="form[row.label]" rows="4" />
          <template v-if="row.type === 'Calendar'">
            <Calendar
              v-model="form[row.label]"
              :show-time="false"
              :show-icon="true"
              date-format="yy.mm.dd"
              @date-select="setDate(row.label, $event)"
            />
          </template>
          <Password
            v-if="row.type === 'Password'"
            v-model="select[row.label]"
            :feedback="false"
            toggle-mask
          />
          <template v-if="row.type === 'Dropdown'">
            <Dropdown
              v-model="select[row.label]"
              :options="lookup[row.option]"
              :option-label="row.val ? row.val : 'title'"
              :filter="true"
              :show-clear="true"
              @change="setModel(row.label, $event, row.selector)"
            />
          </template>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12 col-md-3">
          <Button :label="$t('form.cancel')" icon="pi pi-times" class="p-button-text" @click="close()" />
        </div>
        <div class="col-12 col-md-6" />
        <div class="col-12 col-md-3">
          <Button :label="$t('form.confirm')" class="float-right" icon="pi pi-check" autofocus @click="createData()" />
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
          edit: false
        }
      }
    },
    create: {
      type: [Array],
      default () {
        return []
      }
    }
  },
  data () {
    return {
      createForm: {},
      selectionMode: 'single',
      search: '',
      perpage: 10,
      customers: null,
      selectedRow: null,
      filters: {},
      form: {},
      select: {},
      createModal: false,
      showingData: [],
      showDataModal: false
    }
  },
  computed: {
    ...mapState(['breadcrumb', 'companyToken', 'tableData', 'lookup'])
  },
  methods: {
    async createData () {
      this.$store.commit('setReturn', 200)
      this.$store.commit('setLoader', true)
      await this.$axios.$post(this.companyToken + '/' + this.api, this.form)
        .then((res) => {
          this.setCreateForm(true)
          this.form = {}
          this.createModal = false
          this.$store.commit('setReturn', 202)
          this.$store.commit('setLoader', false)
          this.$store.dispatch('getTableData', { link: this.api })
        })
        .catch((err) => {
          this.setCreateForm(false)
          this.$store.commit('setLoader', false)
          this.$store.commit('setError', err.message)
        })
    },
    async getData (e) {
      this.$store.commit('setLoader', true)
      await this.$axios.$get(this.companyToken + '/' + e)
        .then((res) => {
          this.$store.commit('setBreadcrumb', { active: this.$t('router.' + this.pageApi), items: { label: 'Akıllı Beton' } })
          this.$store.commit('setLoader', false)
          this.showingData = res.data
          this.showDataModal = true
        })
        .catch((err) => {
          this.setCreateForm(false)
          this.$store.commit('setLoader', false)
          this.$store.commit('setError', err.message)
          this.showDataModal = false
        })
    },
    setDate (model, event) {
      this.select[model] = this.$moment(event).format('YYYY-MM-DD')
      this.form[model] = this.$moment(event).format('YYYY-MM-DD HH:mm:ss')
      console.log('form.' + model + ': ' + this.form[model])
      console.log(this.select[model])
    },
    close () {
      this.createModal = false
    },
    setModel (model, event, selector) {
      if (event.value !== null) {
        this.select[model] = event.value.value
        this.form[model] = event.value[selector]
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
    }
  }
}
</script>
<style>
</style>
