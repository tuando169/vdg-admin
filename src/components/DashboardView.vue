<template>
  <div class="w-[100vw] bg-[#eee]">
    <div class="mt-4 ml-7">
      <p class="text-7xl font-bold">Dashboard</p>
      <div class="flex mt-9 gap-6">
        <div class="flex items-center gap-6 p-6 rounded-[20px] bg-[#f9f9f9] w-1/3">
          <svg class=""
               xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z" fill="black" />
          </svg>
          <div>
            <p class="text-2xl">1020</p>
            <p class="text-[16px]">New Downloads</p>
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
            <p class="text-2xl">1020</p>
            <p class="text-[16px]">New Downloads</p>
          </div>
        </div>
        <div class="flex items-center gap-6 p-6 rounded-[20px] bg-[#f9f9f9] w-1/3">
          <svg xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="0 0 24 24">
            <path
              d="M11 6.914V2.586L6.293 7.293l-3.774 3.774l3.841 3.201L11 18.135V13.9c8.146-.614 11 4.1 11 4.1c0-2.937-.242-5.985-2.551-8.293C16.765 7.022 12.878 6.832 11 6.914z"
              fill="currentColor" />
          </svg>
          <div>
            <p class="text-2xl">1020</p>
            <p class="text-[16px]">New Downloads</p>
          </div>
        </div>
      </div>
      <div class="flex h-1/2 mt-5 gap-10 justify-center">

        <div class="bg-white p-5 shadow-2xl rounded-3xl border-2 border-blue-300">
          <Doughnut :data="data1" :options="options1" />

        </div>
        <div class="bg-white py-5 px-20 shadow-2xl rounded-3xl border-2 border-blue-300 w-1/2">
          <Bar :data="data2" :options="options2" />
        </div>
      </div>

      <div class="w-[90%]">
        <a-table :columns="columns" :data-source="data" bordered>
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
              <a>{{ text }}</a>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Doughnut, Bar } from 'vue-chartjs'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data1 = {
  labels: ['Likes', 'Saves', 'Downloads'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
      data: [40, 20, 80]
    }
  ]
}

const options1 = {
  responsive: true,
  maintainAspectRatio: false
}

const data2 = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
}

const options2 = {
  responsive: true,
  maintainAspectRatio: false
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];

</script>
<style scoped>
@import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
</style>