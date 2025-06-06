<script>
import MainH1 from '../components/MainH1.vue';
import MainSection from '../components/MainSection.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { subscribeToAuth } from '../services/auth';
import { getAllHabitUpdates } from '../services/document-habits';
import HabitUpdateCard from '../components/posts/HabitUpdateCard.vue';
import ModalCommentPost from '../components/posts/ModalCommentPost.vue';
import MainLoader from '../components/MainLoader.vue';
import { transformFrequency } from '../utils/transformFrequency.js';

export default {
    name: 'HomeFeed',
    components: {
        MainSection, MainH1, PrimaryButton, HabitUpdateCard, ModalCommentPost, MainLoader
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            habitUpdates: [],
            showModal: false,
            selectedHabit: null,
            loading: true,
        }
    },
    methods: {
        transformFrequency,
        openModal(habitData) {
            this.selectedHabit = habitData
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
            this.selectedHabit = null
        }
    },
    async mounted() {
        subscribeToAuth(newUserData => {
            this.user = newUserData;
        });
        try {
            this.habitUpdates = await getAllHabitUpdates();
            this.loading = false;
        } catch (error) {
            console.error('Error loading habit updates:', error);
        }
    }
}
</script>

<template>
    <MainSection>
        <MainH1>Habitos Conectados</MainH1>
        <PrimaryButton><router-link to="/documentar-habito">Documentar nuevo habito</router-link></PrimaryButton>
        <MainLoader v-if="loading" />
        <div v-else
            class="w-full flex flex-col items-center gap-6 md:grid md:grid-cols-2 md:justify-items-center lg:grid-cols-3 lg:justify-between lg:gap-12">
            <HabitUpdateCard v-for="habitPost in habitUpdates" :key="habitPost.id" :user_id="habitPost.user_id"
                :username="habitPost.profiles.display_name"
                :posted_at="new Date(habitPost.created_at).toLocaleDateString()" :habit="habitPost.habits.title"
                :goal_quantity="habitPost.habits.goal_quantity" :goal_unit="habitPost.habits.goal_unit"
                :frequency="transformFrequency(habitPost.habits.frequency)" :content="habitPost.content"
                :is-current-user="habitPost.user_id === user.id" @open-comments="() => openModal(habitPost)" />
        </div>
        <ModalCommentPost v-if="showModal" :show="showModal" :habitData="selectedHabit"
            :isCurrentUser="selectedHabit.user_id === user.id" @close="closeModal" />
    </MainSection>
</template>