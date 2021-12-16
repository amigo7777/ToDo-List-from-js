import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
   {
     path: '/',
     name: 'Home',
     meta: {
       title: 'Главная страница',
       layout: 'main-layout'
     },
     component: () => import('@/pages/Home.vue')
   },
   {
     path: '/info',
     name: 'Info',
     meta: {
       title: 'Информация',
       layout: 'main-layout'
     },
     component: () => import('@/pages/Info.vue')
   },
   {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Вход',
      layout: 'auth-layout'
    },
    component: () => import('@/pages/LoginPage.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {
      title: 'Регистрация',
      layout: 'auth-layout'
    },
    component: () => import('@/pages/RegistrationPage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//защита роутов
router.beforeEach((to, from, next) =>{
  const{ accessToken } = localStorage;
  if (accessToken || to.name == 'login' || to.name == 'registration'){
    next();
  }
  else{
    next('/login')
  }

})

export default router