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
          <template v-else-if="column.dataIndex === 'category'">
            <a-tag
              v-for="cate in text"
              :key="cate"
              class="bg-blue-400 text-white px-2 py-1 rounded-full text-center mr-2"
            >
              {{ cate }}
            </a-tag>

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
import type { Category, Doodle } from '@/types'

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
    category_id: 'a',
    view: 0,
    like: 0,
    status: 'published',
    format: 'png',
    action: `<button>abc</button>`
  }
])

const listCategory = ref<Category[]>([])

getListCategory()
fetchData()

async function handleDelete(id: any) {
  await axios.delete('https://google-doodle-v2-v2.vercel.app/api/v1/doodle/' + id).then(() => {
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

async function getListCategory() {
  await axios.get('https://google-doodle-v2-v2.vercel.app/api/v1/category')
    .then((response) => {
      const raw_data = response.data
      console.log(raw_data)
      raw_data.map((item: any) => {
        listCategory.value.push({
            id: item._id,
            title: item.title,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            slug: item.slug
          }
        )
      })
    })
    .catch((error) => {
      notification['error']({
        message: 'Failed to get category'
      })
    })
}

async function fetchData() {
  tableData.value = []
  await axios.get('https://google-doodle-v2-v2.vercel.app/api/v1/doodle')
    .then((response) => {
      const raw_data: Doodle[] = response.data
      raw_data.map((item: any) => {
        const cateItemList = item.doodle_category_id.map((id: any) => {
          return listCategory.value.find((value) => value.id == id)?.title
        })
        tableData.value.push({
          id: item._id,
          name: item.title,
          anniversary: item.time.dateString,
          category_id: cateItemList,
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
        message: 'Fail to get doodle data'
      })
    })
}

</script>


<style scoped>

</style>