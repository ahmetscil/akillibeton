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
          <b-col cols="12" lg="6">
            <h1 class="float-left mr-2">
              {{ breadcrumb.active }}
            </h1>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global']" :placeholder="$t('general.searchTable')" class="p-inputtext-sm" />
            </span>
          </b-col>
          <b-col align-self="end">
            <div class="float-right">
              <Button v-if="operation.create" icon="pi pi-plus" :label="$t('general.newRecord')" class="p-button-sm p-button-primary" @click="newData()" />
              <Button v-if="operation.export" icon="pi pi-external-link" :v-tooltip="$t('general.exportTable')" class="p-button-sm p-button-secondary" @click="exportTable($event)" />
            </div>
            <div v-if="selectedRow" class="asc_pariette-table-operations">
              {{ selectedRow.sku }}
              <span v-if="operation.edit" v-tooltip="$t('general.edit')">
                <nuxt-link :to="'/' + selectedRow.id"><i class="pi pi-pencil" /></nuxt-link>
              </span>
              <span v-if="operation.preview" v-tooltip="$t('general.preview')">
                <nuxt-link :to="'/' + selectedRow.id"><i class="pi pi-link" /></nuxt-link>
              </span>
              <span v-if="operation.stop" v-tooltip="$t('general.stop')">
                <nuxt-link :to="'/' + selectedRow.id"><i class="pi pi-ban" /></nuxt-link>
              </span>
              <span v-if="operation.actions" v-tooltip="$t('general.actions')">
                <nuxt-link :to="'/' + selectedRow.id"><i class="pi pi-bolt" /></nuxt-link>
              </span>
              <span v-if="operation.status" v-tooltip="$t('general.status')">
                <nuxt-link :to="'/' + selectedRow.id"><i class="pi pi-bookmark" /></nuxt-link>
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
            <InputText v-model="filters[column.label]" type="text" class="p-column-filter p-inputtext-sm" :placeholder="$t('general.searchBy', { x: column.label})" />
          </template>
          <template v-if="column.type === 'MultiSelect'">
            <MultiSelect
              v-model="filters[column.label]"
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
            <Calendar v-model="filters[column.label]" date-format="yyyy-mm-dd" class="p-column-filter" :placeholder="$t('general.searchBy', { x: column.label})" />
          </template>
          <template v-if="column.type === 'Dropdown'">
            <Dropdown v-model="filters[column.label]" :options="column.options" :placeholder="$t('general.searchBy', { x: column.label})" class="p-column-filter" :show-clear="true">
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
    <Dialog :visible.sync="createModal">
      <template #header>
        <h3>{{ $t('form.newRecord') }}</h3>
      </template>
      <div class="row p-fluid" :style="{maxWidth: '1000px', width: '50vw'}">
        <div v-for="(row, c) in create" :key="'input' + c" :class="create.length >= 6 ? 'col-12 col-md-6 p-field' : 'col-12 p-field'">
          <label>{{ $t('action.' + row.label) }}</label>
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
          <Calendar
            v-if="row.type === 'Calendar'"
            v-model="form[row.label]"
            :show-time="false"
            :show-icon="true"
            date-format="yy-mm-dd"
          />
        </div>
      </div>
      <template #footer>
        <Button :label="$t('form.cancel')" icon="pi pi-times" class="p-button-text" @click="createModal = false" />
        <Button :label="$t('form.confirm')" icon="pi pi-check" autofocus @click="createData()" />
      </template>
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
      selectionMode: 'single',
      createModal: false,
      search: '',
      perpage: 10,
      customers: null,
      selectedRow: null,
      filters: {},
      form: {}
    }
  },
  computed: {
    ...mapState(['breadcrumb', 'tableData'])
  },
  methods: {
    createData () {
      this.$store.dispatch('createData', { api: this.api, query: this.form })
    },
    exportTable () {
      this.$refs.dataTable.exportCSV()
    },
    newData () {
      this.createModal = true
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
    }
  }
}
</script>
<style>
</style>
