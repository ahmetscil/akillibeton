<template>
  <b-row>
    <b-col cols="12" lg="12" class="mb-3">
      <div class="asc_pariette-card asc_pariette-minheightInherit py-3">
        <h5 v-if="projectInfo" class="float-left">
          {{ projectInfo.title }} / {{ sensorInfo.title }}
        </h5>
        <div class="float-right">
          <Dropdown v-model="dataLimit" :options="dataLimits" @change="setLimit" />
        </div>
        <div class="clearfix" />
      </div>
    </b-col>
    <b-col cols="12" :lg="dataLimit === 10 ? 6 : 12" class="mb-3">
      <div class="asc_pariette-card">
        <h5>
          {{ $t('action.temperature') }}
        </h5>
        <Chart type="line" :data="temperatureChart" />
      </div>
    </b-col>
    <b-col cols="12" :lg="dataLimit === 10 ? 6 : 12" class="mb-3">
      <div class="asc_pariette-card">
        <h5>
          {{ $t('action.maturity') }}
        </h5>
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
          <Column field="payload_hex" header="payload_hex" />
          <Column field="maturity" header="maturity" />
          <Column field="measurement" header="measurement" />
          <Column field="strength" header="strength" />
          <Column field="temperature" header="temperature" />
          <Column field="LrrRSSI" header="LrrRSSI" />
          <Column field="LrrSNR" header="LrrSNR" />
        </DataTable>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      polling: null,
      pageApi: 'Uplink',
      uplData: [],
      projectInfo: {},
      sensorInfo: {},
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
        datasets: [
          {
            label: 'temperature',
            data: [],
            fill: false,
            tension: 0.4,
            borderColor: '#42A5F5'
          }
        ]
      },
      maturityChart: {
        labels: [],
        datasets: [
          {
            label: 'strength',
            data: [],
            fill: false,
            tension: 0.4,
            borderColor: '#42A5F5'
          }
        ]
      },
      LrrRSSI: [],
      LrrSNR: []
    }
  },
  computed: mapState(['companyToken']),
  mounted () {
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
      let apiquery = `${this.companyToken}/${this.pageApi}/${this.$route.params.url}?limit=${this.dataLimit}`
      if (this.$route.query.measurement) {
        apiquery = `${this.companyToken}/${this.pageApi}/${this.$route.params.url}?limit=${this.dataLimit}&measurement=${this.$route.query.measurement}`
      }
      await this.$axios.$get(apiquery)
        .then((res) => {
          if (res.code === 200) {
            this.projectInfo = res.data.project
            this.sensorInfo = res.data.sensor
            this.uplData = res.data.uplinkdata
            const sensorData = res.data.uplinkdata

            this.$store.commit('setBreadcrumb', { active: this.$t('router.' + this.pageApi), items: ['Akıllı Beton', res.data.project.title, res.data.sensor.title] })

            const createdAt = []
            const temperature = []
            const maturity = []
            const LrrRSSI = []
            const LrrSNR = []
            for (let s = 0; s < sensorData.length; s++) {
              const sensor = sensorData[s]
              createdAt.push(sensor.created_at)
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
            this.$toast.add({ severity: 'warn', summary: this.$t('err.' + res.error), life: 3000 })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    pollData () {
      this.polling = setInterval(() => {
        this.getData()
      }, 3000)
    },
    setLimit (e) {
      this.dataLimit = e.value
      this.getData()
    }
  }
}
</script>
