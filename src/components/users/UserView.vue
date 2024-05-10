<template>
  <div class="">
    <div class="flex flex-col mt-5 mx-10">
      <div class="flex items-center">
        <span class="text-3xl font-bold">User Manager</span>
        <button class="bg-green-500 w-28 py-1 text-[white] text-xl rounded-[10px] my-5 mr-4 ml-auto">
          <RouterLink to="doodle/create">Create</RouterLink>
        </button>
      </div>
      <!-- table -->
      <div class="flex justify-center">


        <a-table :columns="columns" :data-source="tableData" size="small" bordered class=" w-full z-0">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'name'">
              <RouterLink :to="`/doodle/detail/${record.id}`" class="text-lg font-[niramit]">{{ text }}</RouterLink>
            </template>
            <template v-else-if="column.dataIndex === 'image'">
              <div class="flex justify-center">
                <RouterLink :to="`/doodle/detail/${record.id}`" class="text-lg font-[niramit]">

                  <img :src="`${text}`" alt="" class="max-h-[100px]">
                </RouterLink>
              </div>
            </template>
            <template v-else-if="column.dataIndex === 'action'">
              <span v-html="text" @click="handleDelete(record.id)"></span>
            </template>
            <template v-else-if="column.dataIndex === 'category'">
            <span>
              <a-tag v-for="tag in text" :key="tag" color="blue"
                     class="min-w-min mt-1 text-sm font-[niramit]">{{ tag.title }}</a-tag>
            </span>

            </template>
            <template v-else>
            <span class="text-lg font-[niramit]">
              {{ text }}
            </span>
            </template>
          </template>

        </a-table>
      </div>
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
    title: 'Image',
    dataIndex: 'image',
    width: 150,
    align: 'center'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 400

  },
  {
    title: 'Anniversary',
    dataIndex: 'anniversary',
    width: 150,
    align: 'center'
  },
  {
    title: 'Category',
    dataIndex: 'category',
    width: 200
  },
  {
    title: 'View',
    dataIndex: 'view',
    width: 100,
    align: 'center'
  },
  {
    title: 'Like',
    dataIndex: 'like',
    width: 100,
    align: 'center'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 100,
    align: 'center'
  },
  {
    title: 'Format',
    dataIndex: 'format',
    width: 100,
    align: 'center'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: 100,
    align: 'center'
  }
]

let tableData = ref([
  {
    id: '',
    image: '',
    name: 'a',
    anniversary: 'a',
    category: {
      id: 1,
      title: 'a'
    },
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
          const cate = listCategory.value.find((value) => value.id == id)
          return {
            id: cate?.id,
            title: cate?.title
          }
        })
        tableData.value.push({
          id: item._id,
          image: item.image,
          name: item.title,
          anniversary: item.time.dateString,
          category: cateItemList,
          view: item.views,
          like: item.likes,
          status: (item.status == true) ? 'Published' : 'Draft',
          format: item.format,
          action: `<button class="rounded-md bg-red-500 text-white py-1 px-3 text-xl font-[niramit]">Delete</button>`
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
a-table {
  max-width: 100%;
}
</style>