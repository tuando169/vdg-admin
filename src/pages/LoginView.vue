<template>
  <div class="flex items-center justify-center w-screen h-screen bg-cover bg-center" style="background-image: url('../../public/bg.png')">
    <div class="flex flex-col items-center w-full max-w-xl p-10 bg-white shadow-2xl rounded-2xl gap-5 md:w-3/5 lg:w-2/5">
      <div class="w-1/3 flex justify-center">
        <img src="../../public/logo.png" alt="logo" class="w-full">
      </div>

      <p class="text-center text-2xl">Welcome to VietDoodle Gallery</p>
      <div class="flex flex-col items-center gap-5 w-full">
        <div class="flex items-center gap-3 w-full">
          <span class="font-bold w-1/4 min-w-max">Username</span>
          <input type="text" v-model="username"
                 class="border-gray-400 border-2 rounded-xl pl-2 text-lg flex-1"> <!-- Thinner border -->
        </div>
        <div class="flex items-center gap-3 w-full">
          <span class="font-bold w-1/4 min-w-max">Password</span>
          <input type="password" v-model="password"
                 class="border-gray-400 border-2 rounded-xl pl-2 text-lg flex-1"> <!-- Thinner border -->
        </div>
      </div>
      <div class="flex gap-10 justify-center pt-3 w-full">
        <button class="bg-blue-600 rounded-lg text-white px-7 py-1 text-xl" @click="guest">Login as Guest</button>
        <button class="bg-blue-600 rounded-lg text-white px-7 py-1 text-xl" @click="submit">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ADMIN, permissionConsts } from '@/globalData'
import router from '@/router'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
const username = ref()
const password = ref()

function submitByEnter(e: any) {
  if (e.key == 'Enter') {
    submit()
  }
}
document.addEventListener('keypress',submitByEnter)
document.removeEventListener('keypress',submitByEnter)

function submit() {
  if (username.value == ADMIN.username && password.value == ADMIN.password) {
    permissionConsts.has_permission = true
    localStorage.setItem('token', 'admin')
    router.push('/dashboard')
  } else {
    ElNotification({
      title: 'Error',
      message: 'Username or password is incorrect',
      type: 'error'
    })
  }
}

function guest(){
  permissionConsts.has_permission = false
  localStorage.setItem('token', 'guest')
  router.push('/dashboard')
}
function forgotPassword() {

}
</script>