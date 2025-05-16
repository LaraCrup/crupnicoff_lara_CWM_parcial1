<template>
    <li>
        <router-link :to="link" class="font-semibold hover:text-lightGreen transition-all duration-300">
            <slot class="text-sm lg:text-md" />
        </router-link>
    </li>
</template>

<script>
    export default {
        name: 'LinkMenu',
        props: {
            link: {
                type: String,
                required: true
            }
        }
    }
</script>