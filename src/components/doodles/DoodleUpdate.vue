<template>
  <div class="w-[100vw] bg-[#eee] ">
    <h1>Update doodle</h1>

      <button class="bg-amber-400 p-4" @click="router.back()">
        Back
      </button>

    <div class="text-xl">
      <div>
        <span>Name: </span>
        <input type="text" class="w-[200px]" v-model="requestData.title" >
      </div>
      <div class="mt-5">
        <span>Image: </span>
        <img :src="imageDisplay">
        <input type="file" class="w-[200px]" @change="handleImageChange">
      </div>

      <div class="mt-5">
        <span>Category: </span>
        <select v-model="requestData.category">
          <option v-for="cate in responseData.doodle_category_id"></option>
        </select>
      </div>

      <div class="mt-5">
        <span>Description: </span>
        <input type="text" v-model="requestData.description">
      </div>
      <button @click="submit" class="bg-amber-400 p-4">Update</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { notification } from 'ant-design-vue'
import type { DoodleRequest, DoodleResponse } from '@/types'
import router from '@/router'

const responseData: DoodleResponse = ref({})
const requestData: DoodleRequest = ref({})
const route = useRoute()
const id = route.params.id
const imageDisplay = ref(responseData.image)

function handleImageChange(event: any) {
  console.log(event.target.files[0])
  requestData.image = event.target.files[0]
}
fetchData()
async function fetchData(){

  axios.get(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/detail/${id}`)
    .then((response) => {
      const raw_data: DoodleResponse = response.data
      responseData.title = raw_data.title
      responseData.time.event = raw_data.time.event
      responseData.createdAt = raw_data.createdAt
      responseData.views = raw_data.views
      responseData.likes = raw_data.likes
      responseData.status = raw_data.status
      responseData.description = raw_data.description
      responseData.image = raw_data.image
    })

  requestData.title = responseData.title
  requestData.description = responseData.description
}


async function submit() {
  const formData = new FormData()
  formData.append('title', responseData.title)
  formData.append('image', requestData.image)
  formData.append('description', responseData.description)
  formData.append('category', requestData.category)
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
      router.back()
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

<style scoped>

</style>