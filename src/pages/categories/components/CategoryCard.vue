<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRightBold, ArrowRight } from '@element-plus/icons-vue'
import axios from 'axios'
import { apiEndpoint } from '@/apiEndpoint'
import { ElNotification } from 'element-plus'
import router from '@/router'
import { permissionConsts } from '@/globalData'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const isShowDescription = ref(false)
const dialogVisible = ref(false)
const currentDoodleId = ref('')
const isEdit = ref(false)

const colorArray = [
  '#29CDB5',
  '#ED8240',
  '#FBFF00',
  '#30E3CA',
  '#54E346',
  '#3C79F5',
  '#BFF6C3',
  '#F6C3BF',
  '#F6C3F6',
  '#C3F6F6',
  '#FF8E8F'
]

const randomGradient = computed(() => {

  const color1 = colorArray[Math.floor(Math.random() * colorArray.length)]
  const color2 = colorArray[Math.floor(Math.random() * colorArray.length)]
  return `linear-gradient(135deg, ${color1}, ${color2})`
})

function showDeleteDialog(id: any) {
  dialogVisible.value = true
  currentDoodleId.value = id
}

async function handleDelete() {
  await axios.delete(apiEndpoint.category.delete + props.category.id)
    .then((response) => {
      ElNotification({
        title: 'Success',
        message: 'Delete successfully',
        type: 'success'
      })
      dialogVisible.value = false
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Error',
        message: 'Failed to delete category',
        type: 'error'
      })
    })
}

async function handleEdit() {
  try {
    const formData = new FormData()
    formData.append('title', props.category.title)
    formData.append('description', props.category.description)
    console.log('title', props.category.title)
    console.log('description', props.category.description)
    const response = await axios.patch(apiEndpoint.category.edit + props.category.id, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    if (response.status == 200) {
      ElNotification({
        title: 'Success',
        message: 'Update category successfully',
        type: 'success'
      })

      isEdit.value = false
    }
  } catch (error) {
    console.log(error)
    ElNotification({
      title: 'Error',
      message: 'Failed to update category',
      type: 'error'
    })
  }
}

function navigateToDoodleView(categoryId: string) {
  router.push({name: 'doodle-view'})
  localStorage.setItem('category_id', categoryId)
}
</script>

<template>
  <div
    class="flex p-4 rounded-2xl text-4xl hover:shadow-xl gap-1 items-center relative"
    :class="{'bg-[#f5dad7]': isEdit, 'bg-white': !isEdit}"

  >
    <div
      class="w-40 h-40 rounded-2xl cursor-pointer"
      :style="{ background: randomGradient }"
      @click="navigateToDoodleView(props.category.id)"
    ></div>
    <div class="absolute top-2 right-2 flex gap-2">
      <el-button v-show="!isEdit" type="primary" size="large" @click="isEdit=true">
        <span class="text-xl">Edit</span>
      </el-button>
      <el-button :disabled="!permissionConsts.has_permission" v-show="isEdit" type="primary" size="large" @click="handleEdit">
        <span class="text-xl">Update</span>
      </el-button>
      <el-button :disabled="!permissionConsts.has_permission" type="danger" size="large" @click="showDeleteDialog(props.category.id)">
        <span class="text-xl">Delete</span>
      </el-button>
    </div>
    <div class="ml-3 mt-2 w-[calc(100%-180px)]">
      <input
        :disabled="!isEdit"
        type="text"
        :class="{ 'underline': isEdit}"
        class="font-black bg-transparent max-w-[60%] "
        :size="props.category.title.length"
        v-model="props.category.title"
      >
      <div class="flex items-center">
        <span class="font-semibold text-3xl pt-1">Description</span>
        <el-icon size="28" class="ml-auto">
          <ArrowRight

            :class="{ 'rotate-90': isShowDescription }"
            @click="isShowDescription=!isShowDescription"
            class="hover:opacity-60 hover:cursor-pointer transition-transform"
          />
        </el-icon>
      </div>
      <textarea
        :disabled="!isEdit"
        :class="{ 'underline': isEdit}"
        class="font-normal bg-transparent text-lg max-h-20 w-full overflow-y-scroll no-scrollbar"
        v-show="isShowDescription"
        v-model="props.category.description" />


    </div>
    <div class="text-2xl">
      <el-dialog
        v-model="dialogVisible"
        title="Confirm Delete"
        width="500"
      >
        <span>Are you sure to delete this category?</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleDelete">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>


<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
