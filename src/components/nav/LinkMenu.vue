<template>
    <li class="font-semibold hover:text-lightGreen transition-all duration-300">
        <router-link :to="link">
            <slot />
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