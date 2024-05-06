<template>
  <div class="w-[100vw] bg-[#eee] text-3xl">
    <h1 class="text-3xl ml-10 mt-10">Doodle</h1>
    <div class="flex flex-col ">
      <div class="flex pt-[25px]">
        <div class="ml-auto mr-10">
          <button class="h-10 w-[99px] bg-[#036EFF] text-[white] text-[15px] rounded-[10px] border-[none]">
            <RouterLink to="doodle/create">Create</RouterLink>
          </button>
        </div>
      </div>
      <!-- table -->
      <a-table :columns="columns" :data-source="tableData" bordered>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            <RouterLink :to="`/doodle/detail/${record.id}`">{{ text }}</RouterLink>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <span v-html="text" @click="handleDelete(record.id)"></span>
          </template>
          <template v-else>
            {{ text }}
          </template>
        </template>

      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">

import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'
import { ref } from 'vue'
import router from '@/router'
import { notification } from 'ant-design-vue'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Anniversary',
    dataIndex: 'anniversary'
  },
  {
    title: 'Category',
    dataIndex: 'category'
  },
  {
    title: 'View',
    dataIndex: 'view'
  },
  {
    title: 'Like',
    dataIndex: 'like'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Format',
    dataIndex: 'format'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

let tableData = ref([
  {
    id: '',
    name: 'a',
    anniversary: 'a',
    category: 'a',
    view: 0,
    like: 0,
    status: 'published',
    format: 'png',
    action: `<button>abc</button>`
  }
])

fetchData()

function handleDelete(id: any) {
  axios.delete('https://google-doodle-v2-v2.vercel.app/api/v1/doodle/' + id).then(() => {
    notification['success']({
      message: 'Delete successfully'
    })
    fetchData()
  })
    .catch((error) => {
      notification['error']({
        message: 'Failed to delete'
      })
    })

}

async function fetchData() {
  tableData.value = []
  axios.get('https://google-doodle-v2-v2.vercel.app/api/v1/doodle')
    .then((response) => {
      const raw_data = response.data

      raw_data.map((item: any) => {

        tableData.value.push({
          id: item._id,
          name: item.title,
          anniversary: item.time.dateString,
          category: item.category,
          view: item.views,
          like: item.likes,
          status: (item.status == true) ? 'Published' : 'Draft',
          format: item.format,
          action: `<button class="rounded-md bg-blue-300 p-1">Delete</button>`
        })
      })
    })
    .catch((error) => {
      notification['error']({
        message: 'Fail'
      })
    })
}

</script>


<style scoped>

</style>