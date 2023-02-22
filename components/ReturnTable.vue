<template>
    <div class="w-full  mb-12 xl:mb-0">
        <TableWrapper>
            <TableTh :thArr="thArr"/>
            <tbody>
                <template v-for="(item, i) in salaryReturn" :key="i">
                    <TableTr
                        v-if="i != 0"
                        :index="i"
                        :class="{'font-bold': isLastItem(i, salaryReturn.length)}"
                    >
                        <TableTd :isNumber="false" :text="item.label"/>
                        <TableTd :text="item.gross_income"/>
                        <TableTd :text="item.exemption"/>
                        <TableTd :text="item.taxable_salary"/>
                    </TableTr>
                </template>
            </tbody>
        </TableWrapper>
    </div>
</template>

<script setup>
const props = defineProps({
    salaryReturn: Array
})
const thArr = ['Particulars', 'Taxable Income', 'Tax Rate', 'Tax Amount']
const isLastItem = (index, length) => index == length - 1
</script>