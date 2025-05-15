<script>
import MainH1 from '../components/MainH1.vue';
import { getUserProfileByPK } from '../services/profile';
import { getHabitUpdatesByUserId } from '../services/document-habits.js';
import MainSection from '../components/MainSection.vue';
import ProfileCard from '../components/ProfileCard.vue';
import HabitUpdateCard from '../components/posts/HabitUpdateCard.vue';

export default {
    name: 'UserProfile',
    components: {
        MainH1, MainSection, ProfileCard, HabitUpdateCard
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
            },
            userPosts: []
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
        <div v-if="userPosts.length > 0" class="w-full grid grid-cols-3 justify-between gap-12">
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