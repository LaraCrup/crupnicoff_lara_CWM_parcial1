<script>
import MainH1 from '../components/MainH1.vue';
import MainSection from '../components/MainSection.vue';
import { subscribeToAuth } from '../services/auth';

export default {
    name: 'MyProfile',
    components: {
        MainH1, MainSection
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
            }
        }
    },
    mounted() {
        subscribeToAuth(newUserData => this.user = newUserData);
    }
}
</script>

<template>
    <MainSection class="relative">
        <MainH1>Mi Perfil</MainH1>
        <router-link to="/mi-perfil/editar"
            class="absolute top-0 right-0 text-light font-semibold bg-midGreen rounded-3xl py-2 px-4 hover:bg-darkGreen transition duration-300">Editar</router-link>
        <div class="flex flex-col items-center gap-6 bg-lightPink rounded-2xl shadow-lg py-8 px-12">
            <p class="text-center"><strong class="block text-xl mb-1">Email</strong>{{ user.email }}</p>
            <p class="text-center"><strong class="block text-xl mb-1">Nombre de Usuario</strong>{{ user.display_name || "No especificado" }}</p>
            <p class="text-center"><strong class="block text-xl mb-1">Biografia</strong>{{ user.bio || "No especificado" }}</p>
        </div>
    </MainSection>
</template>