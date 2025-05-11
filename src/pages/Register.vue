<script>
import { register } from '../services/auth.js';
import MainH1 from '../components/MainH1.vue';
import MainInput from '../components/MainInput.vue';
import MainLabel from '../components/MainLabel.vue';
import MainButton from '../components/MainButton.vue';

export default {
  name: 'Register',
  components: {
    MainH1, MainInput, MainLabel, MainButton
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await register(this.user.email, this.user.password);        
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
      }
    }
  },
}
</script>

<template>
  <MainH1>Registrate</MainH1>
  <form action="" @submit.prevent="handleSubmit">
    <div class="mb-4">
        <MainLabel for="email">Email</MainLabel>
        <MainInput type="text" id="email" v-model="user.email" placeholder="Email" />
    </div>
    <div class="mb-4">
        <MainLabel for="password">Password</MainLabel>
        <MainInput type="text" id="password" v-model="user.password" placeholder="Password" />
    </div>
    <MainButton type="submit">Crear Cuenta</MainButton>
  </form>
</template>