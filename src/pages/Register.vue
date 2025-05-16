<script>
import { register } from '../services/auth.js';
import MainH1 from '../components/MainH1.vue';
import TextField from '../components/form/TextField.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import MainError from '../components/form/MainError.vue';
import MainSection from '../components/MainSection.vue';
import MainLayout from '../components/form/MainLayout.vue';
import SystemAlert from '../components/SystemAlert.vue';

export default {
  name: 'Register',
  components: {
    MainH1, TextField, PrimaryButton, MainError, MainSection, MainLayout, SystemAlert
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        display_name: ''
      },
      errors: {
        email: '',
        password: '',
        display_name: ''
      },
      supabaseError: "",
      registrationSuccess: false
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
    validateDisplayName() {
      if (!this.user.display_name) {
        this.errors.display_name = 'El nombre de usuario es requerido';
        return false;
      }
      if (this.user.display_name.length < 3) {
        this.errors.display_name = 'El nombre de usuario debe tener al menos 3 caracteres';
        return false;
      }
      this.errors.display_name = '';
      return true;
    },
    async handleSubmit() {
      this.supabaseError = "";
      this.registrationSuccess = false;
      if (!this.validateEmail() || !this.validatePassword() || !this.validateDisplayName()) {
        return;
      }
      try {
        const user = await register(this.user.email, this.user.password, this.user.display_name);
        if (user) {
          this.user.email = '';
          this.user.password = '';
          this.user.display_name = '';
          this.registrationSuccess = true;
        }
      } catch (error) {
        this.supabaseError = error.message;
      }
    }
  },
}
</script>

<template>
  <MainSection>
    <MainH1>Registrate</MainH1>
    <SystemAlert v-if="registrationSuccess">
      <p>¡Registro exitoso! Por favor, verifica tu email antes de iniciar sesión.</p>
    </SystemAlert>
    <MainLayout action="#" @submit.prevent="handleSubmit">
      <div class="w-full flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-8">
        <TextField id="display_name" label="Nombre de usuario" type="text" v-model="user.display_name" 
          placeholder="Nombre de usuario" :error="errors.display_name" />
        <TextField id="email" label="Email" type="email" v-model="user.email" placeholder="Email" 
          autocomplete="email" :error="errors.email" />
        <TextField id="password" label="Contraseña" type="password" v-model="user.password" 
          placeholder="Contraseña" autocomplete="false" :error="errors.password" />
      </div>
      <MainError v-if="supabaseError">{{ this.supabaseError }}</MainError>
      <PrimaryButton type="submit">Crear Cuenta</PrimaryButton>
    </MainLayout>
    <div>
      <p class="text-center text-sm text-dark">
        ¿Ya tienes cuenta?
        <router-link to="/log-in"
          class="font-semibold text-midGreen hover:text-darkPink transition duration-300 ">Inicia Sesión</router-link>
      </p>
    </div>
  </MainSection>
</template>