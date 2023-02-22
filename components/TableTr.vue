<template>
    <tr
        :class="getBg(index)"
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

const getBg = (index) => { 
    if(props.customBg) return props.customBg
    return isEven(index) ? 'bg-gray-50' : ''
}
</script>