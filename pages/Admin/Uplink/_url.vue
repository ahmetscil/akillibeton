<template>
  <div>
    <b-row>
      <b-col cols="6" lg="2">
        <div class="asc_pariette-card asc_pariette-minheight50 py-3">
          <h5 v-if="projectInfo">
            <i class="pi pi-question-circle" @click="infoModal = true" /> {{ measurementInfo.name }}
          </h5>
        </div>
      </b-col>
      <b-col cols="6" lg="2">
        <div class="asc_pariette-card asc_pariette-minheight50 text-center py-3" :class="sfClass">
          <h5>
            <i class="pi pi-wifi" />
            {{ $t('action.signal') }}
          </h5>
          <h6>
            {{ $t(`action.signal${measurementInfo.sf}`) }}
          </h6>
        </div>
      </b-col>
      <b-col cols="6" lg="2">
        <div class="asc_pariette-card asc_pariette-minheight50 pointer bg-primary text-light text-center py-3" @click="measurementStatus(measurementInfo.status)">
          <h5>
            <i class="pi pi-clock" />
            {{ $t('action.measurementStatus') }}
          </h5>
          <h6>
            {{ measurementInfo.status == 1 ? $t('action.active') : $t('action.passive') }}
          </h6>
        </div>
      </b-col>
      <b-col cols="6" lg="2">
        <div class="asc_pariette-card asc_pariette-minheight50 pointer bg-secondary text-light text-center py-3" @click="sensorStatus = true">
          <h5>
            <i class="pi pi-cog" />
            {{ $t('action.sensorStatus') }}
          </h5>
          <h6>
            {{ sensorInfo.status == 1 ? $t('action.active') : $t('action.passive') }}
          </h6>
        </div>
      </b-col>
      <b-col cols="6" lg="2">
        <div class="asc_pariette-card asc_pariette-minheight50 bg-danger text-light text-center py-3">
          <h6>{{ $t('general.readed_max') }}</h6>
          <h5>{{ measurementInfo.readed_max }}</h5>
        </div>
      </b-col>
      <b-col cols="6" lg="2">
        <div class="asc_pariette-card asc_pariette-minheight50 bg-warning text-center py-3">
          <h6>{{ $t('general.readed_min') }}</h6>
          <h5>{{ measurementInfo.readed_min }}</h5>
        </div>
      </b-col>
      <b-col cols="12" class="my-3">
        <b-row>
          <b-col>
            <div class="asc_pariette-card asc_pariette-minheight50 text-center py-3">
              <h6>{{ $t('general.deployed_at') }}</h6>
              <h5>{{ measurementInfo.deployed_at }}</h5>
            </div>
          </b-col>
          <b-col>
            <div class="asc_pariette-card asc_pariette-minheight50 text-center py-3">
              <h6>{{ $t('general.started_at') }}</h6>
              <h5>{{ measurementInfo.started_at }}</h5>
            </div>
          </b-col>
          <b-col>
            <div class="asc_pariette-card asc_pariette-minheight50 text-center py-3">
              <h6>{{ $t('general.ended_at') }}</h6>
              <h5>{{ measurementInfo.ended_at }}</h5>
            </div>
          </b-col>
          <b-col>
            <div class="asc_pariette-card asc_pariette-minheight50 bg-info text-light text-center py-3">
              <h6>{{ $t('general.last_temp') }}</h6>
              <h5>{{ measurementInfo.last_temp }}</h5>
            </div>
          </b-col>
          <b-col>
            <div class="asc_pariette-card asc_pariette-minheight50 bg-primary text-light text-center py-3">
              <h6>{{ $t('general.max_temp') }}</h6>
              <h5>{{ measurementInfo.max_temp }}</h5>
            </div>
          </b-col>
          <b-col>
            <div class="asc_pariette-card asc_pariette-minheight50 bg-secondary text-light text-center py-3">
              <h6>{{ $t('general.min_temp') }}</h6>
              <h5>{{ measurementInfo.min_temp }}</h5>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" :lg="dataLimit === 10 ? 6 : 12" class="mb-3">
        <div class="asc_pariette-card">
          <h5 class="float-left">
            {{ $t('action.temperature') }}
          </h5>
          <div class="float-right">
            <Dropdown v-model="dataLimit" :options="dataLimits" @change="setLimit" />
          </div>
          <div class="clearfix" />
          <Chart type="line" :data="temperatureChart" />
        </div>
      </b-col>
      <b-col cols="12" :lg="dataLimit === 10 ? 6 : 12" class="mb-3">
        <div class="asc_pariette-card">
          <h5 class="float-left">
            {{ $t('action.maturity') }}
          </h5>
          <div class="float-right">
            <Dropdown v-model="dataLimit" :options="dataLimits" @change="setLimit" />
          </div>
          <div class="clearfix" />
          <Chart type="line" :data="maturityChart" />
        </div>
      </b-col>
      <b-col cols="12" lg="6" class="mb-3">
        <div class="asc_pariette-card">
          <DataTable :value="LrrRSSI" responsive-layout="scroll">
            <Column field="created_at" header="CreatedAt" />
            <Column field="data" header="Data" />
          </DataTable>
        </div>
      </b-col>
      <b-col cols="12" lg="6" class="mb-3">
        <div class="asc_pariette-card">
          <DataTable :value="LrrSNR" responsive-layout="scroll">
            <Column field="created_at" header="CreatedAt" />
            <Column field="data" header="Data" />
          </DataTable>
        </div>
      </b-col>
      <b-col cols="12" lg="12" class="mb-3">
        <div class="asc_pariette-card">
          <DataTable :value="uplData" responsive-layout="scroll">
            <Column field="created_at" header="created_at" />
            <!-- <Column field="payload_hex" header="payload_hex" /> -->
            <!-- <Column field="maturity" header="maturity" /> -->
            <Column field="measurement" header="measurement" />
            <Column field="strength" header="strength" />
            <Column field="temperature" header="temperature" />
            <Column field="LrrRSSI" header="LrrRSSI" />
            <Column field="LrrSNR" header="LrrSNR" />
          </DataTable>
        </div>
      </b-col>
    </b-row>
    <Dialog :header="measurementInfo.name" :visible.sync="infoModal" :container-style="{width: '50vw'}" :modal="true">
      <p>{{ measurementInfo.description }}</p>
    </Dialog>
    <Dialog :header="$t('action.sensorStatus')" :visible.sync="sensorStatus" :container-style="{width: '50vw'}" :modal="true">
      sensorStatus
    </Dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      infoModal: false,
      sensorStatus: false,
      polling: null,
      pageApi: 'Uplink',
      uplData: [],
      projectInfo: {},
      sensorInfo: {},
      sfClass: 'bg-primary text-light',
      measurementInfo: {},
      dataLimit: 10,
      dataLimits: [10, 50, 100, 250, 500],
      dataset: [],
      uplink: {
        DevEUI: '',
        LrrRSSI: '',
        LrrSNR: '',
        created_at: '',
        id: '',
        maturity: '',
        measurement: '',
        payload_hex: '',
        strength: '',
        temperature: '',
        updated_at: ''
      },
      temperatureChart: {
        labels: [],
        datasets: []
      },
      maturityChart: {
        labels: [],
        datasets: []
      },
      LrrRSSI: [],
      LrrSNR: []
    }
  },
  computed: {
    ...mapState(['companyToken', 'returnCode']),
    apiquery () {
      let q = `${this.companyToken}/${this.pageApi}/${this.$route.params.url}?limit=${this.dataLimit}`
      if (this.$route.query.measurement) {
        q = `${this.companyToken}/${this.pageApi}/${this.$route.params.url}?limit=${this.dataLimit}&measurement=${this.$route.query.measurement}`
      }
      return q
    }
  },
  watch: {
    'returnCode' (e) {
      switch (e) {
        case 203:
          this.getData()
          break
      }
    }
  },
  mounted () {
    this.$store.dispatch('getBreadcrumb', { query: `where=uplink&uplink=${this.$route.params.url}` })
    this.getData()
    setTimeout(() => {
      this.pollData()
    }, 3000)
  },
  destroyed () {
    clearInterval(this.polling)
  },
  methods: {
    async getData () {
      await this.$axios.$get(this.apiquery)
        .then((res) => {
          if (res.code === 200) {
            this.projectInfo = res.data.project
            this.sensorInfo = res.data.sensor
            this.measurementInfo = res.data.measurement
            switch (res.data.measurement.sf) {
              case '0':
                this.sfClass = 'bg-danger text-light'
                break
              case '1':
                this.sfClass = 'bg-danger text-light'
                break
              case '2':
                this.sfClass = 'bg-warning text-dark'
                break
              case '3':
                this.sfClass = 'bg-warning text-dark'
                break
              case '4':
                this.sfClass = 'bg-success text-light'
                break
              case '5':
                this.sfClass = 'bg-success text-light'
                break
              default:
                this.sfClass = 'bg-primary text-light'
                break
            }
            this.uplData = res.data.uplinkdata
            const sensorData = res.data.uplinkdata
            const createdAt = []
            const temperature = []
            const maturity = []
            const LrrRSSI = []
            const LrrSNR = []
            for (let s = 0; s < sensorData.length; s++) {
              const sensor = sensorData[s]
              const d = moment(sensor.created_at).format('h:mm:ss')

              createdAt.push(d)
              temperature.push(sensor.temperature)
              maturity.push(sensor.maturity)
              LrrRSSI.push({ created_at: sensor.created_at, data: sensor.LrrRSSI })
              LrrSNR.push({ created_at: sensor.created_at, data: sensor.LrrSNR })
            }
            this.temperatureChart.labels = createdAt
            this.temperatureChart.datasets = [
              {
                label: 'temperature',
                data: temperature,
                fill: false,
                tension: 0.4,
                borderColor: '#42A5F5'
              }
            ]
            this.maturityChart.labels = createdAt
            this.maturityChart.datasets = [
              {
                label: 'maturity',
                data: maturity,
                fill: false,
                tension: 0.4,
                borderColor: '#42A5F5'
              }
            ]
            this.LrrRSSI = LrrRSSI
            this.LrrSNR = LrrSNR
          } else {
            // this.$toast.add({ severity: 'warn', summary: this.$t('err.' + res.error), life: 3000 })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async updateMeasurement (e) {
      await this.$axios.$put(`${this.companyToken}/Measurement/${this.$route.query.measurement}`, e)
        .then((res) => {
          this.$store.commit('setReturn', 203)
        })
        .catch((err) => {
          this.updateModal = true
          this.$store.commit('setLoader', false)
          const msgType = typeof err.message
          this.getData()
          if (msgType === 'string') {
            this.$toast.add({ severity: 'warn', summary: err.message, life: 3000 })
          } else if (msgType === 'object') {
            for (const property in err.message) {
              this.$toast.add({ severity: 'warn', summary: err.message[property], life: 3000 })
            }
          }
        })
    },
    measurementStatus (e) {
      this.$store.commit('setReturn', 200)
      let ps = 'action.stopAlert'
      let pm = 'action.stopMessage'
      const frm = {
        status: 0
      }
      if (parseInt(e) === 1) {
        ps = 'action.stopAlert'
        pm = 'action.stopMessage'
        frm.status = 0
      } else {
        ps = 'action.startAlert'
        pm = 'action.startMessage'
        frm.status = 1
      }
      this.$confirm.require({
        message: this.$t(pm),
        header: this.$t(ps),
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.updateMeasurement(frm)
        },
        reject: () => {
          // asd
        }
      })
    },
    pollData () {
      this.polling = setInterval(() => {
        this.getData()
      }, 30000)
    },
    setLimit (e) {
      this.dataLimit = e.value
      this.getData()
    }
  }
}
</script>
