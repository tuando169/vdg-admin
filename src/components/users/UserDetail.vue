<!--<script setup lang="ts">-->
<!--import axios from 'axios'-->
<!--import { computed, ref } from 'vue'-->
<!--import { apiEndpoint } from '@/apiEndpoint'-->
<!--import { useRoute } from 'vue-router'-->
<!--import type { Category, Doodle } from '@/types'-->
<!--import router from '@/router'-->
<!--import { notification } from 'ant-design-vue'-->

<!--const isEdit = ref(false)-->
<!--const data = ref({-->
<!--  category: '',-->
<!--  description: '',-->
<!--  event: '',-->
<!--  image: '',-->
<!--  like: 0,-->
<!--  title: '',-->
<!--  status: false,-->
<!--  uploadDate: '',-->
<!--  view: 0-->
<!--})-->

<!--const route = useRoute()-->
<!--const id = route.params.id-->

<!--const listCategory = ref([{-->
<!--  _id: '',-->
<!--  title: ''-->
<!--}])-->
<!--fetchData()-->

<!--async function fetchData() {-->
<!--  await axios.get(`https://google-doodle-v2-v2.vercel.app/api/v1/doodle/detail/${id}`)-->
<!--    .then((response) => {-->
<!--      const raw_data: Doodle = response.data-->
<!--      data.value.title = raw_data.title-->
<!--      data.value.event = raw_data.time.dateString-->
<!--      data.value.uploadDate = raw_data.createdAt.slice(0, 10)-->
<!--      data.value.view = raw_data.views-->
<!--      data.value.like = raw_data.likes-->
<!--      data.value.status = raw_data.status-->
<!--      data.value.description = raw_data.description-->
<!--      data.value.image = raw_data.image-->

<!--      notification['success']({-->
<!--        message: 'Get data successfully'-->
<!--      })-->
<!--    })-->
<!--    .catch((error) => {-->
<!--      notification['error']({-->
<!--        message: 'Failed to get data'-->
<!--      })-->
<!--    })-->

<!--  listCategory.value = []-->
<!--  await axios.get('https://google-doodle-v2-v2.vercel.app/api/v1/category')-->
<!--    .then((response) => {-->
<!--      const raw_data: Category = response.data-->
<!--      raw_data.map((item) => listCategory.value?.push({ _id: item._id, title: item.title }))-->
<!--    })-->
<!--}-->

<!--async function submit() {-->
<!--  const formData = new FormData()-->
<!--  formData.append('title', data.value.title)-->
<!--  formData.append('image', data.value.image)-->
<!--  formData.append('description', data.value.description)-->

<!--  const foundCategory = listCategory.value.find(item => item.title === data.value.category)-->
<!--  const categoryId = foundCategory ? foundCategory._id : ''-->
<!--  formData.append('category', categoryId)-->
<!--  console.log(formData)-->
<!--  await axios.patch(-->
<!--    `https://google-doodle-v2-v2.vercel.app/api/v1/doodle/` + id,-->
<!--    formData,-->
<!--    {-->
<!--      headers: {-->
<!--        'Content-Type': 'multipart/form-data'-->
<!--      }-->
<!--    })-->
<!--    .then((response) => {-->
<!--      notification['success']({-->
<!--        message: 'Successful',-->
<!--        description:-->
<!--          'Update successfully'-->
<!--      })-->
<!--      fetchData()-->
<!--      isEdit.value = false-->
<!--    })-->
<!--    .catch((error) => {-->
<!--      notification['error']({-->
<!--        message: 'Failure',-->
<!--        description:-->
<!--          'Failed to create'-->
<!--      })-->
<!--    })-->
<!--}-->

<!--function handleCategoryChange() {-->
<!--  console.log(data.value.category)-->
<!--}-->
<!--</script>-->
<!--<template>-->
<!--  <div class="w-[100vw] bg-[#eee] text-xl">-->
<!--    <h1>Doodle detail</h1>-->
<!--    <button class="bg-amber-400 p-4" @click="router.back()">-->
<!--      Back-->
<!--    </button>-->
<!--    <div>-->
<!--      <h1>{{ data.title }}</h1>-->
<!--      <img :src="data.image" alt="" />-->
<!--    </div>-->
<!--    <div>-->
<!--      <div>-->
<!--        <div>-->
<!--          <span class="pr-3 pt-3">Name</span>-->
<!--          <input :disabled="!isEdit" type="text" v-model="data.title" />-->
<!--        </div>-->
<!--        <div>-->
<!--          <span class="pr-3 pt-3">Event</span>-->
<!--          <input :disabled="!isEdit" type="text" v-model="data.event" />-->
<!--        </div>-->
<!--        <div>-->
<!--          <span class="pr-3 pt-3">Upload Date</span>-->
<!--          <input :disabled="!isEdit" type="date" v-model="data.uploadDate" />-->
<!--        </div>-->
<!--        <div>-->
<!--          <span class="pr-3 pt-3">Category</span>-->
<!--          <select :disabled="!isEdit" v-model="data.category" @change="handleCategoryChange">-->
<!--            <option-->
<!--              v-for="cate in listCategory"-->
<!--              :key="cate._id"-->
<!--            >-->
<!--              {{ cate.title }}-->
<!--            </option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <div>-->
<!--          <span class="pr-3 pt-3">Status</span>-->
<!--          <select :disabled="!isEdit" v-model="data.status">-->
<!--            <option value="true">Published</option>-->
<!--            <option value="false">Draft</option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <div>-->
<!--          <span class="pr-3 pt-3">Likes</span>-->
<!--          <input :disabled="!isEdit" type="number" v-model="data.like" />-->
<!--        </div>-->
<!--        <div>-->
<!--          <span class="pr-3 pt-3">Views</span>-->
<!--          <input :disabled="!isEdit" type="number" v-model="data.view" />-->
<!--        </div>-->


<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; Description  &ndash;&gt;-->
<!--    <div>-->
<!--      <span class="pr-3 pt-3">Description</span>-->
<!--      <input :disabled="!isEdit" type="text" v-model="data.description">-->
<!--    </div>-->


<!--    <button class="bg-amber-400 p-4" @click="isEdit = true">Edit</button>-->
<!--    <button class="bg-amber-400 p-4 ml-10" v-show="isEdit" @click="submit">Update</button>-->
<!--  </div>-->


<!--</template>-->


<!--<style scoped>-->
<!--@import url("https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.2.1/esm/ionicons.min.js");-->

<!--</style>-->