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
            {{ $t('action.signalStatus') }}
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
        <div v-if="sensorInfo.status == 0" class="asc_pariette-card asc_pariette-minheight50 pointer bg-danger text-light text-center py-3" @click="sensorStatusModal = true">
          <h5>
            <i class="pi pi-stop-circle" />
            {{ $t('action.sensorStatus') }}
          </h5>
          <h6>
            {{ $t('action.sensorPassive') }}
          </h6>
        </div>
        <div v-if="sensorInfo.status == 1" class="asc_pariette-card asc_pariette-minheight50 pointer bg-success text-light text-center py-3" @click="sensorStatusModal = true">
          <h5>
            <i class="pi pi-play" />
            {{ $t('action.sensorStatus') }}
          </h5>
          <h6>
            {{ $t('action.sensorActive') }}
          </h6>
        </div>
        <div v-if="sensorInfo.status == 8" class="asc_pariette-card asc_pariette-minheight50 pointer bg-warning text-light text-center py-3" @click="sensorStatusModal = true">
          <h5>
            <i class="pi pi-clock" />
            {{ $t('action.sensorStatus') }}
          </h5>
          <h6>
            {{ $t('action.sensorStandby') }}
          </h6>
        </div>
        <div v-if="sensorInfo.status == 9" class="asc_pariette-card asc_pariette-minheight50 pointer bg-secondary text-light text-center py-3" @click="sensorStatusModal = true">
          <h5>
            <i class="pi pi-pause" />
            {{ $t('action.sensorStatus') }}
          </h5>
          <h6>
            {{ $t('action.sensorSleep') }}
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
            <v-select
              v-model="dataLimitVal"
              :options="dataLimits"
              label="label"
              :clearable="false"
              style="width:120px"
              @input="setLimit"
            />
          </div>
          <div class="clearfix" />
          <Chart type="line" :data="temperatureChart" :options="chartOpt" />
        </div>
      </b-col>
      <b-col cols="12" :lg="dataLimit === 10 ? 6 : 12" class="mb-3">
        <div class="asc_pariette-card">
          <h5 class="float-left">
            {{ $t('action.maturity') }}
          </h5>
          <div class="float-right">
            <v-select
              v-model="dataLimitVal"
              :options="dataLimits"
              label="label"
              :clearable="false"
              style="width:120px"
              @input="setLimit"
            />
          </div>
          <div class="clearfix" />
          <Chart type="line" :data="maturityChart" :options="chartOpt" />
        </div>
      </b-col>
      <b-col cols="12" class="my-3">
        <div class="asc_pariette-pagecard">
          <ParietteTable
            v-if="isShowTable"
            :head="tableHead"
            :operation="tableOperation"
            :api="tableQuery"
            :show-modal="false"
            :data-fields="dataFields"
          />
        </div>
      </b-col>
      <!-- <b-col cols="12" lg="6" class="mb-3">
        <div class="asc_pariette-card">
          <DataTable :value="LrrRSSI" responsive-layout="scroll" :paginator="true" :rows="10">
            <Column field="created_at" header="CreatedAt" />
            <Column field="data" header="Data" />
          </DataTable>
        </div>
      </b-col>
      <b-col cols="12" lg="6" class="mb-3">
        <div class="asc_pariette-card">
          <DataTable :value="LrrSNR" responsive-layout="scroll" :paginator="true" :rows="10">
            <Column field="created_at" header="CreatedAt" />
            <Column field="data" header="Data" />
          </DataTable>
        </div>
      </b-col>
      <b-col cols="12" lg="12" class="mb-3">
        <div class="asc_pariette-card">
          <DataTable :value="uplData" responsive-layout="scroll" :paginator="true" :rows="10">
            <Column field="created_at" header="created_at" />
            <Column field="measurement" header="measurement" />
            <Column field="strength" header="strength" />
            <Column field="temperature" header="temperature" />
            <Column field="LrrRSSI" header="LrrRSSI" />
            <Column field="LrrSNR" header="LrrSNR" />
          </DataTable>
        </div>
      </b-col> -->
    </b-row>
    <Dialog :header="measurementInfo.name" :visible.sync="infoModal" :container-style="{width: '50vw'}" :modal="true">
      <p>{{ measurementInfo.description }}</p>
    </Dialog>
    <Dialog :header="$t('action.sensorStatus')" :visible.sync="sensorStatusModal" :container-style="{width: '50vw'}" :modal="true">
      <Button :label="$t('action.sensorPassive')" class="p-button-danger" icon="pi pi-stop-circle" @click="setSensorStatus(0)" />
      <Button :label="$t('action.sensorActive')" class="p-button-success" icon="pi pi-play" @click="setSensorStatus(1)" />
      <Button :label="$t('action.sensorStandby')" class="p-button-warning" icon="pi pi-clock" @click="setSensorStatus(8)" />
      <Button :label="$t('action.sensorSleep')" class="p-button-secondary" icon="pi pi-pause" @click="setSensorStatus(9)" />
    </Dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import 'chartjs-adapter-moment'
