<script setup lang="ts">
import axios from 'axios'
import { computed, ref } from 'vue'
import { apiEndpoint } from '@/apiEndpoint'
import { useRoute } from 'vue-router'
import type { Category, Doodle } from '@/types'
import router from '@/router'
import { notification } from 'ant-design-vue'
import { ElNotification } from 'element-plus'


const route = useRoute()
const id = route.params.id

const isEdit = ref(false)

const listCategory = ref<{
  id: string
  title: string,
}[]>([])

const data = ref({
  category: [
    {
      _id: '',
      title: ''
    }
  ],
  description: '',
  event: '',
  image: '',
  like: 0,
  title: '',
  status: false,
  uploadDate: '',
  view: 0
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
      notification['error']({
        message: 'Failed to get category'
      })
    })
}

async function fetchData() {
  await fetchListCategory()
  await axios.get(apiEndpoint.doodle.get_detail + id.toString())
    .then((response) => {
      const raw_data: Doodle = response.data
      data.value.title = raw_data.title
      data.value.event = raw_data.time.dateString
      data.value.uploadDate = raw_data.createdAt.slice(0, 10)
      data.value.view = raw_data.views
      data.value.like = raw_data.likes
      data.value.status = raw_data.status
      data.value.description = raw_data.description
      data.value.image = raw_data.image

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
  const formData = new FormData()
  formData.append('title', data.value.title)
  formData.append('image', data.value.image)
  formData.append('description', data.value.description)
  formData.append('status', data.value.status)

  console.log('form', formData)
  await axios.patch(
    `https://google-doodle-v2-v2.vercel.app/api/v1/doodle/` + id,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      notification['success']({
        message: 'Successful',
        description:
          'Update successfully'
      })
      fetchData()
      isEdit.value = false
    })
    .catch((error) => {
      notification['error']({
        message: 'Failure',
        description:
          'Failed to create'
      })
    })
}

</script>
<template>
  <div class="w-[100vw] bg-[#eee] text-xl">
    <h1>Doodle detail</h1>
    <button class="bg-amber-400 p-4" @click="router.back()">
      Back
    </button>
    <div>
      <h1>{{ data.title }}</h1>
      <img :src="data.image" alt="" />
    </div>
    <div>
      <div>
        <div>
          <span class="pr-3 pt-3">Name</span>
          <input :disabled="!isEdit" type="text" v-model="data.title" />
        </div>
        <div>
          <span class="pr-3 pt-3">Event</span>
          <input :disabled="!isEdit" type="text" v-model="data.event" />
        </div>
        <div>
          <span class="pr-3 pt-3">Upload Date</span>
          <input :disabled="!isEdit" type="date" v-model="data.uploadDate" />
        </div>
        <div>
          <span class="pr-3 pt-3">Category</span>
          <a-select
            v-model:value="data.category"
            :options="options"
            mode="multiple"
            placeholder="Please select"
            style="width: 200px"
          ></a-select>
        </div>
        <div>
          <span class="pr-3 pt-3">Status</span>
          <select :disabled="!isEdit" v-model="data.status">
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
        <div>
          <span class="pr-3 pt-3">Likes</span>
          <input :disabled="!isEdit" type="number" v-model="data.like" />
        </div>
        <div>
          <span class="pr-3 pt-3">Views</span>
          <input :disabled="!isEdit" type="number" v-model="data.view" />
        </div>


      </div>
    </div>

    <!-- Description  -->
    <div>
      <span class="pr-3 pt-3">Description</span>
      <input :disabled="!isEdit" type="text" v-model="data.description">
    </div>


    <button class="bg-amber-400 p-4" @click="isEdit = !isEdit">Edit</button>
    <button class="bg-amber-400 p-4 ml-10" v-show="isEdit" @click="submit">Update</button>
  </div>


</template>


<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.2.1/esm/ionicons.min.js");

</style>