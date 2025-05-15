<template>
    <textarea
        class="w-full border border-midGreen rounded-lg active:border-darkGreen focus:border-darkGreen focus:outline-none resize-none p-2"
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
</template>

<script>
export default {
    name: 'MainTextarea',
    props: {
        id: {
            type: String,
            required: true
        },
        modelValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Escribe un comentario...'
        }
    },
    emits: ['update:modelValue']
}
</script>