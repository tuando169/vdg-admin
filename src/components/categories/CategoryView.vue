<template>
  <div class="">
    <div class="flex flex-col mt-5 mx-10">
      <div class="flex items-center">
        <span class="text-3xl font-bold">Doodle Manager</span>
        <button class="bg-green-500 w-28 py-2 text-[white] text-xl rounded-[6px] my-5 mr-4 ml-auto hover:opacity-80">
          <RouterLink to="/doodle/create">Create</RouterLink>
        </button>
      </div>
      <!-- table -->
      <div class="flex justify-center">
        <el-table
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          max-height="700"
          @current-change="handleCurrentChange"
          border
        >
          <el-table-column type="index" label="No." width="50" align="center" class="text-2xl" />
          <el-table-column property="image" label="Image" width="200" align="center">
            <template #default="scope">
              <RouterLink :to="`/doodle/detail/${scope.id}`">
                <div class="flex justify-center hover:opacity-60">
                  <img :src="scope.row.image" alt="" class="max-h-[100px]">
                </div>
              </RouterLink>
            </template>
          </el-table-column>
          <el-table-column property="title" label="Title" width="300" header-align="center">
            <template #default="scope">
              <RouterLink :to="`/doodle/detail/${scope.id}`" class="hover:text-blue-400">
                <span class="text-xl ">{{ scope.row.title }}</span>
              </RouterLink>
            </template>
          </el-table-column>
          <el-table-column property="anniversary" label="Anniversary" width="120" align="center">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.anniversary }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="category"
            label="Category"
            width="200"
            align="center"
          >
            <template #default="scope">

              <el-tag class="mr-2 mt-2" v-for="category in scope.row.category" :key="category.id">
                <span class="text-sm p-1">{{ category.title }}</span>
              </el-tag>

            </template>
          </el-table-column>
          <el-table-column class="text-xl" property="views" label="Views" width="70" align="center">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.views }}</span>
            </template>
          </el-table-column>
          <el-table-column property="likes" label="Likes" width="70" align="center">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.likes }}</span>
            </template>
          </el-table-column>
          <el-table-column property="status" label="Status" align="center" width="150">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column property="format" label="Format" align="center" width="100">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.format.toUpperCase() }}</span>
            </template>
          </el-table-column>
          <el-table-column property="action" label="Action" align="center" width="200">
            <template #default="scope">
              <div class="flex flex-col items-center justify-center gap-2">
                <RouterLink :to="`/doodle/detail/${scope.id}`">
                  <el-button
                    type="primary"
                    size="default"
                    class="w-[80px]"
                  >
                    <span class="text-lg">Edit</span>
                  </el-button>
                </RouterLink>
                <el-button
                  type="danger"
                  size="default"
                  @click="dialogVisible = true"
                  class="w-[80px]"
                >
                  <span class="text-lg">Delete</span>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="500"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>

<script setup lang="ts">

import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'
import { ref } from 'vue'
import { notification } from 'ant-design-vue'
import type { Category, Doodle } from '@/types'

const dialogVisible = ref(false)
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
  }
])

const listCategory = ref<Category[]>([])

getListCategory()
fetchData()

async function handleDelete(id: any) {
  await axios.delete(apiEndpoint.doodle.delete + id)
    .then((response) => {
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
          title: item.title,
          anniversary: item.time.dateString,
          category: cateItemList,
          views: item.views,
          likes: item.likes,
          status: (item.status == true) ? 'Published' : 'Draft',
          format: item.format
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