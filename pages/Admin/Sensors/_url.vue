<template>
  <div class="asc_pariette-pagecard">
    <div class="row p-fluid p-grid">
      <div class="p-field col-12 col-md-6 pl-4">
        <h2>
          {{ pageTitle }}
        </h2>
      </div>
      <div class="p-field col-12 col-md-6 pr-4">
        <div class="float-right">
          <Button icon="pi pi-pencil" :label="$t('general.update')" class="p-button-sm p-button-warning" @click="update()" />
        </div>
      </div>
    </div>
    <div class="row p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="title" v-model="form.title" type="text" />
          <label for="title">title</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="status" v-model="form.status" type="text" />
          <label for="status">status</label>
        </span>
      </div>
    </div>
    <div class="row p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="sensor_no" v-model="form.sensor_no" type="text" />
          <label for="sensor_no">sensor_no</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="type" v-model="form.type" type="text" />
          <label for="type">type</label>
        </span>
      </div>
    </div>
    <div class="row p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="description" v-model="form.description" type="text" />
          <label for="description">description</label>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      pageApi: 'Sensors',
      pageTitle: '',
      form: {
        type: null,
        title: null,
        description: null,
        status: null,
        sensor_no: null
      }
    }
  },
  computed: mapState(['returnCode', 'companyToken']),
  watch: {
    'returnCode' (e) {
      switch (e) {
        case 202:
          this.$toast.add({ severity: 'success', summary: this.$t('general.success'), life: 3000 })
          setTimeout(() => {
            this.getData()
          }, 200)
          break
        case 203:
          this.$toast.add({ severity: 'success', summary: this.$t('general.updated'), life: 3000 })
          setTimeout(() => {
            this.getData()
          }, 200)
          break
        case 402:
          this.$toast.add({ severity: 'warn', summary: this.$t('general.error'), life: 3000 })
          break
      }
    },
    '$route' () {
      this.isShowTable = false
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.$store.dispatch('getBreadcrumb', { query: this.$route.params.url })
      await this.$axios.$get(`${this.companyToken}/${this.pageApi}/${this.$route.params.url}`)
        .then((res) => {
          this.pageTitle = res.data.title
          this.form.type = res.data.type
          this.form.title = res.data.title
          this.form.description = res.data.description
          this.form.status = res.data.status
          this.form.sensor_no = res.data.sensor_no
        })
        .catch((err) => {
          console.log(err)
        })
      setTimeout(() => {
        this.isShowTable = true
      }, 100)
    },
    update () {
      this.$store.dispatch('updateData', { api: this.pageApi, id: this.$route.params.url, info: this.form })
    }
  }
}
</script>
