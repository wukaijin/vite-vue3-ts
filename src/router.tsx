import {
  RouteRecordRaw,
  createRouter,
  createMemoryHistory,
  RouteLocation,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  NavigationGuardNext
} from 'vue-router'
import Layout from '@/components/Layout'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: (location: RouteLocation) => {
      if (location.fullPath === '/') {
        return '/main/home'
      }
      return '/404'
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('@/pages/signin')
  },
  {
    path: '/main',
    meta: { auth: 'private' },
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home')
      },
      { path: 'guide', name: 'Guide', component: () => import('@/pages/guide') }
    ]
  },

  {
    path: '/:pathMatch(.*)*', // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
    name: '404',
    component: () => import('@/pages/404')
  }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createMemoryHistory(),
  routes
})

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedLoaded,
    next: NavigationGuardNext
  ) => {
    // 获取userToken，根据业务场景可由localStorage也可由cookie中获取
    const user = window.localStorage.getItem('user')
    // 路由守卫判断
    console.log(to.meta)
    if (!user && to.meta.auth) {
      next({ name: 'Signin' })
      return
    }

    next()
  }
)

export default router
