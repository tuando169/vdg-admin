<template>
  <div class="w-full min-h-screen text-xl">
    <div class="max-w-[80%] mx-auto mt-6">
      <h1 class="text-3xl font-bold mb-6">Create Doodle</h1>
      <div class="bg-white shadow-md rounded-lg p-10 mt-6">

        <button
          class="bg-yellow-500 hover:bg-yellow-400 text-white text-2xl font-bold py-2 px-4 rounded-lg transition duration-300"
          @click="router.push('/doodle')">
          Back
        </button>


        <div class="my-4 text-center ">
          <el-upload
            class="upload-demo"
            drag
            :limit="1"
            :auto-upload="false"
            :on-change="handleImageChange">

            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text ">
              <span class="font-['Niramit'] text-xl">
              Drop file here or <em>click to upload</em>
              </span>
            </div>
          </el-upload>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label class="block font-medium mb-1">Title</label>
            <input type="text" v-model="requestData.title"
                   class="w-full p-2 bg-white rounded-lg border-2 border-gray-300" />
          </div>
          <div class="mb-4">
            <label class="block font-medium mb-1">Anniversary (dd/mm)</label>
            <input type="text" v-model="requestData.time.dateString"
                   class="w-full p-2 bg-white rounded-lg border-2 border-gray-300" />
          </div>

          <div class="mb-4">
            <label class="block font-medium mb-2">Category</label>
            <el-select size="large" multiple v-model="requestData.doodle_category_id"
                       class="w-full rounded-lg">
              <el-option v-for="item in listCategory" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="mb-4">
              <label class="block font-medium mb-1">Format</label>
              <input type="text" v-model="requestData.format"
                     class="w-full p-2 bg-white rounded-lg border-2 border-gray-300" />
            </div>
            <div class="mb-4">
              <label class="block font-medium mb-1">Status</label>
              <select v-model="requestData.status" class="w-full p-2 rounded-lg">
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
          </div>

        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Information</label>
          <input type="text" v-model="requestData.information"
                 class="w-full p-2 rounded-lg border-2 border-gray-300" />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Description</label>
          <textarea v-model="requestData.description"
                    class="w-full h-32 p-2 rounded-lg border-2 border-gray-300"></textarea>
        </div>
        <div class="flex">
          <button
            class="bg-blue-500 hover:bg-blue-400 text-white text-2xl font-bold ml-auto py-2 px-4 rounded-lg transition duration-300"
            @click="submit">Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { apiEndpoint } from '@/apiEndpoint'
import { ElNotification, ElSelect } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const requestData = ref<{
  title: string,
  image: any,
  description: string,
  doodle_category_id: string[],
  anniversary: string,
  information: string,
  format: string,
  status: boolean,
  time: {
    dateString: string
  }
}>({
  anniversary: '',
  description: '',
  doodle_category_id: [],
  format: '',
  image: undefined,
  information: '',
  status: true,
  time: { dateString: '' },
  title: ''
})

const listCategory = ref<{
  id: string
  title: string,
}[]>([])

fetchListCategory()

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

function handleImageChange(file: any) {
  console.log(file.raw)
  requestData.value.image = file.raw
}

async function submit() {
  const regex = /^(0[1-9]|[12][0-9])\/(0[1-9]|1[0-2])$/
  if (!regex.test(requestData.value.anniversary)) {
    ElNotification({
      title: 'Error',
      message: 'Invalid date format',
      type: 'error'
    })
    return
  }
  const formData = new FormData()
  formData.append('title', requestData.value.title)
  formData.append('image', requestData.value.image)
  formData.append('description', requestData.value.description)
  formData.append('doodle_category_id', requestData.value.doodle_category_id)
  formData.append('format', requestData.value.format)
  formData.append('time[dateString]', requestData.value.time.dateString)
  formData.append('information', requestData.value.information)
  await axios.post(apiEndpoint.doodle.create, formData)
    .then((response) => {
      ElNotification({
        title: 'Success',
        message: 'Create successfully',
        type: 'success'
      })
      router.push('/doodle')
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to create doodle',
        type: 'error'
      })
    })
}

</script>

<style scoped>

</style>