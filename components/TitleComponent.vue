<template>
    <p class="pt-2 rounded-tr rounded-tl text-gray-400 font-semibold text-center bg-gray-100">{{ title }}</p>
</template>

<script setup>
defineProps({
    title: String
})
</script>