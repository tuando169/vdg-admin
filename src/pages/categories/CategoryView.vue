<script setup lang="ts">

import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'
import { onMounted, ref } from 'vue'
import type { Category } from '@/types'
import { ElNotification } from 'element-plus'
import CategoryCard from '@/pages/categories/components/CategoryCard.vue'
import router from '@/router'

const dialogVisible = ref(false)
const currentDoodleId = ref('')
const isShowCreateForm = ref(false)
const createdTitle = ref('')
const createdDescription = ref('')

const categoryData = ref<{
  id: string,
  title: string,
  description: string,
}[]>([{
  id: '',
  title: '',
  description: ''
}])


fetchCategoryData()

async function fetchCategoryData() {
  categoryData.value = []
  await axios.get(apiEndpoint.category.get_all)
    .then((response) => {
      const raw_data: Category[] = response.data
      raw_data.map((item: any) => {
        categoryData.value.push({
            id: item._id,
            title: item.title,
            description: item.description
          }
        )
      })
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to fetch category data',
        type: 'error'
      })
    })
}

async function handleCreate() {
  const data = {
    title: createdTitle.value,
    description: createdDescription.value
  };
  await axios.post(apiEndpoint.category.create, data)
    .then((response) => {
      ElNotification({
        title: 'Success',
        message: 'Create category successfully',
        type: 'success'
      })
      isShowCreateForm.value = false
      createdTitle.value =''
      createdDescription.value =''
      fetchCategoryData()
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to create category',
        type: 'error'
      })
    })
}


</script>


<template>
  <div class="">
    <!--    CREATE FORM-->
    <el-dialog v-model="isShowCreateForm" width="50%">
      <div class="m-4">
        <h1 class="text-3xl font-bold mb-5">Create Category</h1>
        <div class="flex text-3xl ">
          <div class="flex flex-col text-2xl font-semibold mb-3">
            <span class="mr-3 mt-2">Title</span>
            <span class="mr-3 mt-6">Description</span>

          </div>
          <div class="text-xl font-normal mb-3 w-full">
            <input
              type="text"
              v-model="createdTitle"
              class="w-full p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter title here..."
            />
            <textarea
              v-model="createdDescription"
              class="w-full mt-2 p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 no-scrollbar"
              placeholder="Enter description here..."
            ></textarea>
          </div>

        </div>
        <div class="flex">
          <el-button type="primary" size="large" class="ml-auto" @click="handleCreate">
            <span class="text-xl">Create</span>
          </el-button>
        </div>
      </div>
    </el-dialog>


    <div class="flex flex-col mt-5 mx-10">
      <div class="flex items-center">
        <span class="text-3xl font-bold">Category Manager</span>
        <button class="bg-green-500 w-28 py-2 text-[white] text-xl rounded-[6px] my-5 mr-4 ml-auto hover:opacity-80"
                @click="isShowCreateForm=true">
          Create
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <CategoryCard
          v-for="cate in categoryData"
          :key="cate.id"
          :category="cate"
          class="w-full h-full"
          @reload="fetchCategoryData"
        ></CategoryCard>
      </div>
    </div>
  </div>

</template>


<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>