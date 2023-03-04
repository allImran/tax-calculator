<template>
    <input
        class="bg-transparent py-3 px-6 text-right border-b border-red-600"
        type="text"
        :value="commaFormat(modelValue)"
        @input="updateValue"
    >
</template>

<script setup>
import { commaFormat } from '~/helper/utils'

const emit = defineEmits(['update:modelValue', 'onUpdate'])
const props = defineProps({
    modelValue: [String, Number]
})

const updateValue = (event) => {
    const regex = /[^0-9]+/g;
    const val = event.target.value.replace(regex, "");
    emit('update:modelValue', parseInt(val))
    emit('onUpdate', parseInt(val))
}
</script>

