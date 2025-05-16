<template>
    <div v-if="show" class="fixed inset-0 bg-dark/60 flex items-center justify-center">
        <div class="relative w-[88vw] h-[95vh] flex flex-col gap-6 bg-light rounded-xl py-10 px-4 md:max-h-[90vh] md:max-w-[588px] lg:max-h-[95vh]  lg:max-w-2xl lg:w-full lg:p-12">
            <div class="absolute top-0 right-2 lg:top-2 lg:right-4">
                <button @click="$emit('close')" class="text-darkGreen text-5xl cursor-pointer">&times;</button>
            </div>
            <HabitUpdateCard class="w-full md:max-w-full" :username="habitData.profiles.display_name" :posted_at="new Date(habitData.created_at).toLocaleDateString()"
                :habit="habitData.habits.title" :goal_quantity="habitData.habits.goal_quantity"
                :goal_unit="habitData.habits.goal_unit" :frequency="transformFrequency(habitData.habits.frequency)"
                :content="habitData.content" :user_id="habitData.user_id" :isCurrentUser="isCurrentUser" :commenting="true" />
            <SectionComments :post_id="habitData.id" :username="habitData.profiles?.display_name"
                :posted_at="new Date(habitData.created_at).toLocaleDateString()" :comment="habitData.content" />
        </div>
    </div>
</template>

<script>
import HabitUpdateCard from './HabitUpdateCard.vue'
import SectionComments from './SectionComments.vue'

export default {
    name: 'ModalCommentPost',
    components: {
        HabitUpdateCard,
        SectionComments
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        habitData: {
            type: Object,
            required: true
        },
        isCurrentUser: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        transformFrequency(frequency) {
            const frequencyMap = {
                'diario': 'día',
                'semanal': 'semana',
                'mensual': 'mes'
            };
            return frequencyMap[frequency] || frequency;
        },
    },
}
</script>