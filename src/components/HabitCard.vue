<template>
    <div class="w-68 h-full flex flex-col items-center justify-center gap-2 bg-midGreen/60 rounded-xl shadow-lg py-6 px-4 md:max-w-90 md:w-full lg:max-w-full">
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <p>{{ goal_quantity }} {{ goal_unit }} por {{ frequency }}</p>
        <div class="flex gap-4 mt-2">
            <router-link :to="`/mis-habitos/editar/${id}`" class="bg-lightGreen text-dark rounded-3xl py-1 px-4">
                Editar
            </router-link>
            <button @click="$emit('delete', id)" class="bg-lightGreen text-dark rounded-3xl cursor-pointer py-1 px-4">
                Eliminar
            </button>
        </div>
        <router-link :to="`/documentar-habito?habit=${id}`" class="bg-lightPink text-dark rounded-3xl py-1 px-4 mt-2">
            Documentar
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'HabitCard',
        props: {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                default: ''
            },
            goal_quantity: {
                type: Number,
                default: 0
            },
            goal_unit: {
                type: String,
                default: ''
            },
            frequency: {
                type: String,
                default: ''
            }
        }
    }
</script>