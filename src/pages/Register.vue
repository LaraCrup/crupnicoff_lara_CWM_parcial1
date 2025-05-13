<script>
import { register } from '../services/auth.js';
import MainH1 from '../components/MainH1.vue';
import TextField from '../components/form/TextField.vue';
import MainButton from '../components/MainButton.vue';
import MainError from '../components/form/MainError.vue';

export default {
  name: 'Register',
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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.user.email)) {
        this.errors.email = 'El email no es válido';
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
      if (this.user.password.length < 6) {
        this.errors.password = 'La contraseña debe tener al menos 6 caracteres';
        return false;
      }
      this.errors.password = '';
      return true;
    },
    async handleSubmit() {
      this.supabaseError = "";
      if (!this.validateEmail() || !this.validatePassword()) {
        return;
      }
      try {
        const user = await register(this.user.email, this.user.password);
        if (user) {
          this.$router.push('/');
        }
      } catch (error) {
        this.supabaseError = error.message;
      }
    }
  },
}
</script>

<template>
  <MainH1>Registrate</MainH1>
  <form action="#" @submit.prevent="handleSubmit" class="flex flex-col items-center gap-8">
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
        autocomplete="new-password" 
        :error="errors.password"/>
    </div>
    <MainError v-if="supabaseError">{{ this.supabaseError }}</MainError>
    <MainButton type="submit">Crear Cuenta</MainButton>
  </form>
</template>