// router/index.ts
import { createRouter, createWebHistory } from '@ionic/vue-router'
import ChatList from '../views/ChatListView.vue'
import Chat from '../views/ChatView.vue'

const routes = [
  { path: '/', component: ChatList },
  { path: '/chat', component: Chat },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
