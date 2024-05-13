<template>
  <div class="w-full h-full">
    <div class="flex flex-grow bg-[#FAF1F0] items-center shadow-xl z-10 fixed w-[100vw]">
      <div class="flex items-center ml-3">
        <img src="../../public/logo.png" alt="logo" class="w-[100px]">
        <span class="font-semibold text-2xl ml-4">VietDoodle Gallery</span>
      </div>
      <div class="flex ml-auto mr-8 my-5 gap-5 ">
        <div class="text-right">
          <p class="text-[20px] font-semibold">Admin</p>
          <p class="text-[18px] font-semibold text-[#787486]">Viet Nam</p>
        </div>
        <img src="../../public/avatar.jpg" alt="avatar" class="size-[56px] rounded-full object-cover">

      </div>

      <!--    SIDEBAR-->
    </div>

    <div class="flex flex-row h-full w-full text-xl">
      <nav class="flex flex-col h-full w-[250px] bg-[#FAF1F0] shadow-xl pt-[100px] fixed">
        <RouterLink to="/dashboard" class="hover:bg-[#f5dad7]">
          <div class="flex items-center py-6 px-8 ">

            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80v-240H200v240h200Zm80 0h280v-240H480v240ZM200-520h560v-240H200v240Z" />
            </svg>
            <span class="pl-4 font-medium text-[black]">Dashboard</span>
          </div>

        </RouterLink>
        <RouterLink to="/doodle" class="hover:bg-[#f5dad7] ">
          <div class="flex items-center py-6 px-8">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
            </svg>
            <span class="pl-4 font-medium text-[black]">Doodle</span>
          </div>
        </RouterLink>

        <RouterLink to="/category" class="hover:bg-[#f5dad7]">
          <div class="flex items-center py-6 px-8 ">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path
                d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" />
            </svg>
            <span class="pl-4 font-medium text-[black]">Category</span>

          </div>
        </RouterLink>

        <RouterLink to="/user" class="hover:bg-[#f5dad7] ">
          <div class="flex items-center py-6 px-8">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path
                d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
            </svg>
            <span class="pl-4 font-medium text-[black]">User</span>
          </div>
        </RouterLink>

        <div class="flex items-center py-6 px-8 hover:cursor-pointer hover:bg-[#f5dad7]" @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path
              d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
          <span class="pl-4 font-medium text-[black]">Logout</span>
        </div>

      </nav>
      <RouterView class=" text-9xl mt-[96px] ml-[250px] w-full" />
    </div>
  </div>

</template>

<script setup lang="ts">
import router from '@/router'


if (!localStorage.getItem('token')) localStorage.setItem('token', 'none')
const token = localStorage.getItem('token')
if (token != 'admin' && token != 'guest') router.push('/login')

function logout() {
  router.push('/login')
  localStorage.setItem('token', 'none')
}
</script>


<style scoped>
.active {
  background-color: #f5dad7;
}

.profile-active {
  background-color: #f5dad7;
  border-radius: 50%;
}
</style>