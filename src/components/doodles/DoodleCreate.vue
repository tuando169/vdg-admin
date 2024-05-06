<template>
  <div class="w-[100vw] bg-[#eee] ">
    <h1>Create doodle</h1>
    <div class="text-xl">
      <div>
        <span>Name: </span>
        <input type="text" class="w-[200px]" v-model="requestData.title">
      </div>
      <div class="mt-5">
        <span>Image: </span>
        <input type="file" class="w-[200px]" @change="handleImageChange">
      </div>

      <div class="mt-5">
        <span>Category: </span>
        <input type="text" v-model="requestData.category">
      </div>

      <div class="mt-5">
        <span>Description: </span>
        <input type="text" v-model="requestData.description">
      </div>
      <button @click="submit" class="bg-amber-400 p-4">Create</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { DoodleRequest } from '@/types'
import { notification } from 'ant-design-vue'
import router from '@/router'

const requestData: DoodleRequest = {}

function handleImageChange(event: any) {
  console.log(event.target.files[0])
  requestData.image = event.target.files[0]
}

async function submit() {
  const formData = new FormData()
  formData.append('title', requestData.title)
  formData.append('image', requestData.image)
  formData.append('description', requestData.description)
  formData.append('category', requestData.category)
  await axios.post(
    `https://google-doodle-v2-v2.vercel.app/api/v1/doodle/`,
    formData)
    .then((response) => {
      notification['success']({
        message: 'Successfully',
        description:
          'Create successfully'
      })
      router.push('/doodle')
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