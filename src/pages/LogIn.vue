<script>
import MainH1 from '../components/MainH1.vue';
import { login } from '../services/auth.js';
import TextField from '../components/form/TextField.vue';
import MainButton from '../components/MainButton.vue';
import MainError from '../components/form/MainError.vue';

export default {
  name: 'LogIn',
  components: {
    MainH1, TextField, MainButton, MainError
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      errors: {
        email: '',
        password: ''
      },
      supabaseError: ""
    }
  },
  methods: {
    validateEmail() {
      if (!this.user.email) {
        this.errors.email = 'El email es requerido';
        return false;
      }
      this.errors.email = '';
      return true;
    },
    validatePassword() {
      if (!this.user.password) {
        this.errors.password = 'La contraseña es requerida';
        return false;
      }
      this.errors.password = '';
      return true;
    },
    async handleSubmit() {
      try {
        const user = await login(this.user.email, this.user.password);
        console.log("Usuario logueado con éxito", user);
        this.$router.push('/');
      } catch (error) {
        this.supabaseError = error.message;
      }
    }
  },
}
</script>

<template>
  <MainH1>Ingresar a mi Cuenta</MainH1>
  <form action="" @submit.prevent="handleSubmit" class="flex flex-col items-center gap-8">
    <div class="w-full grid grid-cols-2 gap-8">
      <TextField 
        id="email" 
        label="Email" 
        type="email" 
        v-model="user.email"
        placeholder="Email" 
        autocomplete="email" 
        :error="errors.email"/>
      <TextField 
        id="password" 
        label="Contraseña" 
        type="password" 
        v-model="user.password"
        placeholder="Contraseña" 
        autocomplete="password" 
        :error="errors.password"/>
    </div>
    <MainError v-if="supabaseError">{{ this.supabaseError }}</MainError>
    <MainButton type="submit">Iniciar Sesión</MainButton>
  </form>
  <div class="mt-8">
    <p class="text-center text-sm text-dark">
      ¿No tienes cuenta? 
      <router-link to="/register" class="font-semibold text-midGreen hover:text-darkPink transition duration-300 ">Regístrate</router-link>
    </p>
  </div>
</template>