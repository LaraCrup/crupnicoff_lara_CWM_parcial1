<template>
    <div
        class="w-68 h-full flex flex-col items-center gap-6 bg-lightPink/20 border border-lightPink rounded-xl shadow-xl p-6 md:max-w-75 md:w-full lg:max-w-full">
        <div class="w-full flex flex-wrap items-center justify-between">
            <router-link :to="isCurrentUser ? '/mi-perfil' : `/usuario/${user_id}`"
                class="font-medium text-lg text-gray-700 underline">{{ username }}</router-link>
            <p class="text-sm text-gray-700">{{ posted_at }}</p>
        </div>
        <div class="w-full flex flex-col items-center">
            <h2 class="text-xl font-semibold text-darkPink">{{ habit }}</h2>
            <p class="text-sm text-dark">Meta: {{ goal_quantity }} {{ goal_unit }} por {{ frequency }}</p>
        </div>
        <div class="w-full bg-light p-3 rounded-lg">
            <p class="text-dark text-center">{{ content }}</p>
        </div>
        <div v-if="!commenting" class="self-start">
            <p class="text-sm cursor-pointer hover:text-darkPink" @click="handleClick">Comentar esta publicacion</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HabitUpdate',
    methods: {
        handleClick() {
            const habitData = {
                username: this.username,
                posted_at: this.posted_at,
                habit: this.habit,
                goal_quantity: this.goal_quantity,
                goal_unit: this.goal_unit,
                frequency: this.frequency,
                content: this.content,
                user_id: this.user_id,
                isCurrentUser: this.isCurrentUser
            }
            this.$emit('open-comments', habitData)
        }
    },
    props: {
        username: {
            type: String,
            required: true
        },
        posted_at: {
            type: String,
            required: true
        },
        habit: {
            type: String,
            required: true
        },
        goal_quantity: {
            type: Number,
            required: true
        },
        goal_unit: {
            type: String,
            required: true
        },
        frequency: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        isCurrentUser: {
            type: Boolean,
            required: true
        },
        commenting: {
            type: Boolean,
            default: false
        }
    }
}
</script>