<script>
import MainError from '../components/form/MainError.vue';
import MainLabel from '../components/form/MainLabel.vue';
import MainLayout from '../components/form/MainLayout.vue';
import TextField from '../components/form/TextField.vue';
import MainH1 from '../components/MainH1.vue';
import MainSection from '../components/MainSection.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { subscribeToAuth } from '../services/auth';
import { updateHabit, getHabitById } from '../services/my-habits';

export default {
    name: 'MyHabitsEdit',
    components: {
        MainH1, MainSection, PrimaryButton, MainLayout, TextField, MainError, MainLabel
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            frequencyOptions: [
                { value: 'diario', label: 'Diario' },
                { value: 'semanal', label: 'Semanal' },
                { value: 'mensual', label: 'Mensual' }
            ],
            habit: {
                title: '',
                goal_quantity: 0,
                goal_unit: '',
                frequency: ''
            },
            errors: {
                title: null,
                goal_quantity: null,
                goal_unit: null,
                frequency: null,
                general: null
            },
        }
    },
    methods: {
        validateForm() {
            Object.keys(this.errors).forEach(key => {
                this.errors[key] = null;
            });
            let isValid = true;
            if (!this.habit.title) {
                this.errors.title = "El título es requerido";
                isValid = false;
            } else if (this.habit.title.length <= 3) {
                this.errors.title = "El título debe tener más de 3 caracteres";
                isValid = false;
            }

            if (!this.habit.goal_quantity) {
                this.errors.goal_quantity = "La cantidad es requerida";
                isValid = false;
            } else if (this.habit.goal_quantity <= 0) {
                this.errors.goal_quantity = "El valor debe ser mayor a 0";
                isValid = false;
            }

            if (!this.habit.goal_unit) {
                this.errors.goal_unit = "La unidad de medida es requerida";
                isValid = false;
            }

            if (!this.habit.frequency) {
                this.errors.frequency = "La frecuencia es requerida";
                isValid = false;
            }

            return isValid;
        },

        async loadHabit() {
            try {
                const habitId = this.$route.params.id;
                const habitData = await getHabitById(habitId);
                this.habit = habitData;
            } catch (error) {
                console.error("Error al cargar hábito:", error);
                this.errors.general = "Error al cargar el hábito. Por favor intente nuevamente.";
            }
        },

        async updateHabit() {
            try {
                this.errors.general = null;
                
                if (!this.validateForm()) {
                    return;
                }

                await updateHabit(this.$route.params.id, this.habit);
                this.$router.push('/mis-habitos');
            } catch (error) {
                console.error("Error al actualizar hábito:", error);
                this.errors.general = "Error al actualizar el hábito. Por favor intente nuevamente.";
            }
        }
    },
    mounted() {
        subscribeToAuth(newUserData => this.user = newUserData);
        this.loadHabit();
    }
}
</script>

<template>
    <MainSection>
        <MainH1>Editar hábito</MainH1>
        <MainLayout @submit.prevent="updateHabit()">
            <div class="w-full grid grid-cols-2 gap-8">
                <TextField id="title" label="Título del hábito" type="text" v-model="habit.title"
                    placeholder="Título del hábito" autocomplete="false" :error="errors.title" />
                <TextField id="goal_quantity" label="Valor del hábito" type="number" v-model="habit.goal_quantity"
                    placeholder="Valor del hábito" autocomplete="false" :error="errors.goal_quantity" />
                <TextField id="goal_unit" label="Unidad de medida del hábito" type="text" v-model="habit.goal_unit"
                    placeholder="Unidad de medida del hábito" autocomplete="false" :error="errors.goal_unit" />
                <div class="flex flex-col gap-2">
                    <MainLabel :for="'frequency'">Frecuencia del hábito</MainLabel>
                    <select 
                        id="frequency"
                        v-model="habit.frequency"
                        class="bg-transparent py-2 px-4 border border-midGreen rounded-lg active:border-darkGreen focus:border-darkGreen focus:outline-none"
                    >
                        <option value="" disabled>Selecciona una frecuencia</option>
                        <option v-for="option in frequencyOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                    <MainError v-if="errors.frequency">{{ errors.frequency }}</MainError>
                </div>
            </div>
            <MainError v-if="errors.general">{{ errors.general }}</MainError>
            <PrimaryButton type="submit">Guardar cambios</PrimaryButton>
        </MainLayout>
    </MainSection>
</template>
