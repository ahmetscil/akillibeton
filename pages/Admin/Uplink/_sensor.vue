<template>
  <div>
    <b-row>
      <b-col cols="12" lg="9">
        <b-row>
          <b-col>
            <h5 v-if="projectInfo">
              <i class="pi pi-question-circle" @click="infoModal = true" /> {{ measurementInfo.name }}
            </h5>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col>
            <div class="asc_pariette-card asc_pariette-minheightInherit text-center py-3" :class="sfClass">
              <i class="pi pi-wifi" /> {{ $t('action.signalStatus') }}<br>{{ $t(`action.signal${measurementInfo.sf}`) }}
            </div>
          </b-col>
          <b-col>
            <div class="asc_pariette-card asc_pariette-minheightInherit pointer bg-primary text-light text-center py-3" @click="measurementStatus(measurementInfo.status)">
              <i class="pi pi-clock" /> {{ $t('action.measurementStatus') }}<br>{{ measurementInfo.status == 1 ? $t('action.active') : $t('action.passive') }}
            </div>
          </b-col>
          <b-col>
            <div v-if="sensorInfo.status == 0" class="asc_pariette-card asc_pariette-minheightInherit pointer bg-danger text-light text-center py-3" @click="sensorStatusModal = true">
              <i class="pi pi-stop-circle" /> {{ $t('action.sensorStatus') }}<br>{{ $t('action.sensorPassive') }}
            </div>
            <div v-if="sensorInfo.status == 1" class="asc_pariette-card asc_pariette-minheightInherit pointer bg-success text-light text-center py-3" @click="sensorStatusModal = true">
              <i class="pi pi-play" /> {{ $t('action.sensorStatus') }}<br>{{ $t('action.sensorActive') }}
            </div>
            <div v-if="sensorInfo.status == 8" class="asc_pariette-card asc_pariette-minheightInherit pointer bg-warning text-light text-center py-3" @click="sensorStatusModal = true">
              <i class="pi pi-clock" /> {{ $t('action.sensorStatus') }}<br>{{ $t('action.sensorStandby') }}
            </div>
            <div v-if="sensorInfo.status == 9" class="asc_pariette-card asc_pariette-minheightInherit pointer bg-secondary text-light text-center py-3" @click="sensorStatusModal = true">
              <i class="pi pi-pause" /> {{ $t('action.sensorStatus') }}<br>{{ $t('action.sensorSleep') }}
            </div>
            <div v-else class="asc_pariette-card asc_pariette-minheightInherit pointer bg-secondary text-light text-center py-3" @click="sensorStatusModal = true">
              <i class="pi pi-pause" /> {{ $t('action.sensorStatus') }}<br>{{ $t('action.sensorSleep') }}
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="text-right">
            <div class="float-right">
              <Calendar v-model="startDate" :manual-input="false" :placeholder="datesPlaceholder" />
              <Calendar v-model="endDate" :manual-input="false" :placeholder="datesPlaceholder" />
              <Button icon="pi pi-list" class="p-button-warning p-button-sm" :label="$t('action.getData')" @click="getData()" />
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" lg="3">
        <div
          v-if="measurementInfo.readed_max"
          class="asc_pariette-card asc_pariette-minheightInherit text-light text-center"
        >
          <vue-gauge
            :refid="'_' + Math.random().toString(36).substr(2, 9)"
            :options="{
              needleValue: measurementInfo.last_temp,
              needleColor: 'black',
              arcDelimiters: [parseInt(measurementInfo.readed_min) / 0.6, parseInt(measurementInfo.readed_max) / 0.6],
              arcColors: ['rgb(61,204,91)', 'rgb(239,214,19)', 'rgb(255,84,84)'],
              arcLabels: [measurementInfo.readed_min + '°C', measurementInfo.readed_max + '°C'],
              rangeLabel: [measurementInfo.min_temp + '°C', measurementInfo.max_temp + '°C'],
              centralLabel: measurementInfo.last_temp + '°C',
            }"
          />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="my-3">
        <div class="asc_pariette-card">
          <div v-if="showLoader" class="asc_pariette-loader">
            <ProgressSpinner />
          </div>
          <TabView v-else>
            <TabPanel :header="$t('action.temperature')">
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
            </TabPanel>
            <TabPanel :header="$t('action.maturity')">
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
            </TabPanel>
            <TabPanel v-if="tableQuery" :header="$t('action.Uplink')">
              <ParietteTable
                v-if="isShowTable"
                :head="tableHead"
                :operation="tableOperation"
                :must-api="tableQuery"
                :show-modal="false"
                :data-fields="dataFields"
              />
            </TabPanel>
          </TabView>
        </div>
      </b-col>
    </b-row>
    <Dialog :header="measurementInfo.name" :visible.sync="infoModal" :container-style="{width: '50vw'}" :modal="true">
      <p>{{ measurementInfo.description }}</p>
      <p><span><b>{{ $t('general.deployed_at') }}</b><br>{{ measurementInfo.deployed_at }}</span></p>
      <p><span><b>{{ $t('general.started_at') }}</b><br>{{ measurementInfo.started_at }}</span></p>
      <p><span><b>{{ $t('general.ended_at') }}</b><br>{{ measurementInfo.ended_at }}</span></p>
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
      tableQuery: '',
      showLoader: false,
      isShowTable: true,
      tableHead: [],
      tableOperation: {},
      dataFields: [],
      infoModal: false,
      sensorStatusModal: false,
      polling: null,
      uplData: [],
      projectInfo: {},
      sensorInfo: {},
      sfClass: 'bg-primary text-light',
      measurementInfo: {},
      dataLimit: 50,
      dataLimitVal: '50',
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
      startDate: '2020-01-01',
      endDate: '2050-12-31',
      datesPlaceholder: '',
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
    ...mapState(['companyToken', 'returnCode'])
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
      const start = this.$moment(this.startDate).format('YYYY-MM-DD')
      const end = this.$moment(this.endDate).format('YYYY-MM-DD')
      let apiQuery = `Uplink/${this.$route.params.url}?limit=${this.dataLimit}&startDate=${start}&endDate=${end}`
      if (this.$route.query.measurement) {
        apiQuery += `&measurement=${this.$route.query.measurement}`
      }
      this.tableQuery = `Uplink?limit=${this.dataLimit}&startDate=${start}&endDate=${end}&measurement=${this.$route.query.measurement}`

      if (this.$route.params.url) {
        this.showLoader = true
        await this.$axios.$get(this.companyToken + '/' + apiQuery)
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
              this.sensorInfo = []
              this.measurementInfo = []
              this.temperatureChart = []
              this.maturityChart = []
              this.$toast.add({ severity: 'warn', summary: this.$t('err.' + res.error), life: 3000 })
            }
            this.showLoader = false
          })
          .catch((err) => {
            this.showLoader = false
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
    goBack () {
      this.$router.push(this.localeLocation({ name: 'Admin-Measurement' }))
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
      if (this.measurementInfo.concrete_pouring_time) {
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
      } else {
        this.$toast.add({ severity: 'warn', summary: this.$t('err.concrete_pouring_error'), life: 3000 })
      }
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
