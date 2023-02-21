<template>
    <td 
        class="py-3 px-6"
        :class="[isNumber ? 'text-right' : 'text-left']"
    >
        <span v-if="isNumber">{{  commaFormat(text) }}</span>
        <span v-else>{{  text }}</span>
    </td>
</template>

<script setup>
import {commaFormat} from '~/helper/utils'
defineProps({
    text: [String, Number],
    isNumber: {
        default: true
    },
})
</script>