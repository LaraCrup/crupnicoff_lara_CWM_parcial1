<script>
import MainH1 from '../components/MainH1.vue';
import MainSection from '../components/MainSection.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { subscribeToAuth } from '../services/auth';
import { getAllHabitUpdates } from '../services/document-habits';
import HabitUpdateCard from '../components/posts/HabitUpdateCard.vue';

export default {
    name: 'HomeFeed',
    components: {
        MainSection, MainH1, PrimaryButton, HabitUpdateCard
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            habitUpdates: []
        }
    },
    methods: {
        async loadHabitUpdates() {
            this.habitUpdates = await getAllHabitUpdates();
        },
        transformFrequency(frequency) {
            const frequencyMap = {
                'diario': 'día',
                'semanal': 'semana',
                'mensual': 'mes'
            };
            return frequencyMap[frequency] || frequency;
        }
    },
    mounted() {
        subscribeToAuth(newUserData => {
            this.user = newUserData;
            this.loadHabitUpdates();
        });
    }
}
</script>

<template>
    <MainSection>
        <MainH1>Habitos Conectados</MainH1>
        <PrimaryButton><router-link to="/documentar-habito">Documentar nuevo habito</router-link></PrimaryButton>
        <div class="w-full grid grid-cols-3 justify-between gap-12">
            <HabitUpdateCard 
                v-for="habitPost in habitUpdates"
                :key="habitPost.id"
                :user_id="habitPost.user_id"
                :username="habitPost.profiles.display_name"
                :posted_at="new Date(habitPost.created_at).toLocaleDateString()"
                :habit="habitPost.habits.title"
                :goal_quantity="habitPost.habits.goal_quantity"
                :goal_unit="habitPost.habits.goal_unit"
                :frequency="transformFrequency(habitPost.habits.frequency)"
                :content="habitPost.content"
                :is-current-user="habitPost.user_id === user.id"
            />
        </div>
    </MainSection>
</template>