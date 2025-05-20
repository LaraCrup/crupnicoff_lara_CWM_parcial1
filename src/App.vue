<script>
import { RouterView } from 'vue-router';
import HomeFeed from './pages/HomeFeed.vue';
import { subscribeToAuth, logout } from './services/auth.js';
import LinkMenu from './components/nav/LinkMenu.vue';
import PrimaryButton from './components/PrimaryButton.vue';

export default {
  name: 'App',
  components: {
    HomeFeed, LinkMenu, PrimaryButton
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      }
    }
  },
  methods: {
    handleLogout() {
      logout();
      this.$router.push('/log-in');
    }
  },
  async mounted() {
    subscribeToAuth(userData => this.user = userData)
  }
}
</script>

<template>
  <nav class="w-full flex flex-col items-center justify-between bg-darkGreen text-lightPink px-6 py-3 lg:flex-row lg:px-24 lg:py-8">
    <router-link to="/" class="text-xl font-bold">Hábitos Conectados</router-link>
    <ul class="h-19 flex flex-wrap items-center justify-center gap-4 md:h-fit md:gap-12">
      <template v-if="user.id === null">
        <LinkMenu link="/log-in">Iniciar Sesión</LinkMenu>
        <LinkMenu link="/register">Registrarse</LinkMenu>
      </template>
      <template v-else>
        <LinkMenu link="/">Inicio</LinkMenu>
        <LinkMenu link="/mis-habitos">Mis habitos</LinkMenu>
        <LinkMenu link="/mi-perfil">Mi Perfil</LinkMenu>
        <li>
          <form @submit.prevent="handleLogout">
            <PrimaryButton type="submit">Cerrar Sesión</PrimaryButton>
          </form>
        </li>
      </template>
    </ul>
  </nav>
  <main class="w-full bg-light p-6 lg:py-12 lg:px-24">
    <RouterView />
  </main>
  <footer class="w-full flex justify-center items-center bg-darkGreen text-lightPink font-semibold">
    <p class="text-sm lg:text-md">Lara Crupnicoff - Da Vinci</p>
  </footer>
</template>