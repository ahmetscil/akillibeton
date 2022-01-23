<template>
  <div class="asc_pariette-pagecard">
    <b-row class="">
      <b-col cols="12" lg="6">
        <Chart type="line" :data="temperatureChart" />
      </b-col>
      <b-col cols="12" lg="6">
        <Chart type="line" :data="maturityChart" />
      </b-col>
      <b-col cols="12" lg="6">
        <DataTable :value="LrrRSSI" responsive-layout="scroll">
          <Column field="created_at" header="CreatedAt" />
          <Column field="data" header="Data" />
        </DataTable>
      </b-col>
      <b-col cols="12" lg="6">
        <DataTable :value="LrrSNR" responsive-layout="scroll">
          <Column field="created_at" header="CreatedAt" />
          <Column field="data" header="Data" />
        </DataTable>
      </b-col>
      <b-col cols="12" lg="12">
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
      pageApi: 'Uplink',
      uplData: [],
      dataLimit: 10,
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
    this.firstData()
    setInterval(() => {
      this.firstData()
    }, 30000)
  },
  methods: {
    async firstData () {
      await this.$axios.$get(`${this.companyToken}/${this.pageApi}/${this.$route.params.url}?limit=${this.dataLimit}`)
        .then((res) => {
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
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
