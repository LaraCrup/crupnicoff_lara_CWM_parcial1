<template>
    <div class="max-w-130 flex flex-col items-center gap-3 bg-lightPink rounded-2xl shadow-lg py-2 px-4 md:py-8 md:px-12 md:gap-6">
        <p class="text-center text-sm md:text-md"><strong class="block text-md mb-1 md:text-xl">Email</strong>{{ email }}</p>
        <p class="text-center text-sm md:text-md"><strong class="block text-md mb-1 md:text-xl">Nombre de Usuario</strong>{{ display_name || "No especificado" }}</p>
        <p class="text-center text-sm md:text-md"><strong class="block text-md mb-1 md:text-xl">Biografia</strong>{{ bio || "No especificado" }}
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