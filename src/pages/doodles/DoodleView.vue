<script setup lang="ts">

import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'
import { computed, onBeforeMount, ref, watch } from 'vue'
import type { Category, Doodle } from '@/types'
import { Filter } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import { permissionConsts } from '@/globalData'

const route = useRoute()

const sortOptions = [
  {
    value: 'title',
    label: 'Title',
    children: [
      {
        value: 'ascending',
        label: 'Ascending'
      },
      {
        value: 'descending',
        label: 'Descending'
      }
    ]
  },
  {
    value: 'time',
    label: 'Time',
    children: [
      {
        value: 'latest',
        label: 'Latest'
      },
      {
        value: 'oldest',
        label: 'Oldest'
      }
    ]
  }
]
const filterOptions = ref([
  {
    value: 'category',
    label: 'Category',
    children: [
      {
        value: 'id1',
        label: 'Thang 1'
      }
    ]
  },
  {
    value: 'format',
    label: 'Format',
    children: [
      {
        value: 'png',
        label: 'PNG'
      },
      {
        value: 'gif',
        label: 'GIF'
      },
      {
        value: 'game',
        label: 'Game'
      }

    ]
  }
])

let tableData = ref([
  {
    id: '',
    image: '',
    title: 'a',
    anniversary: 'a',
    category: [{
      id: '1',
      title: 'a'
    }],
    views: 0,
    likes: 0,
    status: 'published',
    format: 'png',
    updatedAt: '2024-05-11T05:56:48.779Z'
  }
])

const listCategory = ref<Category[]>([])

const dialogVisible = ref(false)
const currentDoodleId = ref('')
const sortSelection = ref()
const filterSelections = ref()

fetchData()

async function handleDelete(id: any) {
  await axios.delete(apiEndpoint.doodle.delete + id)
    .then((response) => {
      ElNotification({
        title: 'Success',
        message: 'Delete successfully',
        type: 'success'
      })
      dialogVisible.value = false
      fetchData()
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to delete doodle',
        type: 'error'
      })
    })
}

