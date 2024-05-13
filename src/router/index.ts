import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import DashboardView from '@/pages/DashboardView.vue'
import PerformanceView from '@/pages/PerformanceView.vue'
import ProfileView from '@/pages/ProfileView.vue'
import DoodleView from '@/pages/doodles/DoodleView.vue'
import DoodleDetail from '@/pages/doodles/DoodleDetail.vue'
import DoodleCreate from '@/pages/doodles/DoodleCreate.vue'
import UserView from '@/pages/users/UserView.vue'
import CategoryView from '@/pages/categories/CategoryView.vue'
import LoginView from '@/pages/LoginView.vue'


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
              name: 'doodle-view',
              component: DoodleView
            },
            {
              path: 'detail/:id',
              component: DoodleDetail
            },
            {
              path: 'create',
              component: DoodleCreate
            },
          ]
        },
        {
          path: '/category',
          name: 'category',
          component : CategoryView
        },
        {
          path: '/user',
          name: 'user',
          component: UserView
        },
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
