<!--<template>-->
<!--  <div class="w-[100vw] bg-[#eee] ">-->
<!--    <h1>Create user</h1>-->
<!--    <div class="text-xl">-->
<!--      <div>-->
<!--        <span>Name: </span>-->
<!--        <input type="text" class="w-[200px]" v-model="requestData.title">-->
<!--      </div>-->
<!--      <div class="mt-5">-->
<!--        <span>Image: </span>-->
<!--        <input type="file" class="w-[200px]" @change="handleImageChange">-->
<!--      </div>-->

<!--      <div class="mt-5">-->
<!--        <span>Category: </span>-->
<!--        <input type="text" v-model="requestData.category">-->
<!--      </div>-->

<!--      <div class="mt-5">-->
<!--        <span>Description: </span>-->
<!--        <input type="text" v-model="requestData.description">-->
<!--      </div>-->
<!--      <button @click="submit" class="bg-amber-400 p-4">Create</button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import axios from 'axios'-->
<!--import { notification } from 'ant-design-vue'-->
<!--import router from '@/router'-->
<!--import { apiEndpoint } from '@/apiEndpoint'-->

<!--const requestData = {}-->

<!--function handleImageChange(event: any) {-->
<!--  console.log(event.target.files[0])-->
<!--  requestData.image = event.target.files[0]-->
<!--}-->

<!--async function submit() {-->
<!--  const formData = new FormData()-->
<!--  formData.append('title', requestData.title)-->
<!--  formData.append('image', requestData.image)-->
<!--  formData.append('description', requestData.description)-->
<!--  formData.append('category', requestData.category)-->
<!--  await axios.post(-->
<!--    apiEndpoint.user.create,-->
<!--    formData)-->
<!--    .then((response) => {-->
<!--      notification['success']({-->
<!--        message: 'Successfully',-->
<!--        description:-->
<!--          'Create successfully'-->
<!--      })-->
<!--      router.push('/user')-->
<!--    })-->
<!--    .catch((error) => {-->
<!--      notification['error']({-->
<!--        message: 'Failure',-->
<!--        description:-->
<!--          'Failed to create'-->
<!--      })-->
<!--    })-->
<!--}-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->