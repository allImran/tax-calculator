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
                                @input="$emit('onInput')"
                            >
                        </td>
                        <TableTd :text="item.exemption"/>
                        <TableTd :text="item.taxable_salary"/>
                    </template>
                </TableTr>
                <TableTr customBg="bg-gray-100 font-bold">
                    <TableTd :isNumber="false" :text="totalIncome.label"/>
                    <TableTd :text="totalIncome.gross_income"/>
                    <TableTd :text="totalIncome.exemption"/>
                    <TableTd :text="totalIncome.taxable_salary"/>
                    <!-- {{ totalIncome }} -->
                </TableTr>
            </tbody>
        </TableWrapper>
    </div>
</template>

<script setup>
import { first } from 'lodash'
import {computed} from 'vue'

const props = defineProps({
    salaryForm: Array,
    salaryReturn: Array
})

const totalIncome = computed(() => first(props.salaryReturn))
const thArr = [' Heads of income', 'Gross Income', 'Tax Exempted', 'Taxable Income']
const validKeys = ['basic_pay', 'house_rent', 'medical_allowance', 'conveyance_allowance', 'festival_bonus', 'other_allowance']
const showItem = (key) => validKeys.includes(key)
</script>