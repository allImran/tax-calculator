<template>
    <div class="w-full  mb-12 xl:mb-0">
        <TableWrapper>
            <TableTh :thArr="thArr"/>
            <tbody>
                <TableTr
                    v-for="(item, i) in salaryReturn"
                    :key="i"
                    :index="i"
                >
                    <TableTd :isNumber="false" :text="item.label"/>
                    <TableTd :text="item.gross_income"/>
                    <TableTd :text="item.exemption"/>
                    <TableTd :text="item.taxable_salary"/>
                </TableTr>
            </tbody>
        </TableWrapper>
    </div>
</template>

<script setup>
const props = defineProps({
    salaryReturn: Array
})
const thArr = ['Particulars', 'Taxable Income', 'Tax Rate', 'Tax Amount']
const showItem = (key) => validKeys.includes(key)
</script>