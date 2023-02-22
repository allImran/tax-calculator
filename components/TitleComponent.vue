<template>
    <div class="rounded-tr rounded-tl pt-2 flex items-center justify-center gap-x-2 w-full bg-gray-100">
        <div class="w-3 h-3 rounded-full bg-red-200 shadow-sm"></div>
        <p class=" text-gray-400 font-semibold text-center ">{{ title }}</p>
    </div>
</template>

<script setup>
defineProps({
    title: String
})
</script>