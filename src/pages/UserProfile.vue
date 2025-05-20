<script>
import MainH1 from '../components/MainH1.vue';
import { getUserProfileByPK } from '../services/profile';
import { getHabitUpdatesByUserId } from '../services/document-habits.js';
import MainSection from '../components/MainSection.vue';
import ProfileCard from '../components/ProfileCard.vue';
import HabitUpdateCard from '../components/posts/HabitUpdateCard.vue';
import { transformFrequency } from '../utils/transformFrequency.js';
import ModalCommentPost from '../components/posts/ModalCommentPost.vue';

export default {
    name: 'UserProfile',
    components: {
        MainH1, MainSection, ProfileCard, HabitUpdateCard, ModalCommentPost
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
            showModal: false,
            selectedHabit: null,
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
        try {
            this.user = await getUserProfileByPK(this.$route.params.id);
            this.userPosts = await getHabitUpdatesByUserId(this.user.id);            
        } catch (error) {
            console.error('Error loading profile data:', error);
        }
    }
}
</script>

<template>
    <MainSection>
        <MainH1>Perfil de {{ user.display_name }}</MainH1>
        <ProfileCard :email="user.email" :display_name="user.display_name" :bio="user.bio" />
    </MainSection>
    <MainSection>
        <h2 class="text-2xl font-bold text-darkGreen mt-8">Posts del usuario</h2>
        <div v-if="userPosts.length > 0"
            class="w-full flex flex-col items-center gap-6 md:grid md:grid-cols-2 md:justify-items-center lg:grid-cols-3 lg:justify-between lg:gap-12">
            <HabitUpdateCard v-for="habitPost in userPosts" :key="habitPost.id" :user_id="habitPost.user_id"
                :username="user.display_name" :posted_at="new Date(habitPost.created_at).toLocaleDateString()"
                :habit="habitPost.habits.title" :goal_quantity="habitPost.habits.goal_quantity"
                :goal_unit="habitPost.habits.goal_unit" :frequency="transformFrequency(habitPost.habits.frequency)"
                :content="habitPost.content" :is-current-user="habitPost.user_id === user.id"
                @open-comments="() => openModal(habitPost)" />
        </div>
        <p v-else>Este usuario aún no tiene posts</p>
        <ModalCommentPost v-if="showModal" :show="showModal" :habitData="selectedHabit"
            :isCurrentUser="selectedHabit.user_id === user.id" @close="closeModal" />
    </MainSection>
</template>