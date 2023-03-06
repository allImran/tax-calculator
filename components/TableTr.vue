<template>
    <tr
        :class="getBg()"
        class="border-b border-gray-200  hover:bg-gray-100"
    >
        <slot></slot>
    </tr>
</template>

<script setup>
const props = defineProps({
    index: Number,
    customBg: String
})

const isEven = (index) => {
    if(!props.index) return false
    return index % 2 == 0
}

const getBg = (index) => props.customBg ?  props.customBg : ''
</script>