<script setup lang="ts">

import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'
import { computed, onBeforeMount, ref, watch } from 'vue'
import type { Category, User } from '@/types'
import { Filter } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'

let tableData = ref([
  {
    id: '65f2a954abf92ad9da272d95',
    fullName: 'Do Trung Hieu',
    email: 'dotrunghieu@gmail.com',
    deleted: true,
    favorite: [{
      id: '',
      title: ''
    }],
    doodleCreated: []
  }
])

const dialogVisible = ref(false)
const currentId = ref('')
const doodleList = ref<{
  id: string,
  title: string,
}[]>([])
fetchData()

async function handleDeleteStatus(id: any, deleted: boolean) {
  await axios.patch(apiEndpoint.user.edit + id,
    {
      deleted: deleted
    })
    .then((response) => {
      ElNotification({
        title: 'Success',
        message: 'Update status successfully',
        type: 'success'
      })
      dialogVisible.value = false
      fetchData()
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to update status',
        type: 'error'
      })
    })
}

async function getListDoodle() {
  await axios.get(apiEndpoint.doodle.get_all)
    .then((response) => {
      const raw_data = response.data
      doodleList.value = []
      raw_data.map((item) => {
        doodleList.value.push({
          id: item._id,
          title: item.title
        })
      })
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to fetch doodle list',
        type: 'error'
      })
    })
}

async function fetchData() {
  tableData.value = []

  try {
    await getListDoodle()
    const response = await axios.get(apiEndpoint.user.get_all)
    const raw_data: User[] = response.data

    raw_data.forEach((item: any) => {
      const favoriteList = item.favorite.map((favor: any) => {
        const doodle = doodleList.value.find((doodle) => doodle.id == favor)
        return doodle ? { id: doodle.id, title: doodle.title } : null
      }).filter(Boolean)

      tableData.value.push({
        id: item._id,
        fullName: item.fullName,
        email: item.email,
        favorite: favoriteList,
        deleted: item.deleted,
        doodleCreated: item.doodleCreated || []
      })
    })

    console.log(tableData.value)

    ElNotification({
      title: 'Success',
      message: 'Fetch user data successfully',
      type: 'success'
    })
  } catch (error) {
    console.error(error)
    ElNotification({
      title: 'Error',
      message: 'Failed to fetch user data',
      type: 'error'
    })
  }
}


function showDeleteDialog(id: any) {
  dialogVisible.value = true
  currentId.value = id
}

</script>

<template>
  <div class="">
    <div class="flex flex-col mt-5 mx-10">
      <div class="flex items-center text-3xl mb-5">
        <span class="text-3xl font-bold">User Manager</span>
      </div>
      <!-- table -->
      <div class="flex justify-center">
        <el-table
          :data="tableData"
          highlight-current-row
          class="w-full rounded-2xl"
          max-height="80vh"
          border
        >
          <el-table-column type="index" label="No." width="50" align="center" class="text-2xl" />

          <el-table-column property="fullName" label="Full Name" width="300" align="center" sortable>
            <template #default="scope">
              <span class="text-xl ">{{ scope.row.fullName }}</span>

            </template>
          </el-table-column>
          <el-table-column property="email" label="Email" width="400" align="center">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="favorite"
            label="Favorite"
            width="350"
            header-align="center"
          >
            <template #default="scope">

              <el-tag class="mr-2 mt-2" v-for="doodle in scope.row.favorite" :key="doodle.id">
                <RouterLink :to="`/doodle/detail/${doodle.id}`">
                  <span class="text-sm p-1">{{ doodle.title }}</span>
                </RouterLink>
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column property="status" label="Status" align="center" width="150">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.deleted ? 'Deleted' : 'Available' }}</span>
            </template>
          </el-table-column>
          <el-table-column property="action" label="Action" align="center" width="200">
            <template #default="scope">
              <div class="flex flex-col items-center justify-center gap-2">
                <div v-show="scope.row.deleted">
                  <el-button
                    type="primary"
                    size="default"
                    class="w-[80px]"
                    @click="handleDeleteStatus(scope.row.id, false)"
                  >
                    <span class="text-lg">Restore</span>
                  </el-button>
                </div>
                <el-button
                  v-show="!scope.row.deleted"
                  type="danger"
                  size="default"
                  @click="showDeleteDialog(scope.row.id)"
                  class="w-[80px]"
                >
                  <span class="text-lg">Delete</span>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="text-2xl">
      <el-dialog
        v-model="dialogVisible"
        title="Confirm Delete"
        width="500"
      >
        <span>Are you sure to delete this doodle?</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleDeleteStatus(currentId, true)">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>

</template>


<style scoped>
</style>