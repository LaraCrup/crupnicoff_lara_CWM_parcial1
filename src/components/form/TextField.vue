<script>
import MainError from '../form/MainError.vue';
import MainLabel from '../form/MainLabel.vue';
import MainInput from '../form/MainInput.vue';

export default {
    name: 'TextField',
    components: {
        MainError,
        MainLabel,
        MainInput
    },
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        autocomplete: {
            type: String || Boolean,
            default: ''
        },
        error: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue', 'input'],
    methods: {
        validateInput(event) {
            this.$emit('input', event.target.value);
        }
    }
}
</script>

<template>
    <div class="w-full flex flex-col gap-2">
        <MainLabel :for="id">{{ label }}</MainLabel>
        <MainInput :id="id" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder" :autocomplete="autocomplete" />
        <MainError v-if="error">{{ error }}</MainError>
    </div>
</template>
