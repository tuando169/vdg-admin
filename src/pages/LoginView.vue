<template>
  <div class="w-[100vw] h-[100vh] flex items-center justify-center">
    <div class="flex flex-col pt-10 bg-white w-[40%] h-1/2 shadow-2xl rounded-2xl absolute z-10 gap-5">
      <div class="flex justify-center h-1/4">
        <img src="../../public/logo.png" alt="logo" class="">
      </div>

      <p class="text-center">Welcome to VietDoodle Gallery</p>
      <div class="flex flex-col items-center gap-5">
        <div>
          <span class="pr-8 font-bold">Username</span>
          <input type="text" v-model="username"
                 class="border-[#7D7D7D] border-[3px] rounded-xl pl-2 text-2xl ">
        </div>
        <div>
          <span class="pr-8 font-bold">Password</span>
          <input type="password" v-model="password"
                 class="border-[#7D7D7D] border-[3px] rounded-xl pl-2 text-2xl">
        </div>
      </div>
      <div class="flex gap-10 justify-center pt-3">
        <button class="bg-[#036EFF] rounded-lg text-white px-7 py-1 text-xl" @click="guest">Login as Guest</button>
        <button class="bg-[#036EFF] rounded-lg text-white px-7 py-1 text-xl" @click="submit">Login</button>
      </div>
    </div>
    <img src="../../public/bg.png" alt="bg" class="object-cover bg-center w-full h-full ">

  </div>
</template>

<script setup lang="ts">
import { ADMIN } from '@/globalData'
import router from '@/router'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
const username = ref()
const password = ref()

function submit() {
  if (username.value == ADMIN.username && password.value == ADMIN.password) {
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
  localStorage.setItem('token', 'guest')
  router.push('/dashboard')
}
function forgotPassword() {

}
</script>