<script>
import MainSection from '../components/MainSection.vue';
import MainH1 from '../components/MainH1.vue';
import MainLayout from '../components/form/MainLayout.vue';
import MainError from '../components/form/MainError.vue';
import MainLabel from '../components/form/MainLabel.vue';
import MainTextarea from '../components/form/MainTextarea.vue';
import { subscribeToAuth } from '../services/auth';
import { getMyHabits } from '../services/my-habits';
import { saveHabitDocument } from '../services/document-habits';
import PrimaryButton from '../components/PrimaryButton.vue';
import MainLoader from '../components/MainLoader.vue';

export default {
    name: 'CreatePost',
    components: {
        MainSection, MainH1, MainLayout, MainError, MainLabel, PrimaryButton, MainTextarea, MainLoader
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            habits: [],
            selectedHabit: '',
            content: '',
            loading: true,
            errors: {
                habit: null,
                content: null,
                general: null
            }
        }
    },
    methods: {
        async loadHabits() {
            if (this.user.id) {
                this.habits = await getMyHabits(this.user.id);
                this.loading = false;
            }
        },
        async handleSubmit() {
            try {
                if (!this.selectedHabit) {
                    this.errors.habit = "Debes seleccionar un hábito";
                    return;
                }
                if (!this.content) {
                    this.errors.content = "Debes escribir un contenido";
                    return;
                }

                await saveHabitDocument({
                    habitId: this.selectedHabit,
                    userId: this.user.id,
                    content: this.content
                });

                this.$router.push('/');
            } catch (error) {
                this.errors.general = "Error al guardar la documentación";
                console.error(error);
            }
        }
    },
    mounted() {
        subscribeToAuth(newUserData => {
            this.user = newUserData;
            this.loadHabits().then(() => {
                const habitId = this.$route.query.habit;
                if (habitId) {
                    this.selectedHabit = habitId;
                }
            });
        });
    }
}

</script>

<template>
    <MainSection>
        <MainH1>Documentar un hábito</MainH1>
        <MainLoader v-if="loading" />
        
        <div v-else-if="habits.length === 0" class="flex flex-col items-center gap-4">
            <p>No tienes ningún hábito creado. Debes crear un hábito antes de poder documentarlo.</p>
            <PrimaryButton>
                <router-link to="/mis-habitos/crear">Crear nuevo hábito</router-link>
            </PrimaryButton>
        </div>
        
        <MainLayout v-else @submit.prevent="handleSubmit" class="max-w-2xl">
            <div class="w-full flex flex-col gap-2">
                <MainLabel :for="'habit'">Hábito</MainLabel>
                <select id="habit" v-model="selectedHabit"
                    class="bg-transparent py-2 px-4 border border-midGreen rounded-lg active:border-darkGreen focus:border-darkGreen focus:outline-none">
                    <option value="" disabled selected>Selecciona uno de tus habitos</option>
                    <option v-for="habit in habits" :key="habit.id" :value="habit.id">
                        {{ habit.title }}
                    </option>
                </select>
                <MainError v-if="errors.habit">{{ errors.habit }}</MainError>
            </div>
            <div class="w-full flex flex-col gap-2">
                <MainLabel for="content">Documenta tu hábito</MainLabel>
                <MainTextarea 
                    id="content"
                    v-model="content"
                    placeholder="Cuentale a la comunidad como te fue con tu hábito hoy"
                />
                <MainError v-if="errors.content">{{ errors.content }}</MainError>
            </div>
            <MainError v-if="errors.general">{{ errors.general }}</MainError>
            <PrimaryButton type="submit">Publicar</PrimaryButton>
        </MainLayout>
    </MainSection>
</template>