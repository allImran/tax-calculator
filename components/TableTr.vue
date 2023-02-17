<template>
    <tr
        :class="[isEven(index) ? 'bg-gray-50' : '']"
        class="border-b border-gray-200  hover:bg-gray-100"
    >
        <slot></slot>
    </tr>
</template>

<script setup>
defineProps({
    index: Number
})

const isEven = (index) => index % 2 == 0
</script>