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
          <InputText id="description" v-model="form.description" type="text" />
          <label for="description">description</label>
        </span>
      </div>
    </div>
    <div class="row p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="activation_energy" v-model="form.activation_energy" type="text" />
          <label for="activation_energy">activation_energy</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="temperature" v-model="form.temperature" type="text" />
          <label for="temperature">temperature</label>
        </span>
      </div>
    </div>
    <div class="row p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="a" v-model="form.a" type="text" />
          <label for="a">a</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="b" v-model="form.b" type="text" />
          <label for="b">b</label>
        </span>
      </div>
    </div>
    <div class="row p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="status" v-model="form.status" type="text" />
          <label for="status">status</label>
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
      pageApi: 'Mix',
      pageTitle: '',
      form: {
        title: null,
        description: null,
        activation_energy: null,
        temperature: null,
        a: null,
        b: null,
        status: null
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
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      await this.$axios.$get(`${this.companyToken}/${this.pageApi}/${this.$route.params.url}`)
        .then((res) => {
          this.pageTitle = res.data.title
          this.form.title = res.data.title
          this.form.description = res.data.description
          this.form.activation_energy = res.data.activation_energy
          this.form.temperature = res.data.temperature
          this.form.a = res.data.a
          this.form.b = res.data.b
          this.form.status = res.data.status
        })
        .catch((err) => {
          console.log(err)
        })
    },
    update () {
      this.$store.dispatch('updateData', { api: this.pageApi, id: this.$route.params.url, info: this.form })
    }
  }
}
</script>
