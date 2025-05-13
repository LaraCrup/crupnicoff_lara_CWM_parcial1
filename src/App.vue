<script>
import { RouterView } from 'vue-router';
import HomeFeed from './pages/HomeFeed.vue';
import { subscribeToAuth, logout } from './services/auth.js';
import LinkMenu from './components/nav/LinkMenu.vue';
import MainButton from './components/MainButton.vue';

export default {
  name: 'App',
  components: {
    HomeFeed, LinkMenu, MainButton
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
      console.log('Intentando cerrar sesión...');
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
  <nav class="flex items-center justify-between py-8 px-24 bg-darkGreen text-lightPink">
    <router-link to="/" class="text-xl font-bold">Hábitos Conectados</router-link>
    <ul class="flex items-center gap-12 ">
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
            <MainButton type="submit">Cerrar Sesión</MainButton>
          </form>
        </li>
      </template>
    </ul>
  </nav>
  <main class="py-12 px-24 bg-light">
    <RouterView />
  </main>
  <footer class="flex justify-center items-center h-20 bg-darkGreen text-lightPink font-semibold">
    <p>Lara Crupnicoff - Da Vinci</p>
  </footer>
</template>