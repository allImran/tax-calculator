<template>
    <div class="relative">
        <Tab></Tab>
        <client-only>
            <div>
            <PdfWrapper>
                <div class="flex gap-x-20 mt-10 text-sm">
                    <div class="flex items-center">
                        <p class="font-semibold">Gender:</p>
                        <select v-model="gender">
                            <option :value="null">Select</option>
                            <option
                                v-for="{title, value} in genderList"
                                :key="value" 
                                :value="value"
                            >{{ title }}
                            </option>
                        </select>
                    </div>
                    <div class="flex items-center">
                        <p class="font-semibold">Location:</p>
                        <select  v-model="taxFileLocation">
                            <option :value="null">Select</option>
                            <option
                                class="capitalize"
                                v-for="{value, title} in locationArr"
                                :key="value" 
                                :value="value"
                            >
                                {{ title }}
                            </option>
                        </select>
                    </div>
                </div>
                <TitleComponent class="mt-5 m-w-900" title="Income Details"/>
                <div class="m-w-900 px-5 py-2 bg-gray-100 rounded-br rounded-bl overflow-x-auto">
                    <div class="flex gap-x-10 text-sm px-5 bg-gray-100 w-full">
                        <div class="w-40">
                            <p class="text-center">Monthly Gross</p>
                            
                            <FormattedInput
                                style="text-align: center;"
                                class="border-none text-center w-full"
                                v-model="monthlyGross"
                                @onUpdate="debounceUpdate"
                            />
                        </div>
                        <div class="w-40">
                            <p class="text-center">No of months</p>
                            <input
                                type="number"
                                class="font-sm text-center bg-transparent w-full"
                                v-model="month"
                                max="12"
                                min="1"
                                @input="debounceUpdate"
                            >
                        </div>
                        <div class="w-40">
                            <p class="text-center">Yearly Gross Salary</p>
                            <p class="text-center font-semibold">{{ commaFormat(yearlyGross) }}</p>
                        </div>
                    </div>
                    <PaymentTable @onInput="handleCalculateUpdate" :salaryReturn="salaryReturn" :salaryForm="salaryIncome"/>
                </div>

                <TitleComponent class="mt-5 m-w-900" title="Calculation of Income Tax Liability"/>
                <div  class="m-w-900 overflow-x-auto bg-gray-100 px-5 py-2 rounded-br rounded-bl">
                    <ReturnTable :salaryReturn="salaryReturn"/>
                </div>

                <TitleComponent class="mt-5 m-w-900" title="Calculation of Tax Credit on Investment"/>
                <div  class="m-w-900 overflow-x-auto bg-gray-100 px-5 py-2 rounded-br rounded-bl ">
                    <InvestmentTable 
                        :investment="investment"
                        :salaryReturn="salaryReturn"
                        :actualInvestment="actualInvestment"
                        :investmentUpdate="investmentUpdate"
                    />
                </div>

                <TitleComponent class="mt-5 m-w-900" title="Income Tax Payable"/>
                <div  class="m-w-900 overflow-x-auto bg-gray-100 px-5 py-2 rounded-br rounded-bl">
                    <PayableTable 
                        :minimumTax="minimumTax"
                        :taxLiability="taxLiability"
                    />
                </div>
            </PdfWrapper>
        </div>
        </client-only>
        <img v-if="isLoading" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="/loader.gif" alt="">
    </div>
</template>

<script setup>
import axios from 'axios'
import { commaFormat } from '~/helper/utils'
import { debounce, last } from 'lodash'
import { onMounted } from 'vue'
import genderList from '@/data/gender.js'
const locationArr = [{
    value: 'dhaka_city_corporation',
    title: 'Dhaka'
}];
const isLoading = ref(false)
const route = useRoute()
const salaryForm = ref([])
const salaryReturn = ref([])
const investment = ref([])
const actualInvestment = ref(route.query.actual_investment)
const minimumTax = ref(0)
const salaryIncome = ref([])
const gender = ref(route.query.gender)
const taxFileLocation = ref(route.query.location)
const month = ref(route.query.month)
const config = useRuntimeConfig()
const monthlyGross = ref(route.query.monthly_gross)
const yearlyGross = computed(() => monthlyGross.value * month.value)

const fetchSalaryForm = async () => {
    isLoading.value = true
    const {data} = await axios.get(`${config.apiBase}/calculator/salary-form?monthly_gross=${monthlyGross.value}&month=${month.value}`)
    salaryForm.value = data
    isLoading.value = false
    fetchReturn(data)
}
const fetchReturn = async (salaryForm) => {
    isLoading.value = true
    const {data} = await axios.post(`${config.apiBase}/calculator/calculate`, {
        gender: gender.value,
        tax_file_location:taxFileLocation.value,
        salary_form: JSON.stringify(salaryForm),
        actual_investment: actualInvestment.value
    })
    isLoading.value = false
    if(!data) return
    if(data.return) salaryReturn.value = data.return
    if(data.minimum_tax) minimumTax.value = data.minimum_tax
    if(data.investment) investment.value = data.investment
    if(data.return) salaryReturn.value = data.return
    if(data.salary_income) salaryIncome.value = data.salary_income
}

const debounceUpdate = debounce(() => fetchSalaryForm(), 1000)
const debounceFetchReturn = debounce(() => fetchReturn(salaryForm.value), 1000)

const updateItem = (index, key, value) => salaryForm.value[index][key] = value

function handleCalculateUpdate(index, key, value) {
    updateItem(index, key, value)
    debounceFetchReturn(salaryForm.value)
}

const investmentUpdate = value => {
    actualInvestment.value = value
    debounceFetchReturn(salaryForm.value)
}

const taxLiability = computed(() => {
    const grossTaxPayable = last(salaryReturn.value)
    const creditOnInvestment = last(investment.value)

    if(!grossTaxPayable && !creditOnInvestment) return 0
    if(!creditOnInvestment) return grossTaxPayable.taxable_salary

    return grossTaxPayable.taxable_salary - creditOnInvestment.taxable_salary
})

const handleMonthlyGrossChange = (e) => {
    console.log(e.target.value)
}

onMounted(() => {
    fetchSalaryForm()
})
</script>