import { createRouter, createWebHistory } from "vue-router";
import { subscribeToAuth } from "../services/auth";
import HomeFeed from "../pages/HomeFeed.vue";
import LogIn from "../pages/LogIn.vue";
import Register from "../pages/Register.vue";
import MyProfile from "../pages/MyProfile.vue";
import MyProfileEdit from "../pages/MyProfileEdit.vue";
import UserProfile from "../pages/UserProfile.vue";
import MyHabits from "../pages/MyHabits.vue";
import MyHabitsCreate from "../pages/MyHabitsCreate.vue";
import MyHabitsEdit from "../pages/MyHabitsEdit.vue";
import DocumentHabit  from "../pages/DocumentHabit.vue";
import ChangePassword  from "../pages/ChangePassword.vue";

const routes = [
    { path: '/',                              component: HomeFeed, meta: { requiresAuth: true } },
    { path: '/log-in',                        component: LogIn },
    { path: '/register',                      component: Register },
    { path: '/mi-perfil',                     component: MyProfile, meta: { requiresAuth: true } },
    { path: '/mi-perfil/editar',              component: MyProfileEdit, meta: { requiresAuth: true } },
    { path: '/mi-perfil/cambiar-contrasena',  component: ChangePassword, meta: { requiresAuth: true } },
    { path: '/usuario/:id',                   component: UserProfile, meta: { requiresAuth: true } },
    { path: '/mis-habitos',                   component: MyHabits, meta: { requiresAuth: true } },
    { path: '/mis-habitos/crear',             component: MyHabitsCreate, meta: { requiresAuth: true } },
    { path: '/mis-habitos/editar/:id',        component: MyHabitsEdit, meta: { requiresAuth: true } },
    { path: '/documentar-habito',             component: DocumentHabit, meta: { requiresAuth: true } },
  ]

const router = createRouter({
    routes, 
    history: createWebHistory(),
  })

  let user = {
    id: null,
    email: null,
  }
  subscribeToAuth(newUserData => user = newUserData);

  router.beforeEach((to, from) => {
      if (to.meta.requiresAuth && user.id === null) {
      return '/log-in';
    }
  })

  export default router;