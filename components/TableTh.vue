<template>
    <thead>
        <tr class="bg-gray-200 border border-gray-200 text-gray-600 capitalize text-sm leading-normal">
            <th
                v-for="(item, i) in thArr"
                :key="item"
                class="py-3 px-6 text-left"
                :class="[i>0 ? 'text-right' : 'text-left']"
            >{{ item }}
            </th>
        </tr>
    </thead>
</template>

<script setup>
const props = defineProps({
    thArr: Array
})
</script>