async function getListCategory() {
  filterOptions.value[0].children = []
  await axios.get('https://google-doodle-v2-v2.vercel.app/api/v1/category')
    .then((response) => {
      const raw_data = response.data
      raw_data.map((item: any) => {
        listCategory.value.push({
            id: item._id,
            title: item.title,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            slug: item.slug
          }
        )
        filterOptions.value[0].children.push({
          value: item._id,
          label: item.title
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

async function fetchData() {
  await getListCategory()
  tableData.value = []
  await axios.get(apiEndpoint.doodle.newest)
    .then((response) => {
      const raw_data: Doodle[] = response.data
      raw_data.map((item: any) => {
        const cateItemList = item.doodle_category_id.map((id: any) => {
          const cate = listCategory.value.find((value) => value.id == id)
          return {
            id: cate?.id,
            title: cate?.title
          }
        })
        tableData.value.push({
          id: item._id,
          image: item.image,
          title: item.title,
          anniversary: item.time.dateString,
          category: cateItemList,
          views: item.views,
          likes: item.likes,
          status: (item.status == true) ? 'Published' : 'Draft',
          format: item.format,
          updatedAt: item.updatedAt
        })
      })

      const categoryId = localStorage.getItem('category_id')
      if (categoryId) {
        filterSelections.value = [['category', categoryId]]
        localStorage.removeItem('category_id')
      }
      // SORT
      if (sortSelection.value) {
        if (sortSelection.value[0] == 'title') {
          if (sortSelection.value[1] == 'ascending') {
            tableData.value.sort((a, b) => a.title.localeCompare(b.title))
          } else {
            tableData.value.sort((a, b) => b.title.localeCompare(a.title))
          }
        } else if (sortSelection.value[0] == 'time') {
          if (sortSelection.value[1] == 'latest') {
            tableData.value.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          } else {
            tableData.value.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
          }
        }
      }
      // FILTER
      console.log('filter', filterSelections.value)
      if (filterSelections.value) {
        const categoryFilter = filterSelections.value.filter((filter: any) => filter[0] == 'category')
        const formatFilter = filterSelections.value.filter((filter: any) => filter[0] == 'format')
        let temp = tableData.value.slice()
        console.log('temp', temp)
        if (categoryFilter.length > 0) {
          tableData.value = []
          categoryFilter.map((filter: any) => {
            const [type, value] = filter
            tableData.value.push(...temp.filter(item => {
              for (let cat of item.category) {
                if (cat.id == value) {
                  return true
                }
              }
              return false
            }))
          })
        }

        console.log('table', tableData.value)
        if (formatFilter.length > 0) {
          temp = tableData.value
          tableData.value = []
          formatFilter.map((filter: any) => {
              const [type, value] = filter
              tableData.value.push(...temp.filter((item) => item.format == value))
            }
          )
        }
      }
    }).catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to fetch doodle data',
        type: 'error'
      })
    })
}


function showDeleteDialog(id: any) {
  dialogVisible.value = true
  currentDoodleId.value = id
}

</script>

<template>
  <div class="">
    <div class="flex flex-col mt-5 mx-10">
      <div class="flex items-center text-3xl">
        <span class="text-3xl font-bold">Doodle Manager</span>
        <div class="flex ml-auto">
          <el-cascader
            v-model="sortSelection"
            :options="sortOptions"
            placeholder="Sort..."
            size="large"
            clearable
            @change="fetchData()"
            class="mr-5 w-1/2 text-2xl" />
          <el-cascader
            v-model="filterSelections"
            :options="filterOptions"
            placeholder="Filter..."
            :props="{ multiple: true}"
            collapse-tags
            max-collapse-tags="1"
            size="large"
            clearable
            @change="fetchData()"
            class="mr-5 w-3/4 text-2xl" />
        </div>
        <button class="bg-green-500 w-32 py-2 text-[white] text-xl my-5 mr-4 rounded-[6px] hover:opacity-80">
          <RouterLink to="/doodle/create">Create</RouterLink>
        </button>

      </div>
      <!-- table -->
      <div class="flex justify-center">
        <el-table
          :data="tableData"
          highlight-current-row
          class="w-full rounded-2xl"
          max-height="75vh"
          border
        >
          <el-table-column type="index" label="No." width="50" align="center" class="text-2xl" />
          <el-table-column property="image" label="Image" width="200" align="center">
            <template #default="scope">
              <RouterLink :to="`/doodle/detail/${scope.row.id}`">
                <div class="flex justify-center hover:opacity-60">
                  <img :src="scope.row.image" alt="" class="max-h-[100px]">
                </div>
              </RouterLink>
            </template>
          </el-table-column>
          <el-table-column property="title" label="Title" width="300" header-align="center" sortable>
            <template #default="scope">
              <RouterLink :to="`/doodle/detail/${scope.row.id}`" class="hover:text-blue-400">
                <span class="text-xl ">{{ scope.row.title }}</span>
              </RouterLink>
            </template>
          </el-table-column>
          <el-table-column property="anniversary" label="Anniversary" width="120" align="center">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.anniversary }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="category"
            label="Category"
            width="200"
            header-align="center"
          >
            <template #default="scope">
              <el-tag class="mr-2 mt-2" v-for="category in scope.row.category" :key="category.id">
                <span class="text-sm p-1">{{ category.title }}</span>
              </el-tag>

            </template>
          </el-table-column>

          <el-table-column class="text-xl" property="views" label="Views" width="70" align="center">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.views }}</span>
            </template>
          </el-table-column>
          <el-table-column property="likes" label="Likes" width="70" align="center">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.likes }}</span>
            </template>
          </el-table-column>
          <el-table-column property="status" label="Status" align="center" width="150">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column property="format" label="Format" align="center" width="100">
            <template #default="scope">
              <span class="text-xl">{{ scope.row.format.toUpperCase() }}</span>
            </template>
          </el-table-column>
          <el-table-column property="action" label="Action" align="center" width="200">
            <template #default="scope">
              <div class="flex flex-col items-center justify-center gap-2">
                <RouterLink :to="`/doodle/detail/${scope.row.id}`">
                  <el-button
                    type="primary"
                    size="default"
                    class="w-[80px]"
                  >
                    <span class="text-lg">Edit</span>
                  </el-button>
                </RouterLink>
                <el-button
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
            <el-button :disabled="!permissionConsts.has_permission" type="primary" @click="handleDelete(currentDoodleId)">
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