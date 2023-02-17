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
                        <TableTd :text="item.label"/>
                        <TableTd :text="item.gross_income"/>
                        <TableTd :text="item.exemption"/>
                        <TableTd :text="item.taxable_salary"/>
                    </template>
                </TableTr>
            </tbody>
        </TableWrapper>
    </div>
</template>

<script setup>
const props = defineProps({
    salaryForm: Array
})
const thArr = [' Heads of income', 'Gross Income', 'Tax Exempted', 'Taxable Income']
const validKeys = ['basic_pay', 'house_rent', 'medical_allowance', 'conveyance_allowance']
const showItem = (key) => validKeys.includes(key)
</script>