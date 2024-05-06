import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import UserView from '@/components/UserView.vue'
import DoodleView from '@/components/doodles/DoodleView.vue'
import ProfileView from '@/components/ProfileView.vue'
import PerformanceView from '@/components/PerformanceView.vue'
import DashboardView from '@/components/DashboardView.vue'
import LoginView from '@/components/LoginView.vue'
import DoodleDetail from '@/components/doodles/DoodleDetail.vue'
import DoodleCreate from '@/components/doodles/DoodleCreate.vue'
import DoodleUpdate from '@/components/doodles/DoodleUpdate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'admin',
      redirect: { name: 'dashboard' },
      component: AppLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: '/performance',
          name: 'performance',
          component: PerformanceView
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfileView
        },
        {
          path: '/doodle',
          children: [
            {
              path: '',
              name: 'doodle',
              component: DoodleView
            },
            {
              path: 'detail/:id',
              name: 'detail-doodle',
              component: DoodleDetail
            },
            {
              path: 'create',
              name: 'create-doodle',
              component: DoodleCreate
            },
          ]
        },
        // {
        //   path: '/doodle',
        //   name: 'doodle',
        //   component: DoodleView,
        //
        // },
        // {
        //   path: 'doodle/detail/:id',
        //   name: 'detail-doodle',
        //   component: DoodleDetail
        // },
        // {
        //   path: 'doodle/create',
        //   name: 'create-doodle',
        //   component: DoodleCreate
        // },
        {
          path: '/user',
          name: 'user',
          component: UserView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }

  ]
})

export default router
