<template>
    <div class="flex flex-col items-center gap-6 bg-lightPink rounded-2xl shadow-lg py-8 px-12">
        <p class="text-center"><strong class="block text-xl mb-1">Email</strong>{{ email }}</p>
        <p class="text-center"><strong class="block text-xl mb-1">Nombre de Usuario</strong>{{ display_name || "No especificado" }}</p>
        <p class="text-center"><strong class="block text-xl mb-1">Biografia</strong>{{ bio || "No especificado" }}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'ProfileCard',
        props: {
            email: {
                type: String
            },
            display_name: {
                type: String
            },
            bio: {
                type: String
            }
        }
    }
</script>