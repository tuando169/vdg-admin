<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { apiEndpoint } from '@/apiEndpoint'
import { useRoute } from 'vue-router'
import type { Doodle } from '@/types'
import router from '@/router'
import { ElNotification, ElSelect } from 'element-plus'
import { has_permission } from '@/globalData'


const route = useRoute()
const id = route.params.id

const isEdit = ref(false)

const listCategory = ref<{
  id: string
  title: string,
}[]>([])

const data = ref<{
  category_id: string[],
  description: string,
  anniversary: string,
  image: string,
  like: number,
  title: string,
  status: boolean,
  uploadDate: string,
  view: number,
  format: string,
  information: string
}>({
  category_id: [''],
  description: '',
  anniversary: '',
  image: '',
  like: 0,
  status: false,
  title: '',
  uploadDate: '',
  view: 0,
  format: 'png',
  information: ''
})


fetchData()

async function fetchListCategory() {
  listCategory.value = []
  await axios.get(apiEndpoint.category.get_all)
    .then((response) => {
      const raw_data = response.data
      raw_data.map((item: any) => {
        listCategory.value.push({
          id: item._id,
          title: item.title
        })
      })
      console.log(listCategory.value)
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

async function fetchData() {
  await fetchListCategory()
  await axios.get(apiEndpoint.doodle.get_detail + id.toString())
    .then((response) => {
      const raw_data: Doodle = response.data
      console.log(raw_data)
      data.value.title = raw_data.title
      data.value.anniversary = raw_data.time.dateString
      data.value.uploadDate = raw_data.createdAt.slice(0, 10)
      data.value.view = raw_data.views
      data.value.like = raw_data.likes
      data.value.status = raw_data.status
      data.value.description = raw_data.description
      data.value.image = raw_data.image
      data.value.category_id = raw_data.doodle_category_id
      data.value.format = raw_data.format
      data.value.information = raw_data.information

      ElNotification({
        title: 'Success',
        message: 'Get data successfully',
        type: 'success'
      })
    })
    .catch((error) => {
      ElNotification({
        title: 'Error',
        message: 'Failed to get data',
        type: 'error'
      })
    })
}

async function submit() {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/
  if (!regex.test(data.value.anniversary)) {
    ElNotification({
      title: 'Error',
      message: 'Invalid date format',
      type: 'error'
    })
    return
  }
  const formData = new FormData()
  formData.append('image', data.value.image)
  formData.append('title', data.value.title)
  formData.append('description', data.value.description)
  formData.append('time[dateString]', data.value.anniversary)
  formData.append('status', data.value.status.toString())
  data.value.category_id.map((item) => {
    formData.append('doodle_category_id', item)
  })
  formData.append('format', data.value.format)
  formData.append('information', data.value.information)

  await axios.patch(
    `https://google-doodle-v2-v2.vercel.app/api/v1/doodle/` + id,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      ElNotification({
        title: 'Success',
        message: 'Update successfully',
        type: 'success'
      })
      fetchData()
      isEdit.value = false
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to update doodle',
        type: 'error'
      })
    })

}

function handleFileChange(e: any) {
  data.value.image = e.target.files[0]
  console.log(data.value.image)
}

</script>


<template>
  <div class="w-full min-h-screen text-xl">
    <div class="max-w-[80%] mx-auto mt-6">
      <h1 class="text-3xl font-bold mb-6">Doodle Detail</h1>
      <div class="bg-white shadow-md rounded-lg p-10 mt-6">
        <div class="flex">

          <button
            class="bg-yellow-500 hover:bg-yellow-400 text-white text-2xl font-bold py-2 px-4 rounded-lg transition duration-300"
            @click="router.push('/doodle')">
            Back
          </button>
          <div class="ml-auto">

            <button
              class="bg-blue-500 hover:bg-blue-400 text-white text-2xl font-bold py-2 px-4 rounded-lg transition duration-300"
              v-show="!isEdit"
              @click="isEdit = true"
            >
              Edit
            </button>
            <button
              v-show="isEdit"
              :disabled="!has_permission"
              class="bg-blue-500 hover:bg-blue-400 text-white text-2xl font-bold py-2 px-4 ml-4 rounded-lg transition duration-300"
              @click="submit">Update
            </button>
          </div>
        </div>
        <div class="mb-4 text-center relative">
          <h2 class="text-3xl font-semibold">{{ data.title }}</h2>
          <img :src="data.image" alt="Doodle Image"
               :class="{'hover-opacity': isEdit}"
               class="mx-auto mt-4 max-h-80 "
          />
          <input
            v-show="isEdit"
            type="file" ref="fileInput"
            title="Change image"
            @change="handleFileChange"
            class="absolute inset-0 h-full w-full opacity-0 cursor-pointer bg-amber-400" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label class="block font-medium mb-1">Title</label>
            <input :disabled="!isEdit" type="text" v-model="data.title"
                   :class="{ 'border-2 border-blue-500': isEdit }"
                   class="w-full p-2 bg-white rounded-lg " />
          </div>
          <div class="mb-4">
            <label class="block font-medium mb-1">Anniversary</label>
            <input :disabled="!isEdit" type="text" v-model="data.anniversary"
                   :class="{ 'border-2 border-blue-500': isEdit }"
                   class="w-full p-2 bg-white rounded-lg " />
          </div>
          <div class="mb-4">
            <label class="block font-medium mb-1">Upload Date</label>
            <input disabled type="date" v-model="data.uploadDate" class="w-full p-2 bg-white rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block font-medium mb-2">Category</label>
            <el-select :disabled="!isEdit" size="large" multiple v-model="data.category_id"
                       @change="handleCategoryChange"
                       :class="{ 'border-2 border-blue-500': isEdit }"
                       class="w-full rounded-lg">
              <el-option v-for="item in listCategory" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="grid grid-cols-2">
            <div class="mb-4">
              <label class="block font-medium mb-1">Status</label>
              <select :disabled="!isEdit" v-model="data.status" class="w-full p-2 border-gray-300 rounded-lg">
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block font-medium mb-1">Format</label>
              <input :disabled="!isEdit" type="text" v-model="data.format"
                     :class="{ 'border-2 border-blue-500': isEdit }"
                     class="w-full p-2 bg-white rounded-lg " />
            </div>
          </div>
          <div class="grid grid-cols-2">
            <div class="mb-4">
              <label class="block font-medium mb-1">Likes</label>
              <input disabled type="number" v-model="data.like"
                     class="w-full p-2 border-gray-300  bg-white rounded-lg" />
            </div>
            <div class="mb-4">
              <label class="block font-medium mb-1">Views</label>
              <input disabled type="number" v-model="data.view"
                     class="w-full p-2 border-gray-300  bg-white rounded-lg" />
            </div>
          </div>

        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Information</label>
          <input :disabled="!isEdit" type="text" v-model="data.information"
                 class="w-full p-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Description</label>
          <textarea :disabled="!isEdit" v-model="data.description"
                    class="w-full h-32 p-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.hover-opacity {
  transition: opacity 0.3s ease;
  opacity: 1; /* Full opacity normally */
}

.hover-opacity:hover {
  opacity: 0.7; /* 70% opacity on hover */
  cursor: pointer;
}
</style>