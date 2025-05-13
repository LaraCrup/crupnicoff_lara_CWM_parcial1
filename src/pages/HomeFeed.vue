<script>
import MainH1 from '../components/MainH1.vue';
import MainSection from '../components/MainSection.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { subscribeToAuth } from '../services/auth';

export default {
    name: 'HomeFeed',
    components: {
        MainSection, MainH1, PrimaryButton
    },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
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
        <MainH1>Habitos Conectados</MainH1>
        <PrimaryButton>Documentar nuevo habito</PrimaryButton>
    </MainSection>

</template>