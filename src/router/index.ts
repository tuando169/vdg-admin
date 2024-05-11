import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import UserView from '@/components/users/UserView.vue'
import DoodleView from '@/components/doodles/DoodleView.vue'
import ProfileView from '@/components/ProfileView.vue'
import PerformanceView from '@/components/PerformanceView.vue'
import DashboardView from '@/components/DashboardView.vue'
import LoginView from '@/components/LoginView.vue'
import DoodleDetail from '@/components/doodles/DoodleDetail.vue'
import DoodleCreate from '@/components/doodles/DoodleCreate.vue'
import CategoryView from '@/components/categories/CategoryView.vue'
import CategoryDetail from '@/components/categories/CategoryDetail.vue'
import CategoryCreate from '@/components/categories/CategoryCreate.vue'

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
          path: '/user',
          name: 'user',
          component: UserView
        },
        {
          path: '/category',
          name: 'category',
          component: CategoryView,
          children: [
            {
              path: 'detail/:id',
              component: CategoryDetail,
            },
            {
              path: 'create',
              component: CategoryCreate
            }
          ]
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
