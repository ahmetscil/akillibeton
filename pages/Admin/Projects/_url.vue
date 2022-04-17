<template>
  <div class="asc_pariette-pagecard">
    <b-row>
      <b-col>
        <h5>
          <i>{{ dataset.code }}</i> {{ dataset.title }}
        </h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" lg="4">
        <b-row>
          <b-col>
            <p class="mb-1">
              {{ dataset.description }}
            </p>
            <p class="mb-1">
              {{ dataset.companyName }}
            </p>
            <p class="mb-1">
              <b>{{ $t('general.email') }}: </b> <a :href="'mailto:' + dataset.email">{{ dataset.email_title }}</a>
            </p>
            <p class="mb-1">
              <b>{{ $t('general.telephone') }}: </b> <a :href="'tel:' + dataset.telephone">{{ dataset.telephone_title }}</a>
            </p>
            <p class="mb-1">
              <b>{{ $t('general.address') }}: </b>{{ dataset.address }} / {{ dataset.city }} / {{ dataset.country }}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" lg="6">
            <b>{{ $t('general.started_at') }}</b>
          </b-col>
          <b-col>{{ dataset.started_at }}</b-col>
        </b-row>
        <b-row>
          <b-col cols="12" lg="6">
            <b>{{ $t('general.ended_at') }}</b>
          </b-col>
          <b-col>{{ dataset.ended_at }}</b-col>
        </b-row>
      </b-col>
      <b-col cols="12" lg="6">
        <b-row>
          <b-col
            v-for="(img, i) in dataset.gallery"
            :key="'gallery' + i"
            cols="12"
            lg="3"
          >
            <ImagePreview :src="siteInfo.cdn_url + img.photo" :alt="img.title" width="100%" preview />
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" lg="2">
        <b-row>
          <b-col>
            <FileUploader :filedata="form" />
          </b-col>
        </b-row>
        <b-row v-if="showImages">
          <b-col cols="12">
            {{ $t('general.UploadedImages') }}
          </b-col>
          <b-col cols="12">
            <img :src="siteInfo.cdn_url + uploadedImages.image" :alt="uploadedImages.name" width="100%">
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      showLoader: false,
      showImages: false,
      dataset: [],
      form: {
        project: '',
        tag: ''
      }
    }
  },
  computed: {
    ...mapState(['companyToken', 'returnCode', 'uploadedImages', 'siteInfo'])
  },
  watch: {
    'returnCode' (e) {
      switch (e) {
        case 203:
          this.getData()
          break
        case 701:
          this.showImages = true
      }
    }
  },
  mounted () {
    this.$store.dispatch('getBreadcrumb', { query: 'where=projects' })
    this.getData()
  },
  methods: {
    async getData () {
      if (this.$route.params.url) {
        this.showLoader = true
        await this.$axios.$get(`${this.companyToken}/Projects/${this.$route.params.url}`)
          .then((res) => {
            if (res.code === 200) {
              this.dataset = res.data
              this.form.project = res.data.id
              this.form.tag = `${res.data.code}, ${res.data.title}, ${res.data.country}, ${res.data.city}, ${res.data.companyName}`
            } else {
              this.$toast.add({ severity: 'warn', summary: this.$t('err.' + res.error), life: 3000 })
            }
            this.showLoader = false
          })
          .catch((err) => {
            this.showLoader = false
            console.log(err)
          })
      }
    }
  }
}
</script>
