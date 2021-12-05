<template>
  <b-row class="asc_pariette-dropzone">
    <b-col>
      <form v-if="isInitial || isSaving" enctype="multipart/form-data" novalidate>
        <div class="asc_pariette-dropzone-dropbox" :class="formClass ? formClass : ''">
          <input
            type="file"
            accept="image/*"
            multiple
            :name="fileName"
            :disabled="isSaving"
            class="asc_pariette-dropzone-input-file"
            @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          >
          <!-- accept="image/*" -->
          <p v-if="isInitial">
            {{ $t('general.uploadInfo') }}
          </p>
          <p v-if="isSaving">
            {{ $t('general.uploading', { val: fileCount }) }}
          </p>
        </div>
      </form>
      <b-row v-if="isSuccess">
        <b-col cols="12">
          <div class="asc_pariette-dropzone-info">
            <p v-if="uploadedFiles">
              {{ $t('general.uploadOK', { val: uploadedFiles.length }) }}
            </p>
            <b-button variant="light" class="px-5" type="button" size="sm" @click="reset()">
              {{ $t('general.reUpload') }}
            </b-button>
          </div>
        </b-col>
        <b-col v-if="position === 'modal'" cols="12" class="mt-2">
          <b-img :src="uploadedFiles['imgsm']" fluid />
          <b-button variant="light" type="button" size="sm" @click="useIt(uploadedFiles['file'])">
            use it
          </b-button>
        </b-col>
      </b-row>
      <b-row v-if="isFailed">
        <b-col>
          <div class="asc_pariette-dropzone-info">
            <p>
              {{ $t('general.uploadError') }}
            </p>
            <b-button variant="dark" class="px-5" type="button" size="sm" @click="reset()">
              {{ $t('general.reUpload') }}
            </b-button>
            <pre>{{ uploadError }}</pre>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'App',
  props: {
    formClass: {
      type: String,
      required: false,
      default: ''
    },
    where: {
      type: String,
      required: false,
      default: 'simple'
    },
    filedata: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    position: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      fileName: 'uploadFile'
    }
  },
  computed: {
    ...mapState(['customerToken']),
    token () {
      let ct = ''
      if (process.browser) {
        ct = localStorage.getItem('auth._token.laravelJWT')
      } else {
        ct = ''
      }
      return ct
    },
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  mounted () {
    this.reset()
  },
  methods: {
    async save (form) {
      this.$store.commit('setReturn', 0)
      this.$store.commit('setUploadedStatus', false)
      this.currentStatus = STATUS_SAVING
      const upl = await this.$axios.$post(`upload/${this.where}`, form)
      if (upl.status) {
        this.$store.commit('setUploadedStatus', true)
        this.uploadedFiles = [].concat(upl)
        this.uploadedFiles = upl.data
        this.currentStatus = STATUS_SUCCESS
        switch (this.where) {
          case 'uploadPincode':
            this.$store.commit('setUploadedPins', upl.data)
            break
          case 'uploadImage':
            this.$store.commit('setUploadedImages', upl.data)
            break
        }
        this.$store.commit('setReturn', 25)
      } else {
        this.uploadError = upl
        this.currentStatus = STATUS_FAILED
      }
    },
    useIt (e) {
      this.$store.commit('UPLOADED_FILE', e)
    },
    filesChange (fieldName, fileList) {
      const formData = new FormData()
      if (!fileList.length) {
        return
      }
      Array
        .from(Array(fileList.length).keys())
        .map((x) => {
          switch (this.where) {
            case 'uploadPincode':
              formData.append('suppliers', this.filedata.suppliers)
              formData.append('purchasePrice', this.filedata.purchasePrice)
              formData.append('ended_at', this.filedata.ended_at)
              formData.append('pin', this.filedata.pin)
              break
            case 'uploadImage':
              formData.append('storeToken', this.customerToken.token)
              formData.append('user', this.$auth.user.id)
              formData.append('tag', this.tag)
              formData.append(fieldName, fileList[x], fileList[x].name)
              break
          }
          formData.append(fieldName, fileList[x], fileList[x].name)
          return formData
        })
      this.save(formData)
    },
    reset () {
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    }
  }
}
</script>
<style lang="sass">
  .asc_pariette-dropzone
    position: relative
    .asc_pariette-dropzone-dropbox-small
      height: 100px !important
      padding: 0px 20px !important
      min-height: inherit !important
      & p
        padding: 30px 0 0 0 !important
      .asc_pariette-dropzone-input-file
        height: 100px !important
        .asc_pariette-dropzone-info
          height: 100px !important
          min-height: inherit !important
          & p
            padding: 10px 0 !important
    .asc_pariette-dropzone-dropbox
      outline: 2px dashed #fff
      outline-offset: -10px
      background: #c2dcdc
      color: dimgray
      padding: 10px 20px
      min-height: 200px
      position: relative
      cursor: pointer
      text-align: center
      & p
        font-size: 1.2em
        font-weight: 600
        padding: 50px 0
      &:hover
        background: lighten(#c2dcdc, 5% )
        color: lighten(dimgray, 5%)
      .asc_pariette-dropzone-info
        outline: 2px solid #fff
        outline-offset: -10px
        background: #c2dcdc
        color: dimgray
        padding: 10px 20px
        min-height: 200px
        position: relative
        text-align: center
        & p
          font-size: 1.2em
          font-weight: 600
          padding: 50px 0
        & h4
          font-size: 1.5rem
          font-weight: bold
      .asc_pariette-dropzone-input-file
        opacity: 0
        width: 100%
        height: 200px
        position: absolute
        left: 0
        top: 0
        cursor: pointer
</style>
