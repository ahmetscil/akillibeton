<template>
  <div class="asc_pariette-pagecard">
    <div class="p-fluid p-grid">
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="project" v-model="form.project" type="text" />
          <label for="project">project</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="DevEUI" v-model="form.DevEUI" type="text" />
          <label for="DevEUI">DevEUI</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="type" v-model="form.type" type="text" />
          <label for="type">type</label>
        </span>
      </div>
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
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="status" v-model="form.status" type="text" />
          <label for="status">status</label>
        </span>
      </div>
      <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
          <InputText id="sensor_no" v-model="form.sensor_no" type="text" />
          <label for="sensor_no">sensor_no</label>
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
      pageApi: 'Sensors',
      form: {
        project: null,
        DevEUI: null,
        type: null,
        title: null,
        description: null,
        status: null,
        sensor_no: null
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
          this.form.project = res.data.project
          this.form.DevEUI = res.data.DevEUI
          this.form.type = res.data.type
          this.form.title = res.data.title
          this.form.description = res.data.description
          this.form.status = res.data.status
          this.form.sensor_no = res.data.sensor_no
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
