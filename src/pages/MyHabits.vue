<script>
import HabitCard from '../components/HabitCard.vue';
import MainH1 from '../components/MainH1.vue';
import MainSection from '../components/MainSection.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import DeleteModal from '../components/DeleteModal.vue';
import { subscribeToAuth } from '../services/auth';
import { getMyHabits, deleteHabit } from '../services/my-habits';
import MainLoader from '../components/MainLoader.vue';
import { transformFrequency } from '../utils/transformFrequency.js';

export default {
    name: 'MyHabits',
    components: {
        MainH1, MainSection, PrimaryButton, HabitCard, DeleteModal, MainLoader
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            habits: [],
            showDeleteModal: false,
            habitToDelete: null,
            loading: true,
        }
    },
    methods: {
        async loadHabits() {
            if (this.user.id) {
                this.habits = await getMyHabits(this.user.id);
                this.loading = false;
            }
        },
        async handleDeleteIntent(habitId) {
            this.habitToDelete = habitId;
            this.showDeleteModal = true;
        },
        async confirmDelete() {
            await deleteHabit(this.habitToDelete);
            this.showDeleteModal = false;
            this.habitToDelete = null;
            await this.loadHabits();
        },
        cancelDelete() {
            this.showDeleteModal = false;
            this.habitToDelete = null;
        },
        transformFrequency
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
        <MainLoader v-if="loading" />
        <div v-else-if="!loading && habits.length > 0" class="w-full flex flex-col items-center gap-6 md:grid md:grid-cols-2 md:justify-items-center lg:grid-cols-3 lg:justify-between lg:gap-12">
            <HabitCard 
                v-for="habit in habits" 
                :key="habit.id"
                :id="habit.id"
                :title="habit.title" 
                :goal_quantity="habit.goal_quantity" 
                :goal_unit="habit.goal_unit" 
                :frequency="transformFrequency(habit.frequency)"
                @delete="handleDeleteIntent"
            >
            </HabitCard>
        </div>
        <p v-else>Aún no tienes hábitos creados</p>
        <DeleteModal 
            :is-open="showDeleteModal"
            @confirm="confirmDelete"
            @cancel="cancelDelete"
        />
    </MainSection>
</template>

<style scoped>

</style>