export default {
  beforeRouteLeave (to, from, next) {
    clearInterval(this.polling)
    next()
  },
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      isShowTable: true,
      tableHead: [],
      tableOperation: {},
      dataFields: [],
      infoModal: false,
      sensorStatusModal: false,
      polling: null,
      pageApi: 'Uplink',
      uplData: [],
      projectInfo: {},
      sensorInfo: {},
      sfClass: 'bg-primary text-light',
      measurementInfo: {},
      dataLimit: 10,
      dataLimitVal: '10',
      dataLimits: [
        { label: '10', value: 10 },
        { label: '50', value: 50 },
        { label: '100', value: 100 },
        { label: '250', value: 250 },
        { label: '500', value: 500 },
        { label: '1000', value: 1000 },
        { label: 'Tümü', value: 0 }
      ],
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
      chartOpt: {},
      temperatureChart: {
        datasets: []
      },
      maturityChart: {
        datasets: []
      },
      LrrRSSI: [],
      LrrSNR: []
    }
  },
  computed: {
    ...mapState(['companyToken', 'returnCode']),
    apiquery () {
      let q
      q = `${this.pageApi}/${this.$route.params.url}?limit=${this.dataLimit}`
      if (this.$route.query.measurement) {
        q = `${this.pageApi}/${this.$route.params.url}?limit=${this.dataLimit}&measurement=${this.$route.query.measurement}`
      }
      return q
    },
    tableQuery () {
      return `Uplink?measurement=${this.$route.params.url}`
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
    if (this.$route.params.url) {
      setTimeout(() => {
        this.pollData()
      }, 3000)
    }
  },
  methods: {
    async getData () {
      if (this.$route.params.url) {
        await this.$axios.$get(this.companyToken + '/' + this.apiquery)
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
              const temperature = []
              const maturity = []
              const LrrRSSI = []
              const LrrSNR = []
              for (let s = 0; s < sensorData.length; s++) {
                const sensor = sensorData[s]
                const t = new Date(sensor.created_at)
                console.log(t)
                temperature.push({ x: t, y: sensor.temperature, c: sensor.counter })
                maturity.push({ x: t, y: sensor.maturity, c: sensor.counter })
                LrrRSSI.push({ created_at: sensor.created_at, data: sensor.LrrRSSI })
                LrrSNR.push({ created_at: sensor.created_at, data: sensor.LrrSNR })
              }

              this.chartOpt = {
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      afterLabel (context) {
                        let label = 'Counter: '
                        if (context.raw.c !== null) {
                          label += context.raw.c
                        }
                        return label
                      }
                    }
                  }
                },
                type: 'line',
                interaction: {
                  mode: 'index',
                  intersect: false
                },
                stacked: false,
                responsive: true,
                animation: {
                  duration: 0
                },
                scales: {
                  x: {
                    type: 'time',
                    time: {
                      unit: 'minute',
                      tooltipFormat: 'YYYY-MM-DD HH:mm',
                      displayFormats: {
                        millisecond: 'HH:mm:ss.SSS',
                        second: 'HH:mm:ss',
                        minute: 'HH:mm',
                        hour: 'HH'
                      }
                    }
                  }
                }
              }

              this.temperatureChart.datasets = [
                {
                  label: 'temperature',
                  data: temperature,
                  fill: false,
                  tension: 0,
                  borderColor: '#42A5F5'
                }
              ]

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
              this.$toast.add({ severity: 'warn', summary: this.$t('err.' + res.error), life: 3000 })
              this.$router.push(this.localeLocation({ name: 'Admin-Measurement' }))
            }
          })
          .catch((err) => {
            console.log(err)
          })
        this.tableHead = [
          { col: 'counter', label: this.$t('action.counter'), type: 'InputText', filter: true, sortable: true },
          { col: 'measurement', label: this.$t('action.measurement'), type: 'InputText', filter: true, sortable: true },
          { col: 'strength', label: this.$t('action.strength'), type: 'InputText', filter: true, sortable: true },
          { col: 'maturity', label: this.$t('action.maturity'), type: 'InputText', filter: true, sortable: true },
          { col: 'temperature', label: this.$t('action.temperature'), type: 'InputText', filter: true, sortable: true },
          { col: 'sf', label: this.$t('action.sf'), type: 'InputText', filter: true, sortable: true },
          { col: 'created_at', label: this.$t('action.created_at'), type: 'InputText', filter: true, sortable: true }
        ]
        this.tableOperation = {
          create: false,
          export: true,
          update: false,
          links: [],
          activePassive: false
        }
      }
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
    async changeSensorStatus (e) {
      await this.$axios.$post('http://pyt.akillibeton.com/set_device_state/', {
        devEUI: this.sensorInfo.DevEUI,
        command: e
      })
        .then((res) => {
          if (res.command === e) {
            this.$toast.add({ severity: 'success', summary: this.$t('action.sensorUpdateMessage'), life: 3000 })
            this.sensorStatusModal = false
            this.getData()
          } else {
            this.$toast.add({ severity: 'warn', summary: this.$t('err.lng_0004'), life: 3000 })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setSensorStatus (e) {
      if (e === 9) {
        this.$confirm.require({
          message: this.$t('action.confirmAlert'),
          header: this.$t('action.confirmMessage'),
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.changeSensorStatus(e)
          },
          reject: () => {}
        })
      } else {
        this.changeSensorStatus(e)
      }
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
      this.dataLimitVal = e.label
      this.getData()
    }
  }
}
</script>
