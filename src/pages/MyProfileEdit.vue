<script>
import MainH1 from '../components/MainH1.vue';
import MainSection from '../components/MainSection.vue';
import MainLayout from '../components/form/MainLayout.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import TextField from '../components/form/TextField.vue';
import MainLabel from '../components/form/MainLabel.vue';
import SystemAlert from '../components/SystemAlert.vue';
import { subscribeToAuth } from '../services/auth';
import { updateAuthProfile } from '../services/auth';

export default {
    name: 'MyProfileEdit',
    components: {
        MainH1, MainSection, MainLayout, TextField, PrimaryButton, MainLabel, SystemAlert
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            profile: {
                display_name: '',
                bio: '',
            },
            displayNameError: '',
            updateError: false
        }
    },
    methods: {
        async handleSubmit() {
            this.displayNameError = '';
            this.updateError = false;
            if (this.profile.display_name.length < 3) {
                this.displayNameError = 'El nombre debe tener al menos 3 caracteres';
                return;
            }

            try {
                await updateAuthProfile({ ...this.profile });
                this.$router.push('/mi-perfil');
            } catch (error) {
                this.updateError = true;
                console.error('Error updating profile:', error);
            }
        }
    },
    mounted() {
        subscribeToAuth(newUserData => {
            this.user = newUserData;
            this.profile = {
                display_name: this.user.display_name,
                bio: this.user.bio,
            }
        });
    },
};
</script>

<template>
    <MainSection>
        <SystemAlert v-if="updateError">
            <p>Error al actualizar el perfil. Por favor intente nuevamente.</p>
        </SystemAlert>
        <MainH1>Editar mi Perfil</MainH1>
        <MainLayout action="#" @submit.prevent="handleSubmit" class="max-w-2xl">
            <TextField id="displayName" label="Nombre de Usuario" type="text" v-model="profile.display_name" placeholder="Nombre de Usuario" autocomplete="false" :error="displayNameError" />
            <div class="w-full flex flex-col gap-2">
                <MainLabel for="bio">Biografia</MainLabel>
                <textarea id="bio" v-model="profile.bio" placeholder="Biografia"
                    class="w-full h-28 py-2 px-4 border border-midGreen rounded-lg resize-none active:border-darkGreen focus:border-darkGreen focus:outline-none" />
            </div>
            <PrimaryButton type="submit">Actualizar</PrimaryButton>
        </MainLayout>
    </MainSection>
</template>