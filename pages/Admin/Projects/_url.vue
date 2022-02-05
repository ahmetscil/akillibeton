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
          <InputText id="formTitle" v-model="form.title" type="text" />
          <label for="formTitle">title</label>
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
          <InputText id="code" v-model="form.code" type="text" />
          <label for="code">code</label>
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
          <InputText id="email_title" v-model="form.email_title" type="text" />
          <label for="email_title">email_title</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="email" v-model="form.email" type="text" />
          <label for="email">email</label>
        </span>
      </div>
    </div>
    <div class="row p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="telephone_title" v-model="form.telephone_title" type="text" />
          <label for="telephone_title">telephone_title</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="telephone" v-model="form.telephone" type="text" />
          <label for="telephone">telephone</label>
        </span>
      </div>
    </div>
    <div class="row p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="country" v-model="form.country" type="text" />
          <label for="country">country</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="city" v-model="form.city" type="text" />
          <label for="city">city</label>
        </span>
      </div>
    </div>
    <div class="row p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="address" v-model="form.address" type="text" />
          <label for="address">address</label>
        </span>
      </div>
      <!-- <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="logo" v-model="form.logo" type="text" />
          <label for="logo">logo</label>
        </span>
      </div> -->
    </div>
    <div class="row p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="started_at" v-model="form.started_at" type="text" />
          <label for="started_at">started_at</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="ended_at" v-model="form.ended_at" type="text" />
          <label for="ended_at">ended_at</label>
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
      pageApi: 'Projects',
      pageTitle: '',
      form: {
        code: null,
        title: null,
        description: null,
        email_title: null,
        email: null,
        telephone_title: null,
        telephone: null,
        country: null,
        city: null,
        address: null,
        logo: null,
        started_at: null,
        ended_at: null,
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
          this.form.code = res.data.code
          this.form.title = res.data.title
          this.form.description = res.data.description
          this.form.email_title = res.data.email_title
          this.form.email = res.data.email
          this.form.telephone_title = res.data.telephone_title
          this.form.telephone = res.data.telephone
          this.form.country = res.data.country
          this.form.city = res.data.city
          this.form.address = res.data.address
          this.form.logo = res.data.logo
          this.form.started_at = res.data.started_at
          this.form.ended_at = res.data.ended_at
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
