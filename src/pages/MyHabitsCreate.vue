<script>
import MainError from '../components/form/MainError.vue';
import MainLabel from '../components/form/MainLabel.vue';
import MainLayout from '../components/form/MainLayout.vue';
import TextField from '../components/form/TextField.vue';
import MainH1 from '../components/MainH1.vue';
import MainSection from '../components/MainSection.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { subscribeToAuth } from '../services/auth';
import { saveNewHabit } from '../services/my-habits';

export default {
    name: 'MyHabitsCreate',
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
            newHabit: {
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
            if (!this.newHabit.title) {
                this.errors.title = "El título es requerido";
                isValid = false;
            } else if (this.newHabit.title.length <= 3) {
                this.errors.title = "El título debe tener más de 3 caracteres";
                isValid = false;
            }

            if (!this.newHabit.goal_quantity) {
                this.errors.goal_quantity = "La cantidad es requerida";
                isValid = false;
            } else if (this.newHabit.goal_quantity <= 0) {
                this.errors.goal_quantity = "El valor debe ser mayor a 0";
                isValid = false;
            }

            if (!this.newHabit.goal_unit) {
                this.errors.goal_unit = "La unidad de medida es requerida";
                isValid = false;
            }

            if (!this.newHabit.frequency) {
                this.errors.frequency = "La frecuencia es requerida";
                isValid = false;
            }

            return isValid;
        },

        async createHabit() {
            try {
                this.errors.general = null;
                
                if (!this.validateForm()) {
                    return;
                }

                await saveNewHabit({
                    habit: this.newHabit,
                    user_id: this.user.id,
                });

                this.newHabit = {
                    title: '',
                    goal_quantity: 0,
                    goal_unit: '',
                    frequency: ''
                };

                this.$router.push('/mis-habitos');
            } catch (error) {
                console.error("Error al crear habito:", error);
                this.errors.general = "Error al crear el hábito. Por favor intente nuevamente.";
            }
        }
    },
    mounted() {
        subscribeToAuth(newUserData => this.user = newUserData);
    }
}
</script>

<template>
    <MainSection>
        <MainH1>Crear nuevo hábito</MainH1>
        <MainLayout @submit.prevent="createHabit()">
            <div class="w-full flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-8">
                <TextField id="title" label="Título del hábito" type="text" v-model="newHabit.title"
                    placeholder="Título del hábito" autocomplete="false" :error="errors.title" />
                <TextField id="goal_quantity" label="Valor del hábito" type="number" v-model="newHabit.goal_quantity"
                    placeholder="Valor del hábito" autocomplete="false" :error="errors.goal_quantity" />
                <TextField id="goal_unit" label="Unidad de medida del hábito" type="text" v-model="newHabit.goal_unit"
                    placeholder="Unidad de medida del hábito" autocomplete="false" :error="errors.goal_unit" />
                <div class="flex flex-col gap-2">
                    <MainLabel :for="'frequency'">Frecuencia del hábito</MainLabel>
                    <select 
                        id="frequency"
                        v-model="newHabit.frequency"
                        class="bg-transparent py-2 px-4 border border-midGreen rounded-lg active:border-darkGreen focus:border-darkGreen focus:outline-none"
                    >
                        <option value="" disabled selected>Selecciona una frecuencia</option>
                        <option v-for="option in frequencyOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                    <MainError v-if="errors.frequency">{{ errors.frequency }}</MainError>
                </div>
            </div>
            <MainError v-if="errors.general">{{ errors.general }}</MainError>
            <PrimaryButton type="submit">Crear habito</PrimaryButton>
        </MainLayout>
    </MainSection>
</template>