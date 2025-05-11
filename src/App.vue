<script>
import { RouterView } from 'vue-router';
import HomeFeed from './pages/HomeFeed.vue';
import { subscribeToAuth, logout } from './services/auth.js';

export default {
  name: 'App',
  components: {
    HomeFeed
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
  <nav class="flex items-center gap-8 p-4 bg-blue-200">
    <router-link to="/" class="text-lg">Hábitos Conectados</router-link>
    <ul class="flex items-center gap-4">
      <li>
        <router-link to="/">Inicio</router-link>
      </li>
      <template v-if="user.id === null">
        <li>
          <router-link to="/log-in">Iniciar Sesión</router-link>
        </li>
        <li>
          <router-link to="/register">Registrarse</router-link>
        </li>
      </template>
      <template v-else>
        <li>
          <router-link to="/mis-habitos">Mis habitos</router-link>
        </li>
        <li>
          <router-link to="/mi-perfil">Mi Perfil</router-link>
        </li>
        <li>
          <form @submit.prevent="handleLogout">
            <button type="submit"
              class="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-950 focus:bg-blue-950 transition duration-150 cursor-pointer">Cerrar
              Sesión</button>
          </form>
        </li>
      </template>
    </ul>
  </nav>
  <div class="container mx-auto p-4">
    <RouterView />
  </div>
  <footer class="flex justify-center items-center h-15 bg-slate-800 text-white">
    <p>Da Vinci</p>
  </footer>
</template>