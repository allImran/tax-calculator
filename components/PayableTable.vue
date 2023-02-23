<template>
    <div class="w-full  mb-12 xl:mb-0">
        <TableWrapper>
            <tbody>
                <TableTr customBg="bg-gray-50">
                    <TableTd :isNumber="false" text="Total Tax Liability"/>
                    <TableTd :text="taxLiability"/>
                </TableTr>
                <TableTr customBg="bg-gray-50">
                    <TableTd :isNumber="false" text="Advance Income Tax Deducted"/>
                    <td class="text-right">
                        <input
                            type="number "
                            class="bg-transparent py-3 px-6 text-right border-b border-red-600"
                            v-model="taxDeduction"
                        >
                    </td>
                </TableTr>
                <TableTr>
                    <TableTd :isNumber="false" text="Net Tax Payable (Yearly)"/>
                    <TableTd :text="yearlyTax"/>
                </TableTr>
                <TableTr customBg="bg-gray-50">
                    <TableTd :isNumber="false" text="Net Tax Payable (Monthly)"/>
                    <TableTd :text="yearlyTax / $route.query.month"/>
                </TableTr>
            </tbody>
        </TableWrapper>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const taxDeduction = ref(0)
const props = defineProps({
    minimumTax: [Number, String],
    taxLiability: [String, Number],
})
const thArr = ['Details', 'Amount', 'Eligible Amount']
const isLastItem = (index, length) => index == length - 1
const yearlyTax = computed(() => props.taxLiability - taxDeduction.value)
</script>