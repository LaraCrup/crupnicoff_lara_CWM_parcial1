<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div class="w-96 flex flex-col items-center gap-3 bg-light rounded-xl p-8">
            <h2 class="text-xl font-bold">Confirmar eliminación</h2>
            <p class="text-center">¿Estás seguro de que quieres eliminar este hábito?</p>
            <div class="flex gap-4">
                <button @click="$emit('cancel')" 
                    class="bg-lightGreen text-dark rounded-3xl py-2 px-6">
                    Cancelar
                </button>
                <button @click="$emit('confirm')" 
                    class="bg-error text-light rounded-3xl py-2 px-6">
                    Eliminar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeleteModal',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    }
}
</script>
