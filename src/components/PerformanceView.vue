<template>
  <div class="w-[100vw] bg-[#eee]">

    <div class=" text-2xl">
      <p>Performance</p>

      <!--    LOG-->
      <div class="flex justify-center">

        <div class="w-4/5 h-[300px] bg-white rounded-3xl overflow-scroll">
          <div v-for="log in listLog" class="flex pt-10 pl-10">
            <span>{{ log.title }}</span>
            <span>Updated at {{ log.updatedAt }}</span>

            <RouterLink :to="`/doodle/detail/${log.id}`" class="pl-10">
              <a-button class="p-4 bg-amber-400 rounded-2xl">View</a-button>
            </RouterLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiEndpoint } from '@/apiEndpoint'
import axios from 'axios'
import type { Doodle } from '@/types'
import { notification } from 'ant-design-vue'

const listLog = ref<{
  id: string,
  title: string,
  updatedAt: string,
}[]>()

fetchDoodleList()

async function fetchDoodleList() {
  listLog.value = []
  await axios.get('https://google-doodle-v2-v2.vercel.app/api/v1/doodle')
    .then((response) => {
      const raw_data: Doodle[] = response.data
      console.log(raw_data)
      raw_data.map((item) => {
        listLog.value?.push(
          {
            id: item.id,
            title: item.title,
            updatedAt: item.updatedAt.slice(0, 10)
          }
        )
      })
    })
    .catch(() => notification['error']({
      message: 'Failed to get log'
    }))
  console.log(listLog.value)
}
</script>