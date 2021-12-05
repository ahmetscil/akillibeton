<template>
  <div>
    <DataTable
      v-if="items"
      ref="dt"
      class="p-datatable-sm"
      :value="items"
      :paginator="true"
      :rows="perpage"
      data-key="slug"
      :row-hover="true"
      selection-mode="single"
      :selection.sync="selectedRow"
      :filters="filters"
      :loading="loading"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[5,10,25,50]"
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
              <Button icon="pi pi-plus" :label="$t('general.newRecord')" class="p-button-sm p-button-primary" @click="newData()" />
              <Button icon="pi pi-external-link" :label="$t('general.exportTable')" class="p-button-sm p-button-secondary" @click="exportTable($event)" />
            </div>
            <div v-if="selectedRow" class="asc_pariette-table-operations">
              {{ selectedRow.sku }}
              <span v-if="operation.edit" v-tooltip="$t('general.edit')">
                <nuxt-link :to="'/' + selectedRow.slug"><i class="pi pi-pencil" /></nuxt-link>
              </span>
              <span v-if="operation.preview" v-tooltip="$t('general.preview')">
                <nuxt-link :to="'/' + selectedRow.slug"><i class="pi pi-link" /></nuxt-link>
              </span>
              <span v-if="operation.stop" v-tooltip="$t('general.stop')">
                <nuxt-link :to="'/' + selectedRow.slug"><i class="pi pi-ban" /></nuxt-link>
              </span>
              <span v-if="operation.actions" v-tooltip="$t('general.actions')">
                <nuxt-link :to="'/' + selectedRow.slug"><i class="pi pi-bolt" /></nuxt-link>
              </span>
              <span v-if="operation.status" v-tooltip="$t('general.status')">
                <nuxt-link :to="'/' + selectedRow.slug"><i class="pi pi-bookmark" /></nuxt-link>
              </span>
            </div>
          </b-col>
        </b-row>
        <div class="clearfix" />
      </template>
      <template #empty>
        no data
      </template>
      <template #loading>
        <ProgressSpinner />
      </template>
      <!-- <Column selection-mode="single" header-style="width: 3em" /> -->
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
    <Dialog :visible.sync="showModal">
      <template #header>
        <h3>{{ $t('form.newRecord') }}</h3>
      </template>
      <div class="p-fluid">
        <div class="p-field">
          <label>{{ $t('form.title') }}</label>
          <InputText v-model="form.title" type="text" />
        </div>
        <div class="p-field my-2">
          <label>{{ $t('form.description') }}</label>
          <Textarea v-model="form.description" rows="4" />
        </div>
      </div>
      <template #footer>
        <Button :label="$t('form.cancel')" icon="pi pi-times" class="p-button-text" />
        <Button :label="$t('form.confirm')" icon="pi pi-check" autofocus />
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
    operation: {
      type: [Object],
      default () {
        return {
          stop: false,
          actions: false,
          status: false,
          preview: false,
          edit: false
        }
      }
    },
    items: {
      type: [Array],
      default () {
        return [
          { id: 1, title: 'Volkswagen', year: 2012, color: 'Orange', vin: 'dsad231ff', date: '2021-11-01 21:24:12', status: true },
          { id: 2, title: 'Audi', year: 2011, color: 'Black', vin: 'gwregre345', date: '2021-11-01 21:24:12', status: true },
          { id: 3, title: 'Renault', year: 2005, color: 'Gray', vin: 'h354htr', date: '2021-11-01 21:24:12', status: true },
          { id: 4, title: 'BMW', year: 2003, color: 'Blue', vin: 'j6w54qgh', date: '2021-11-01 21:24:12', status: true },
          { id: 5, title: 'Mercedes', year: 1995, color: 'Orange', vin: 'hrtwy34', date: '2021-11-01 21:24:12', status: true },
          { id: 6, title: 'Volvo', year: 2005, color: 'Black', vin: 'jejtyj', date: '2021-11-01 21:24:12', status: true },
          { id: 7, title: 'Honda', year: 2012, color: 'Yellow', vin: 'g43gr', date: '2021-11-01 21:24:12', status: true },
          { id: 8, title: 'Jaguar', year: 2013, color: 'Orange', vin: 'greg34', date: '2021-11-01 21:24:12', status: true },
          { id: 9, title: 'Ford', year: 2000, color: 'Black', vin: 'h54hw5', date: '2021-11-01 21:24:12', status: true },
          { id: 10, title: 'Fiat', year: 2013, color: 'Red', vin: '245t2s', date: '2021-11-01 21:24:12', status: true }
        ]
      }
    }
  },
  data () {
    return {
      showModal: false,
      search: '',
      perpage: 10,
      customers: null,
      selectedRow: null,
      filters: {},
      loading: false,
      statuses: [true, false],
      colors: ['Orange', 'Black', 'Gray', 'Blue', 'Yellow', 'Red'],
      form: {
        title: null,
        description: null
      }
    }
  },
  computed: {
    ...mapState(['breadcrumb'])
  },
  created () {
  },
  mounted () {
  },
  methods: {
    exportTable () {
      this.$refs.dt.exportCSV()
    },
    newData () {
      this.showModal = true
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
