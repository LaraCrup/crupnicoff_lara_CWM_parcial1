<script>
import MainH1 from '../components/MainH1.vue';
import { subscribeToAuth, changePassword } from '../services/auth';
import MainSection from '../components/MainSection.vue';
import MainLayout from '../components/form/MainLayout.vue';
import TextField from '../components/form/TextField.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import SystemAlert from '../components/SystemAlert.vue';
import MainError from '../components/form/MainError.vue';

export default {
    name: 'ChangePassword',
    components: {
        MainH1, MainSection, MainLayout, TextField, PrimaryButton, SystemAlert, MainError
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            form: {
                currentPassword: '',
                newPassword: '',
            },
            errors: {
                currentPassword: '',
                newPassword: ''
            },
            supabaseError: "",
            changeSuccess: false
        }
    },
    methods: {
        validateForm() {
            let isValid = true;
            this.errors.currentPassword = '';
            this.errors.newPassword = '';
            this.supabaseError = '';

            if (!this.form.currentPassword) {
                this.errors.currentPassword = 'La contraseña actual es requerida';
                isValid = false;
            }

            if (!this.form.newPassword) {
                this.errors.newPassword = 'La nueva contraseña es requerida';
                isValid = false;
            } else if (this.form.newPassword.length < 6) {
                this.errors.newPassword = 'La contraseña debe tener al menos 6 caracteres';
                isValid = false;
            }

            return isValid;
        },
        async handleSubmit() {
            if (!this.validateForm()) return;
            
            this.supabaseError = "";
            this.changeSuccess = false;

            try {
                await changePassword(this.form.newPassword);
                this.form.currentPassword = '';
                this.form.newPassword = '';
                this.changeSuccess = true;
                setTimeout(() => {
                    this.$router.push('/mi-perfil');
                }, 3000);
            } catch (error) {
                this.supabaseError = error.message;
            }
        }
    },
    mounted() {
        subscribeToAuth(newUserData => {
            this.user = newUserData;
        });
    }
}
</script>

<template>
    <MainSection>
        <MainH1>Cambiar contraseña</MainH1>
        <SystemAlert v-if="changeSuccess">
            <p>¡Contraseña actualizada exitosamente!</p>
        </SystemAlert>
        <MainLayout action="#" @submit.prevent="handleSubmit">
            <div class="w-full grid grid-cols-2 gap-8">
                <TextField 
                    id="currentPassword" 
                    label="Contraseña actual" 
                    type="password" 
                    v-model="form.currentPassword"
                    placeholder="Contraseña actual" 
                    :error="errors.currentPassword"
                    autocomplete="false" 
                />
                <TextField 
                    id="newPassword" 
                    label="Nueva contraseña" 
                    type="password" 
                    v-model="form.newPassword"
                    placeholder="Nueva contraseña" 
                    :error="errors.newPassword"
                    autocomplete="false" 
                />
            </div>
            <MainError v-if="supabaseError">{{ supabaseError }}</MainError>
            <PrimaryButton type="submit">Cambiar contraseña</PrimaryButton>
        </MainLayout>
    </MainSection>
</template>