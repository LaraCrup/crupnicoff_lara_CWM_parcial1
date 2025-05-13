<script>
import MainH1 from '../components/MainH1.vue';
import MainSection from '../components/MainSection.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { subscribeToAuth } from '../services/auth';
import { getMyHabits } from '../services/habits';

export default {
    name: 'MyHabits',
    components: {
        MainH1, MainSection, PrimaryButton
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            habits: []
        }
    },
    methods: {
        async loadHabits() {
            if (this.user.id) {
                this.habits = await getMyHabits(this.user.id);
            }
        }
    },
    mounted() {
        subscribeToAuth(newUserData => {
            this.user = newUserData;
            this.loadHabits();
        });
    }
}
</script>

<template>
    <MainSection>
        <MainH1>Mis Hábitos</MainH1>
        <PrimaryButton><router-link to="/mis-habitos/crear">Crear nuevo hábito</router-link></PrimaryButton>
        
        <div v-if="habits.length > 0" class="habits-grid">
            <div v-for="habit in habits" :key="habit.id" class="habit-card">
                <h3>{{ habit.title }}</h3>
                <p>{{ habit.goal_quantity }}</p>
                <p>{{ habit.goal_unit }}</p>
                <p>{{ habit.frequency }}</p>
            </div>
        </div>
        <p v-else>Aún no tienes hábitos creados</p>
    </MainSection>
</template>

<style scoped>
.habits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
}

.habit-card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}
</style>