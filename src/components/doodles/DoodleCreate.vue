<template>
  <div class="w-[100vw] bg-[#eee] ">
    <h1>Create doodle</h1>
    <div class="text-xl">
      <div>
        <div>
          <span class="pr-3 pt-3">Name</span>
          <input type="text" v-model="requestData.title" />
        </div>
        <div class="mt-5">
          <span>Image: </span>
          <input type="file" class="w-[200px]" @change="handleImageChange">
        </div>
        <div>
          <span class="pr-3 pt-3">Anniversary</span>
          <input type="text" v-model="requestData.anniversary" />
        </div>
        <div>
          <span class="pr-3 pt-3">Category</span>
          <el-select

            multiple
            v-model="requestData.category_id"
            @change="handleCategoryChange"
          >
            <el-option
              v-for="item in listCategory"
              :key="item.id"

              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span class="pr-3 pt-3">Status</span>
          <select v-model="requestData.status">
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
        <div>
          <span class="pr-3 pt-3">Format</span>
          <input type="text" v-model="requestData.format" />
        </div>
        <div>
          <span class="pr-3 pt-3">Information</span>
          <input type="text" v-model="requestData.information" />
        </div>
        <div>
          <span class="pr-3 pt-3">Description</span>
          <textarea v-model="requestData.description" class="w-[500px] h-20"></textarea>
        </div>
      </div>
      <button @click="submit" class="bg-amber-400 p-4">Create</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { notification } from 'ant-design-vue'
import router from '@/router'
import { apiEndpoint } from '@/apiEndpoint'

const requestData = ref<{
  title: string,
  image: any,
  description: string,
  doodle_category_id: string[],
  anniversary: string,
  information: string,
  format: string,
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
      console.log(listCategory.value)
    })
    .catch((error) => {
      notification['error']({
        message: 'Failed to get category'
      })
    })
}

function handleImageChange(event: any) {
  console.log(event.target.files[0])
  requestData.value.image = event.target.files[0]
}

async function submit() {
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