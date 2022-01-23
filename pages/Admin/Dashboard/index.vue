<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" lg="3">
        <div class="asc_pariette-card">
          <h1>title</h1>
          <Chart type="bar" :data="basicData" :options="chartOptions" />
        </div>
      </b-col>
      <b-col cols="12" lg="3">
        <div class="asc_pariette-card">
          <h1>title</h1>
          <Chart type="pie" :data="chartData" :options="chartOptions" />
        </div>
      </b-col>
      <b-col cols="12" lg="6">
        <div class="asc_pariette-card">
          <h1>title</h1>
          <Chart type="doughnut" :data="chartData" :options="chartOptions" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data () {
    return {
      chartOptions: {},
      basicData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: 'My Second dataset',
            backgroundColor: '#FFA726',
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      },
      chartData: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
            ]
          }
        ]
      }
    }
  },
  computed: mapState(['companyToken']),
  mounted () {
    if (!this.companyToken) {
      this.$router.push(this.localeLocation({ name: 'Auth-SelectCompany' }))
    }
  }
}
</script>
