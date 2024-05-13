<template>
  <div class="w-[100vw] bg-[#eee]">
    <div class="mt-4 ml-7">
      <p class="text-7xl font-bold">Dashboard</p>
      <div class="flex mt-9 ml-10 gap-6">
        <div class="flex items-center gap-6 p-6 rounded-[20px] bg-[#f9f9f9] w-1/3">
          <svg class=""
               xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z" fill="black" />
          </svg>
          <div>
            <p class="text-2xl">{{ totalViews }}</p>
            <p class="text-[16px]">Total views</p>
          </div>
        </div>
        <div class="flex items-center gap-6 p-6 rounded-[20px] bg-[#f9f9f9] w-1/3">
          <svg xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="0 0 24 24">
            <path
              d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"
              fill="currentColor" />
            <path
              d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192l1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"
              fill="currentColor" />
          </svg>
          <div>
            <p class="text-2xl">{{ totalLikes }}</p>
            <p class="text-[16px]">Total likes</p>
          </div>
        </div>

      </div>
      <div class="flex mt-5 gap-10 ml-10">

        <div class="bg-white py-5 px-20 shadow-2xl rounded-3xl border-2 border-blue-300">
          <Line :data="chartData" :options="chartOptions" class="w-[800px]" />
        </div>
        <div class="w-1/4 rounded-3xl bg-white p-5">
          <p class="text-3xl text-center pb-5">Hot Doodles</p>
          <a-table :columns="columns" :data-source="data" class="">
            <template #bodyCell="{ column, text }">
              <template v-if="column.dataIndex === 'name'">
                <a>{{ text }}</a>
              </template>
            </template>
          </a-table>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import axios from 'axios'
import { ElNotification } from 'element-plus'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const renderViewsData: number[] = [100, 200, 300, 250, 270, 350, 400, 500, 600, 700, 800, 900]
const renderLikesData: number[] = [12, 12, 45, 67, 89, 90, 100, 120, 130, 140, 150, 160]

const totalViews = renderViewsData.reduce((cur, total) => cur + total, 0)
const totalLikes = renderLikesData.reduce((cur, total) => cur + total, 0)

const chartData = {
  labels: [
    'T1',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'T8',
    'T9',
    'T10',
    'T11',
    'T12'
  ],
  datasets: [
    {
      label: 'Views',
      backgroundColor: '#f87979',
      borderColor: '#f87979',
      data: renderViewsData
    },
    {
      label: 'Likes',
      backgroundColor: '#7f79f8',
      borderColor: '#7f79f8',
      data: renderLikesData
    }
  ]
}

const chartOptions: { [key: string]: any } = {
  scales: {
    x: {
      display: true,
      grid: {
        display: false // Disable X-axis grid lines ("net")
      },
      ticks: {
        display: true,
        font: {
          size: 16, // Change this to the size you want
          family: 'Roboto' // Change this to the font family you want
        }
      }
    },
    y: {
      display: true,
      grid: {
        display: false // Disable Y-axis grid lines ("net")
      },
      ticks: {
        display: true,
        font: {
          size: 16, // Change this to the size you want
          family: 'Roboto' // Change this to the font family you want
        }
      },
      beginAtZero: true
    }
  },
  elements: {
    line: {
      borderWidth: 2
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'nearest'
  },
  tension: 0.3,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      mode: 'nearest',
      intersect: false
    }
  }
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Views',
    dataIndex: 'views'
  },
  {
    title: 'Likes',
    dataIndex: 'likes'
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    views: 123,
    likes: 34
  },
  {
    key: '2',
    name: 'Jim Green',
    views: 234,
    likes: 45
  },
  {
    key: '3',
    name: 'Joe Black',
    views: 345,
    likes: 56
  },
  {
    key: '4',
    name: 'Jim Red',
    views: 456,
    likes: 67
  },
  {
    key: '5',
    name: 'Jim Red',
    views: 456,
    likes: 67
  },
  {
    key: '5',
    name: 'Jim Red',
    views: 456,
    likes: 67
  }
]

async function fetchData() {
  axios.get('https://google-doodle-v2-v2.vercel.app/api/v1/doodle')
    .then((response) => {
      const raw_data = response.data

    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to fetch doodle data',
        type: 'error'
      })
    })
}
</script>
<style scoped>
@import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
</style>