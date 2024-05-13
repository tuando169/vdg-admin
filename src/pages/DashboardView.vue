<template>
  <div class="">
    <div class="pt-10 pl-16">
      <p class="text-5xl font-bold">Dashboard</p>
      <div class="flex pt-9 gap-6 w-[92.5%]">
        <div class="flex items-center gap-6 p-6 rounded-[20px] bg-[#f9f9f9] w-1/3">
          <el-icon :size="40">
            <View />
          </el-icon>
          <div>
            <p class="text-3xl">{{ totalViews }}</p>
            <p class="text-[16px]">Total views</p>
          </div>
        </div>
        <div class="flex items-center gap-6 p-6 rounded-[20px] bg-[#f9f9f9]  w-1/3">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368">
            <path
              d="m480-120.67-46.67-42q-104.18-95.08-172.25-164.04Q193-395.67 152.67-450.17q-40.34-54.5-56.5-99.16Q80-594 80-640q0-91.44 61.33-152.72 61.34-61.28 152-61.28 55.34 0 103.34 25.33 48 25.34 83.33 72.67 39.33-49.33 86.33-73.67 47-24.33 100.34-24.33 90.66 0 152 61.28Q880-731.44 880-640q0 46-16.17 90.67-16.16 44.66-56.5 99.16-40.33 54.5-108.41 123.46-68.07 68.96-172.25 164.04l-46.67 42Zm0-88.66q99.49-90.67 163.75-155.5Q708-429.67 745.67-478.17q37.66-48.5 52.66-86.42t15-75.31q0-64.1-41.33-105.77-41.33-41.66-105.18-41.66-50.02 0-92.59 29.83-42.56 29.83-65.56 81.5h-58q-22.34-51-64.9-81.17-42.57-30.16-92.59-30.16-63.85 0-105.18 41.66-41.33 41.67-41.33 105.88 0 37.46 15 75.62 15 38.17 52.66 87Q252-428.33 316.67-363.83q64.66 64.5 163.33 154.5Zm0-289Z" />
          </svg>
          <div>
            <p class="text-3xl">{{ totalLikes }}</p>
            <p class="text-[16px]">Total likes</p>
          </div>
        </div>
        <div class="flex items-center gap-6 p-6 rounded-[20px] bg-[#f9f9f9]  w-1/3">
          <el-icon :size="40">
            <PictureFilled />
          </el-icon>
          <div>
            <p class="text-3xl">{{ totalDoodles }}</p>
            <p class="text-[16px]">Total doodles</p>
          </div>
        </div>

      </div>
      <div class="flex mt-5 gap-10 ml-10">

        <div class="bg-white py-5 px-20 shadow-2xl rounded-3xl border-2 border-blue-300">
          <Line :data="chartData" :options="chartOptions" class="w-[800px]" />
        </div>
        <div class="w-1/4 rounded-3xl bg-white p-5">
          <p class="text-3xl text-center pb-5">Hot Doodles</p>

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
import { View, PictureFilled } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { apiEndpoint } from '@/apiEndpoint'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const totalDoodles = ref(32)
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