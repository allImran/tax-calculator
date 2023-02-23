<template>
    <div class="w-full  mb-12 xl:mb-0">
        <TableWrapper>
            <TableTh :thArr="thArr"/>
            <tbody>
                <TableTr>
                    <TableTd :isNumber="false" text="Lower of:"/>
                </TableTr>
                <TableTr customBg="bg-gray-50">
                    <TableTd :isNumber="false" text="Actual investment"/>
                    <td class="text-right">
                        <input
                            type="number"
                            class="bg-transparent py-3 px-6 text-right"
                            :value="actualInvestment"
                            @input="investmentUpdate($event.target.value)"
                        >
                    </td>
                    <TableTd text=""/>
                </TableTr>

                <template v-for="(item, i) in investment" :key="i">
                    <TableTr
                        :index="i"
                        :class="{'font-bold': isLastItem(i, investment.length)}"
                    >
                        <TableTd :isNumber="false" :text="item.label"/>
                        <TableTd :text="item.gross_income"/>
                        <TableTd :text="item.taxable_salary"/>
                    </TableTr>
                </template>
            </tbody>
        </TableWrapper>
    </div>
</template>

<script setup>
const props = defineProps({
    salaryReturn: Array,
    investment: Array,
    investmentUpdate: Function,
    actualInvestment: [String, Number]
})
const thArr = ['Details', 'Amount', 'Eligible Amount']
const isLastItem = (index, length) => index == length - 1
</script>