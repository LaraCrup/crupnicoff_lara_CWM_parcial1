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
      },
      errors: {
        email: '',
        password: ''
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
    async handleSubmit() {
      this.supabaseError = "";
      this.registrationSuccess = false;
      if (!this.validateEmail() || !this.validatePassword()) {
        return;
      }
      try {
        const user = await register(this.user.email, this.user.password);
        if (user) {
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
      <p class="text-darkPink">¡Registro exitoso! Por favor, verifica tu email antes de iniciar sesión.</p>
    </SystemAlert>
    <MainLayout action="#" @submit.prevent="handleSubmit">
      <div class="w-full grid grid-cols-2 gap-8">
        <TextField id="email" label="Email" type="email" v-model="user.email" placeholder="Email" autocomplete="email"
          :error="errors.email" />
        <TextField id="password" label="Contraseña" type="password" v-model="user.password" placeholder="Contraseña"
          autocomplete="false" :error="errors.password" />
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