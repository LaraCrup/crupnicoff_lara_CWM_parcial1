<script>
export default {
    name: 'MainInput',
    props: [ 'modelValue' ],
    emits: [ 'update:model-value' ],
}
</script>

<template>
    <input class="w-full py-2 px-4 border border-midGreen rounded-lg active:border-darkGreen focus:border-darkGreen focus:outline-none"
    :value="modelValue"
    @input="$emit('update:model-value', $event.target.value)" />
</template>