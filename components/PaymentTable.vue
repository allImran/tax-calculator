<template>
    <div class="w-full  mb-12 xl:mb-0">
        <TableWrapper>
            <TableTh :thArr="thArr"/>
            <tbody>
                <TableTr
                    v-for="(item, i) in salaryForm"
                    :key="i"
                    :index="i"
                >
                    <template v-if="showItem(item.key)">
                        <TableTd :isNumber="false" :text="item.label"/>
                        <!-- <TableTd :text="item.gross_income"/> -->
                        <td class="text-right">
                            <input 
                                type="number"
                                class="bg-transparent py-3 px-6 text-right"
                                v-model="item.gross_income"
                                @input="handleUpdate($event, item.key)"
                            >
                        </td>
                        <TableTd :text="item.exemption"/>
                        <TableTd :text="item.taxable_salary"/>
                    </template>
                </TableTr>
                
                <TableTr v-for="head in heads" :key="head.title">
                    <td class="py-3 px-6 text-left">
                        <select v-model="head.value" class="bg-transparent">
                            <option :value="null">{{ head.title }}</option>
                            <option
                                v-for="item in headItem"
                                :key="item.key"
                                :value="item.key"
                            >
                                {{ item.label }}
                            </option>
                        </select>
                    </td>
                    <template v-if="head.value">
                        <td class="text-right">
                            <input
                                type="number"
                                class="bg-transparent py-3 px-6 text-right"
                                v-model="getItem(head.value).gross_income"
                                @input="handleUpdate($event, head.value)"
                            >
                        </td>
                        <TableTd :text="getItem(head.value).exemption"/>
                        <TableTd :text="getItem(head.value).taxable_salary"/>
                    </template>
                </TableTr>

                <TableTr v-if="totalIncome" customBg="bg-gray-100 font-bold">
                    <TableTd :isNumber="false" :text="totalIncome.label"/>
                    <TableTd :text="totalIncome.gross_income"/>
                    <TableTd :text="totalIncome.exemption"/>
                    <TableTd :text="totalIncome.taxable_salary"/>
                </TableTr>
            </tbody>
        </TableWrapper>
    </div>
</template>

<script setup>
import { first } from 'lodash'
import {computed} from 'vue'
import headItem from '~/data/head.js'

const props = defineProps({
    salaryForm: Array,
    salaryReturn: Array
})
const emit = defineEmits(['onInput'])

const totalIncome = computed(() => first(props.salaryReturn))
const heads = ref([
    {
        title: 'Head 1',
        value: null
    },
    {
        title: 'Head 2',
        value: null
    },
    {
        title: 'Head 3',
        value: null
    }
])
const thArr = [' Heads of income', 'Gross Income', 'Tax Exempted', 'Taxable Income']
const validKeys = ['basic_pay', 'house_rent', 'medical_allowance', 'conveyance_allowance', 'festival_bonus', 'other_allowance']
const showItem = (key) => validKeys.includes(key)

const getItem = (_key) => props.salaryForm.find(({key}) => key === _key)
const handleUpdate = (event, _key) => {
    if(!event.target.value) return
    let itemIndex = props.salaryForm.findIndex(({key}) => key === _key)
    emit('onInput', itemIndex, 'gross_income', event.target.value)
}
</script>