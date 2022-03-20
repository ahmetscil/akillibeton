<template>
  <div class="asc_pariette-pagecard">
    <b-row>
      <div class="p-field col-12 col-md-6 pl-4">
        <h5>
          {{ pageTitle }}
        </h5>
      </div>
      <div class="p-field col-12 col-md-6 pr-4">
        <div class="float-right">
          <Button icon="pi pi-pencil" :label="$t('general.update')" class="p-button-sm p-button-warning" @click="update()" />
        </div>
      </div>
    </b-row>
    <b-row>
      <b-col cols="12" lg="6">
        <h2>
          {{ $t('auth.auths') }}
        </h2>
        <b-row>
          <b-col cols="4">
            <label for="admin">{{ $t('auth.admin') }}</label>
            <ToggleButton v-model="select.admin" on-icon="pi pi-check" off-icon="pi pi-times" @change="form.admin = select.admin" />
          </b-col>
          <b-col cols="4">
            <label for="admin">{{ $t('auth.boss') }}</label>
            <ToggleButton v-model="select.boss" on-icon="pi pi-check" off-icon="pi pi-times" @change="form.boss = select.boss" />
          </b-col>
          <b-col cols="4">
            <label for="admin">{{ $t('auth.status') }}</label>
            <ToggleButton v-model="select.status" on-icon="pi pi-check" off-icon="pi pi-times" @change="form.status = select.status" />
          </b-col>
        </b-row>
        <b-row class="mt-5 asc_pariette-bb1">
          <b-col cols="4">
            {{ $t('auth.userAuths') }}
          </b-col>
          <b-col cols="2">
            {{ $t('auth.create') }}
          </b-col>
          <b-col cols="2">
            {{ $t('auth.read') }}
          </b-col>
          <b-col cols="2">
            {{ $t('auth.update') }}
          </b-col>
          <b-col cols="2">
            {{ $t('auth.delete') }}
          </b-col>
        </b-row>
        <b-row v-for="(role, r) in authList" :key="'role' + r" class="asc_pariette-bb1">
          <b-col cols="4">
            <p>{{ role }}</p>
          </b-col>
          <b-col cols="2">
            <ToggleButton v-model="select[role].create" on-icon="pi pi-check" off-icon="pi pi-times" />
          </b-col>
          <b-col cols="2">
            <ToggleButton v-model="select[role].read" on-icon="pi pi-check" off-icon="pi pi-times" />
          </b-col>
          <b-col cols="2">
            <ToggleButton v-model="select[role].update" on-icon="pi pi-check" off-icon="pi pi-times" />
          </b-col>
          <b-col cols="2">
            <ToggleButton v-model="select[role].delete" on-icon="pi pi-check" off-icon="pi pi-times" />
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" lg="6">
        <h2>
          {{ $t('auth.projects') }}
        </h2>
        <b-row>
          <b-col cols="12">
            <p v-for="(user, u) in userData" :key="'userData' + u">
              <i class="pi pi-trash mr-3 pointer" @click="deleteProject(user.id)" />{{ user.projectName }}
            </p>
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
      userId: null,
      userData: [],
      pageApi: 'Authority',
      pageTitle: '',
      authList: ['auth', 'companies', 'downlink', 'galleries', 'log', 'lookup', 'lookup_item', 'measurement', 'mix', 'mix_calibration', 'projects', 'sensors', 'uplink', 'users'],
      form: {
        admin: null,
        auth: null,
        boss: null,
        companies: null,
        downlink: null,
        galleries: null,
        log: null,
        lookup: null,
        lookup_item: null,
        measurement: null,
        mix: null,
        mix_calibration: null,
        projects: null,
        sensors: null,
        status: null,
        uplink: null,
        users: null
      },
      select: {
        admin: false,
        boss: false,
        status: false,
        auth: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        companies: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        downlink: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        galleries: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        log: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        lookup: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        lookup_item: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        measurement: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        mix: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        mix_calibration: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        projects: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        sensors: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        uplink: {
          create: false,
          read: false,
          update: false,
          delete: false
        },
        users: {
          create: false,
          read: false,
          update: false,
          delete: false
        }
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
    this.$store.dispatch('getBreadcrumb', { query: 'where=authority' })
    this.getData()
  },
  methods: {
    async getData () {
      await this.$axios.$get(`${this.companyToken}/${this.pageApi}/${this.$route.params.url}`)
        .then((res) => {
          this.pageTitle = `${res.data.userName} -> ${res.data.projectName} @ ${res.data.companyName}`

          this.form.admin = res.data.admin
          this.form.boss = res.data.boss
          this.form.status = res.data.status
          this.userId = parseInt(res.data.user)
          this.thisUser(this.userId)
          if (parseInt(res.data.admin) === 1) {
            this.select.admin = true
          }
          if (parseInt(res.data.boss) === 1) {
            this.select.boss = true
          }
          if (parseInt(res.data.status) === 1) {
            this.select.status = true
          }

          this.form.auth = res.data.auth
          const spauth = res.data.auth.split('')
          if (spauth[0] === '1') {
            this.select.auth.create = true
          }
          if (spauth[1] === '1') {
            this.select.auth.read = true
          }
          if (spauth[2] === '1') {
            this.select.auth.update = true
          }
          if (spauth[3] === '1') {
            this.select.auth.delete = true
          }

          this.form.companies = res.data.companies
          const spcompanies = res.data.companies.split('')
          if (spcompanies[0] === '1') {
            this.select.companies.create = true
          }
          if (spcompanies[1] === '1') {
            this.select.companies.read = true
          }
          if (spcompanies[2] === '1') {
            this.select.companies.update = true
          }
          if (spcompanies[3] === '1') {
            this.select.companies.delete = true
          }

          this.form.downlink = res.data.downlink
          const spdownlink = res.data.downlink.split('')
          if (spdownlink[0] === '1') {
            this.select.downlink.create = true
          }
          if (spdownlink[1] === '1') {
            this.select.downlink.read = true
          }
          if (spdownlink[2] === '1') {
            this.select.downlink.update = true
          }
          if (spdownlink[3] === '1') {
            this.select.downlink.delete = true
          }

          this.form.galleries = res.data.galleries
          const spgalleries = res.data.galleries.split('')
          if (spgalleries[0] === '1') {
            this.select.galleries.create = true
          }
          if (spgalleries[1] === '1') {
            this.select.galleries.read = true
          }
          if (spgalleries[2] === '1') {
            this.select.galleries.update = true
          }
          if (spgalleries[3] === '1') {
            this.select.galleries.delete = true
          }

          this.form.log = res.data.log
          const splog = res.data.log.split('')
          if (splog[0] === '1') {
            this.select.log.create = true
          }
          if (splog[1] === '1') {
            this.select.log.read = true
          }
          if (splog[2] === '1') {
            this.select.log.update = true
          }
          if (splog[3] === '1') {
            this.select.log.delete = true
          }

          this.form.lookup = res.data.lookup
          const splookup = res.data.lookup.split('')
          if (splookup[0] === '1') {
            this.select.lookup.create = true
          }
          if (splookup[1] === '1') {
            this.select.lookup.read = true
          }
          if (splookup[2] === '1') {
            this.select.lookup.update = true
          }
          if (splookup[3] === '1') {
            this.select.lookup.delete = true
          }

          this.form.lookup_item = res.data.lookup_item
          const splookupItem = res.data.lookup_item.split('')
          if (splookupItem[0] === '1') {
            this.select.lookup_item.create = true
          }
          if (splookupItem[1] === '1') {
            this.select.lookup_item.read = true
          }
          if (splookupItem[2] === '1') {
            this.select.lookup_item.update = true
          }
          if (splookupItem[3] === '1') {
            this.select.lookup_item.delete = true
          }

          this.form.measurement = res.data.measurement
          const spmeasurement = res.data.measurement.split('')
          if (spmeasurement[0] === '1') {
            this.select.measurement.create = true
          }
          if (spmeasurement[1] === '1') {
            this.select.measurement.read = true
          }
          if (spmeasurement[2] === '1') {
            this.select.measurement.update = true
          }
          if (spmeasurement[3] === '1') {
            this.select.measurement.delete = true
          }

          this.form.mix = res.data.mix
          const spmix = res.data.mix.split('')
          if (spmix[0] === '1') {
            this.select.mix.create = true
          }
          if (spmix[1] === '1') {
            this.select.mix.read = true
          }
          if (spmix[2] === '1') {
            this.select.mix.update = true
          }
          if (spmix[3] === '1') {
            this.select.mix.delete = true
          }

          this.form.mix_calibration = res.data.mix_calibration
          const spmixCalibration = res.data.mix_calibration.split('')
          if (spmixCalibration[0] === '1') {
            this.select.mix_calibration.create = true
          }
          if (spmixCalibration[1] === '1') {
            this.select.mix_calibration.read = true
          }
          if (spmixCalibration[2] === '1') {
            this.select.mix_calibration.update = true
          }
          if (spmixCalibration[3] === '1') {
            this.select.mix_calibration.delete = true
          }

          this.form.projects = res.data.projects
          const spprojects = res.data.projects.split('')
          if (spprojects[0] === '1') {
            this.select.projects.create = true
          }
          if (spprojects[1] === '1') {
            this.select.projects.read = true
          }
          if (spprojects[2] === '1') {
            this.select.projects.update = true
          }
          if (spprojects[3] === '1') {
            this.select.projects.delete = true
          }

          this.form.sensors = res.data.sensors
          const spsensors = res.data.sensors.split('')
          if (spsensors[0] === '1') {
            this.select.sensors.create = true
          }
          if (spsensors[1] === '1') {
            this.select.sensors.read = true
          }
          if (spsensors[2] === '1') {
            this.select.sensors.update = true
          }
          if (spsensors[3] === '1') {
            this.select.sensors.delete = true
          }

          this.form.uplink = res.data.uplink
          const spuplink = res.data.uplink.split('')
          if (spuplink[0] === '1') {
            this.select.uplink.create = true
          }
          if (spuplink[1] === '1') {
            this.select.uplink.read = true
          }
          if (spuplink[2] === '1') {
            this.select.uplink.update = true
          }
          if (spuplink[3] === '1') {
            this.select.uplink.delete = true
          }

          this.form.users = res.data.users
          const spusers = res.data.users.split('')
          if (spusers[0] === '1') {
            this.select.users.create = true
          }
          if (spusers[1] === '1') {
            this.select.users.read = true
          }
          if (spusers[2] === '1') {
            this.select.users.update = true
          }
          if (spusers[3] === '1') {
            this.select.users.delete = true
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async thisUser () {
      await this.$axios.$get(`${this.companyToken}/Authority?user=${this.userId}`)
        .then((res) => {
          this.userData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteProject (e) {
      this.$store.dispatch('deleteData', { api: this.pageApi, info: e })
    },
    update () {
      let selectauth = this.select.auth.create === true ? '1' : '0'
      selectauth += this.select.auth.read === true ? '1' : '0'
      selectauth += this.select.auth.update === true ? '1' : '0'
      selectauth += this.select.auth.delete === true ? '1' : '0'

      let selectcompanies = this.select.companies.create === true ? '1' : '0'
      selectcompanies += this.select.companies.read === true ? '1' : '0'
      selectcompanies += this.select.companies.update === true ? '1' : '0'
      selectcompanies += this.select.companies.delete === true ? '1' : '0'

      let selectdownlink = this.select.downlink.create === true ? '1' : '0'
      selectdownlink += this.select.downlink.read === true ? '1' : '0'
      selectdownlink += this.select.downlink.update === true ? '1' : '0'
      selectdownlink += this.select.downlink.delete === true ? '1' : '0'

      let selectgalleries = this.select.galleries.create === true ? '1' : '0'
      selectgalleries += this.select.galleries.read === true ? '1' : '0'
      selectgalleries += this.select.galleries.update === true ? '1' : '0'
      selectgalleries += this.select.galleries.delete === true ? '1' : '0'

      let selectlog = this.select.log.create === true ? '1' : '0'
      selectlog += this.select.log.read === true ? '1' : '0'
      selectlog += this.select.log.update === true ? '1' : '0'
      selectlog += this.select.log.delete === true ? '1' : '0'

      let selectlookup = this.select.lookup.create === true ? '1' : '0'
      selectlookup += this.select.lookup.read === true ? '1' : '0'
      selectlookup += this.select.lookup.update === true ? '1' : '0'
      selectlookup += this.select.lookup.delete === true ? '1' : '0'

      let selectlookupItem = this.select.lookup_item.create === true ? '1' : '0'
      selectlookupItem += this.select.lookup_item.read === true ? '1' : '0'
      selectlookupItem += this.select.lookup_item.update === true ? '1' : '0'
      selectlookupItem += this.select.lookup_item.delete === true ? '1' : '0'

      let selectmeasurement = this.select.measurement.create === true ? '1' : '0'
      selectmeasurement += this.select.measurement.read === true ? '1' : '0'
      selectmeasurement += this.select.measurement.update === true ? '1' : '0'
      selectmeasurement += this.select.measurement.delete === true ? '1' : '0'

      let selectmix = this.select.mix.create === true ? '1' : '0'
      selectmix += this.select.mix.read === true ? '1' : '0'
      selectmix += this.select.mix.update === true ? '1' : '0'
      selectmix += this.select.mix.delete === true ? '1' : '0'

      let selectmixCalibration = this.select.mix_calibration.create === true ? '1' : '0'
      selectmixCalibration += this.select.mix_calibration.read === true ? '1' : '0'
      selectmixCalibration += this.select.mix_calibration.update === true ? '1' : '0'
      selectmixCalibration += this.select.mix_calibration.delete === true ? '1' : '0'

      let selectprojects = this.select.projects.create === true ? '1' : '0'
      selectprojects += this.select.projects.read === true ? '1' : '0'
      selectprojects += this.select.projects.update === true ? '1' : '0'
      selectprojects += this.select.projects.delete === true ? '1' : '0'

      let selectsensors = this.select.sensors.create === true ? '1' : '0'
      selectsensors += this.select.sensors.read === true ? '1' : '0'
      selectsensors += this.select.sensors.update === true ? '1' : '0'
      selectsensors += this.select.sensors.delete === true ? '1' : '0'

      let selectuplink = this.select.uplink.create === true ? '1' : '0'
      selectuplink += this.select.uplink.read === true ? '1' : '0'
      selectuplink += this.select.uplink.update === true ? '1' : '0'
      selectuplink += this.select.uplink.delete === true ? '1' : '0'

      let selectusers = this.select.users.create === true ? '1' : '0'
      selectusers += this.select.users.read === true ? '1' : '0'
      selectusers += this.select.users.update === true ? '1' : '0'
      selectusers += this.select.users.delete === true ? '1' : '0'

      this.form.auth = selectauth
      this.form.companies = selectcompanies
      this.form.downlink = selectdownlink
      this.form.galleries = selectgalleries
      this.form.log = selectlog
      this.form.lookup = selectlookup
      this.form.lookup_item = selectlookupItem
      this.form.measurement = selectmeasurement
      this.form.mix = selectmix
      this.form.mix_calibration = selectmixCalibration
      this.form.projects = selectprojects
      this.form.sensors = selectsensors
      this.form.uplink = selectuplink
      this.form.users = selectusers

      this.$store.dispatch('updateData', { api: this.pageApi, id: this.$route.params.url, info: this.form })
    }
  }
}
</script>
