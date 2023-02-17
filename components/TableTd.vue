<template>
    <td class="py-3 px-6 text-left">{{ text }}</td>
</template>

<script setup>
defineProps({
    text: [String, Number]
})
</script>