<template>
  <div class="asc_pariette-pagecard">
    <div class="p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="formTitle" v-model="form.title" type="text" />
          <label for="formTitle">title</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="formEmailTitle" v-model="form.email_title" type="text" />
          <label for="formEmailTitle">email_title</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="formEmail" v-model="form.email" type="text" />
          <label for="formEmail">email</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="formTelephoneTitle" v-model="form.telephone_title" type="text" />
          <label for="formTelephoneTitle">telephone_title</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="formTelephone" v-model="form.telephone" type="text" />
          <label for="formTelephone">telephone</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="formCountry" v-model="form.country" type="text" />
          <label for="formCountry">country</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="formCity" v-model="form.city" type="text" />
          <label for="formCity">city</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="formAddress" v-model="form.address" type="text" />
          <label for="formAddress">address</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="formStatus" v-model="form.status" type="text" />
          <label for="formStatus">status</label>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      pageApi: 'Companies',
      form: {
        title: null,
        email_title: null,
        email: null,
        telephone_title: null,
        telephone: null,
        country: null,
        city: null,
        address: null,
        status: null
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      await this.$axios.$get(`${this.pageApi}/${this.$route.params.url}`)
        .then((res) => {
          this.form.title = res.data.title
          this.form.email_title = res.data.email_title
          this.form.email = res.data.email
          this.form.telephone_title = res.data.telephone_title
          this.form.telephone = res.data.telephone
          this.form.country = res.data.country
          this.form.city = res.data.city
          this.form.address = res.data.address
          this.form.status = res.data.status
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
