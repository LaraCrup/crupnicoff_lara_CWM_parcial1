<script>
import MainH1 from '../components/MainH1.vue';
import { login } from '../services/auth.js';
import TextField from '../components/form/TextField.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import MainError from '../components/form/MainError.vue';
import MainSection from '../components/MainSection.vue';
import MainLayout from '../components/form/MainLayout.vue';

export default {
  name: 'LogIn',
  components: {
    MainH1, TextField, PrimaryButton, MainError, MainSection, MainLayout
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
        this.$router.push('/');
      } catch (error) {
        this.supabaseError = error.message;
      }
    }
  },
}
</script>

<template>
  <MainSection>
    <MainH1>Ingresar a mi Cuenta</MainH1>
    <MainLayout action="#" @submit.prevent="handleSubmit" >
      <div class="w-full flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-8">
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
          autocomplete="false" 
          :error="errors.password"/>
      </div>
      <MainError v-if="supabaseError">{{ this.supabaseError }}</MainError>
      <PrimaryButton type="submit">Iniciar Sesión</PrimaryButton>
    </MainLayout>
    <div>
      <p class="text-center text-sm text-dark">
        ¿No tienes cuenta? 
        <router-link to="/register" class="font-semibold text-midGreen hover:text-darkPink transition duration-300 ">Regístrate</router-link>
      </p>
    </div>
  </MainSection>
</template>