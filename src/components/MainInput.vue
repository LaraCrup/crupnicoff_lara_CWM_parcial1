<script>
export default {
    name: 'MainInput',
    props: [ 'modelValue' ],
    emits: [ 'update:model-value' ],
}
</script>

<template>
    <input class="w-full py-2 px-4 border border-gray-400 rounded"
    :value="modelValue"
    @input="$emit('update:model-value', $event.target.value)" />
</template>