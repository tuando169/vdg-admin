<template>
  <div class="">
    <div class="pt-10 pl-16">
      <p class="text-5xl font-bold">Dashboard</p>
      <div class="flex pt-9 gap-6 w-[92.5%] ">
        <div class="flex items-center gap-6 p-6 rounded-[20px] bg-[#f9f9f9] w-1/3 shadow-2xl border-2 border-gray-400">
          <el-icon :size="40">
            <View />
          </el-icon>

          <p class="text-3xl font-semibold">Total views:</p>
          <p class="text-3xl">{{ totalViews }}</p>

        </div>
        <div class="flex items-center gap-6 p-6 rounded-[20px] bg-[#f9f9f9] shadow-2xl border-2 border-gray-400 w-1/3">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#5f6368">
            <path
              d="m480-120.67-46.67-42q-104.18-95.08-172.25-164.04Q193-395.67 152.67-450.17q-40.34-54.5-56.5-99.16Q80-594 80-640q0-91.44 61.33-152.72 61.34-61.28 152-61.28 55.34 0 103.34 25.33 48 25.34 83.33 72.67 39.33-49.33 86.33-73.67 47-24.33 100.34-24.33 90.66 0 152 61.28Q880-731.44 880-640q0 46-16.17 90.67-16.16 44.66-56.5 99.16-40.33 54.5-108.41 123.46-68.07 68.96-172.25 164.04l-46.67 42Zm0-88.66q99.49-90.67 163.75-155.5Q708-429.67 745.67-478.17q37.66-48.5 52.66-86.42t15-75.31q0-64.1-41.33-105.77-41.33-41.66-105.18-41.66-50.02 0-92.59 29.83-42.56 29.83-65.56 81.5h-58q-22.34-51-64.9-81.17-42.57-30.16-92.59-30.16-63.85 0-105.18 41.66-41.33 41.67-41.33 105.88 0 37.46 15 75.62 15 38.17 52.66 87Q252-428.33 316.67-363.83q64.66 64.5 163.33 154.5Zm0-289Z" />
          </svg>
          <p class="text-3xl font-semibold">Total likes: </p>
          <p class="text-3xl">{{ totalLikes }}</p>
        </div>
        <div class="flex items-center gap-6 p-6 rounded-[20px] bg-[#f9f9f9] shadow-2xl border-2 border-gray-400 w-1/3">
          <el-icon :size="40">
            <PictureFilled />
          </el-icon>

          <p class="text-3xl font-semibold">Total doodles: </p>
          <p class="text-3xl">{{ totalDoodles }}</p>

        </div>

      </div>
      <div class="flex mt-5 gap-10 w-[92.5%]">

        <div class="bg-white py-5 px-20  rounded-3xl shadow-2xl border-2 border-blue-300 h-[60vh]">

          <Line :key="dataChange" :data="chartData" :options="chartOptions" class="w-[800px] " />
        </div>
        <div class="w-1/3 rounded-3xl bg-white p-5 h-[60vh] shadow-2xl border-2 border-blue-300">
          <p class="text-3xl text-center pb-5">Hot Doodles</p>
          <div class="flex flex-col gap-5 overflow-y-scroll h-[90%] no-scrollbar">
            <div v-for="doodle in listDoodle" :key="doodle.id">
              <RouterLink :to="`/doodle/detail/${doodle.id}`"
                          class="flex gap-5 bg-gray-100 w-full overflow-hidden p-2 rounded-2xl hover:opacity-70">
                <img :src="doodle.image" alt="doodle" class="w-20 object-cover rounded-lg" />
                <div class="flex flex-col gap-2">
                  <p class="text-xl">{{ doodle.title }}</p>
                  <div class="flex text-lg">
                    <span class="">{{ doodle.likes }} likes</span>
                    <span class="ml-10">{{ doodle.views }} views</span>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
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
import { computed, onMounted, reactive, ref } from 'vue'
import { apiEndpoint } from '@/apiEndpoint'
import type { Doodle } from '@/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type TotalViews = {
  viewsByMonth: {
    year: string,
    month: string,
    totalViewsMonth: number
  }[]
}

type TotalLikes = {
  data: {
    year: string,
    month: string,
    totalLikes: number
  }[]
}

const dataChange = ref(0)
const totalDoodles = ref<number>()
let renderViewsData: number[] = []
let renderLikesData: number[] = []
const totalViews = ref<number>(0)
const totalLikes = ref<number>(0)

const listDoodle = ref<Array<{
  id: string,
  image: string,
  title: string,
  likes: number,
  views: number
}>>([])

const chartData = reactive({
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
})

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
          family: 'Niramit' // Change this to the font family you want
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
          family: 'Niramit' // Change this to the font family you want
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
      display: true,
      font: {
        size: 16, // Change this to the size you want
        family: 'Niramit' // Change this to the font family you want
      }
    },
    tooltip: {
      enabled: true,
      mode: 'nearest',
      intersect: false
    }
  }
}


onMounted(() => {
  chartData.datasets[0].data = renderViewsData.value
  chartData.datasets[1].data = renderLikesData.value
  fetchData()
})

async function getListDoodle() {
  await axios.get(apiEndpoint.doodle.newest)
    .then((response) => {
      const raw_data: Doodle[] = response.data
      raw_data.map((item: any) => {
        listDoodle.value.push({
          id: item._id,
          image: item.image,
          title: item.title,
          likes: item.likes,
          views: item.views
        })
      })
      // sort listDoodle by likes
      listDoodle.value = listDoodle.value.sort((a, b) => b.likes - a.likes).slice(0, 10)
      console.log('hot', listDoodle.value)
    }).catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to fetch doodle data',
        type: 'error'
      })
    })
}

async function fetchData() {
  await getListDoodle()
  await axios.get(apiEndpoint.doodle.total_doodles)
    .then((response) => {
      const raw_data = response.data
      totalDoodles.value = raw_data.total
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to get total doodles data',
        type: 'error'
      })
    })

  await axios.get(apiEndpoint.doodle.total_views)
    .then((response) => {
      renderViewsData = []
      totalViews.value = 0
      const raw_data: TotalViews = response.data
      raw_data.viewsByMonth?.map((item) => {
        totalViews.value += item.totalViewsMonth
        renderViewsData[parseInt(item.month) - 1] = item.totalViewsMonth
      })
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to total views data',
        type: 'error'
      })
    })

  await axios.get(apiEndpoint.doodle.total_likes)
    .then((response) => {
      renderLikesData = []
      totalLikes.value = 0
      const raw_data: TotalLikes = response.data
      raw_data.data?.map((item) => {
        totalLikes.value += item.totalLikes
        renderLikesData[parseInt(item.month) - 1] = item.totalLikes
      })
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to total likes data',
        type: 'error'
      })
    })
  chartData.datasets[0].data = renderViewsData
  chartData.datasets[1].data = renderLikesData
  dataChange.value += 1
}
</script>
<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>