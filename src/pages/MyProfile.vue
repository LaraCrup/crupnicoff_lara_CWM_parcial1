<script>
import MainH1 from '../components/MainH1.vue';
import MainSection from '../components/MainSection.vue';
import { subscribeToAuth } from '../services/auth';
import ProfileCard from '../components/ProfileCard.vue';
import { getHabitUpdatesByUserId } from '../services/document-habits.js';
import HabitUpdateCard from '../components/posts/HabitUpdateCard.vue';
import MainLoader from '../components/MainLoader.vue';

export default {
    name: 'MyProfile',
    components: {
        MainH1, MainSection, ProfileCard, HabitUpdateCard, MainLoader
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
            },
            userPosts: [],
            loading: true
        }
    },
    methods: {
        transformFrequency(frequency) {
            const frequencyMap = {
                'diario': 'día',
                'semanal': 'semana',
                'mensual': 'mes'
            };
            return frequencyMap[frequency] || frequency;
        }
    },
    async mounted() {
        subscribeToAuth(newUserData => this.user = newUserData);
        try {
            this.userPosts = await getHabitUpdatesByUserId(this.user.id);
            this.loading = false;
        } catch (error) {
            console.error('Error loading profile data:', error);
        }
    }
}
</script>

<template>
    <MainSection class="relative">
        <MainH1>Mi Perfil</MainH1>
        <div class="flex flex-col items-center gap-4 md:flex-row lg:absolute lg:top-0 lg:right-0">
            <router-link to="/mi-perfil/editar"
                class=" w-fit flex items-center text-light font-semibold bg-midGreen rounded-3xl py-2 px-4 hover:bg-darkGreen transition duration-300">Editar</router-link>
            <router-link to="/mi-perfil/cambiar-contrasena"
                class="flex items-center text-light font-semibold bg-midGreen rounded-3xl py-2 px-4 hover:bg-darkGreen transition duration-300">Cambiar contraseña</router-link>
        </div>
        <ProfileCard :email="user.email" :display_name="user.display_name" :bio="user.bio" />
    </MainSection>
    <MainSection>
        <h2 class="text-2xl font-bold text-darkGreen mt-8">Posts del usuario</h2>
        <MainLoader v-if="loading" />
        <div v-else-if="!loading && userPosts.length > 0" class="w-full flex flex-col items-center gap-6 md:grid md:grid-cols-2 md:justify-items-center lg:grid-cols-3 lg:justify-between lg:gap-12">
            <HabitUpdateCard 
                v-for="habitPost in userPosts"
                :key="habitPost.id"
                :user_id="habitPost.user_id"
                :username="user.display_name"
                :posted_at="new Date(habitPost.created_at).toLocaleDateString()"
                :habit="habitPost.habits.title"
                :goal_quantity="habitPost.habits.goal_quantity"
                :goal_unit="habitPost.habits.goal_unit"
                :frequency="transformFrequency(habitPost.habits.frequency)"
                :content="habitPost.content"
                :is-current-user="habitPost.user_id === user.id"
            />
        </div>
        <p v-else>Este usuario aún no tiene posts</p>
    </MainSection>
</template>