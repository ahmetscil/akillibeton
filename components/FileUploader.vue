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
          <p v-if="isInitial">
            {{ $t('general.uploadInfo') }}
          </p>
          <p v-if="isSaving">
            {{ $t('general.uploading', { val: fileCount }) }}
          </p>
        </div>
      </form>
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
    ...mapState(['companyToken']),
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
      this.$store.commit('setReturn', 1)
      this.$store.commit('setUploadedStatus', false)
      this.currentStatus = STATUS_SAVING
      const upl = await this.$axios.$post(`${this.companyToken}/Upload`, form)
      if (upl.status) {
        this.$store.commit('setUploadedStatus', true)
        this.uploadedFiles = [].concat(upl)
        this.uploadedFiles = upl.data
        this.currentStatus = STATUS_SUCCESS
        this.$store.commit('setUploadedImages', upl.data)
      } else {
        this.uploadError = upl
        this.currentStatus = STATUS_FAILED
      }
    },
    filesChange (fieldName, fileList) {
      const formData = new FormData()
      if (!fileList.length) {
        return
      }
      Array
        .from(Array(fileList.length).keys())
        .map((x) => {
          formData.append('project', this.filedata.project)
          formData.append('tag', this.filedata.tag)
          formData.append('storeToken', this.companyToken)
          formData.append('user', this.$auth.user.id)
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
