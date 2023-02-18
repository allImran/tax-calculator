<template>
    <div>
        <Tab></Tab>
        <client-only>
            <PdfWrapper>
                <div class="flex gap-x-20 mt-10 text-sm">
                    <div class="flex items-center">
                        <p class="font-semibold">Gender:</p>
                        <select>
                            <option
                                v-for="{title, value} in gender"
                                :key="value" 
                                :value="value"
                            >{{ title }}
                            </option>
                        </select>
                    </div>
                    <div class="flex items-center">
                        <p class="font-semibold">Location:</p>
                        <select>
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
                <TitleComponent class="mt-5" title="Income Details"/>
                <div class="px-5 py-2 bg-gray-100 rounded-br rounded-bl">
                    <div class="flex gap-x-10 text-sm px-5 bg-gray-100">
                        <div class="w-40">
                            <p class="text-center">Monthly Gross</p>
                            <input 
                                type="number"
                                v-model="monthlyGross"
                                class="font-sm text-center bg-transparent"
                                @input="debounceUpdate"
                            >
                        </div>
                        <div class="w-40">
                            <p class="text-center">No of months</p>
                            <p class="text-center">12</p>
                        </div>
                        <div class="w-40">
                            <p class="text-center">Yearly Gross Salary</p>
                            <p class="text-center font-semibold">{{ yearlyGross }}</p>
                        </div>
                    </div>
                    <PaymentTable :salaryForm="salaryIncome"/>
                </div>

                <TitleComponent class="mt-5" title="Calculation of Income Tax Liability"/>
                <div  class="bg-gray-100 px-5 py-2 rounded-br rounded-bl">
                    <ReturnTable :salaryReturn="salaryReturn"/>
                </div>

                <TitleComponent class="mt-5" title="Calculation of Tax Credit on Investment"/>
                <TitleComponent class="mt-5" title="Income Tax Payable"/>
            </PdfWrapper>
        </client-only>
    </div>
</template>

<script setup>
import axios from 'axios'
import { debounce } from 'lodash'
import { onMounted } from 'vue'
import gender from '@/data/gender.js'
const genderArr = ['male', 'female', 'other'];
const locationArr = [{
    value: 'dhaka_city_corporation',
    title: 'Dhaka'
}];
const salaryForm = ref([])
const salaryReturn = ref([])
const salaryIncome = ref([])
const route = useRoute()
const config = useRuntimeConfig()
const monthlyGross = ref(route.query.monthly_gross)
const yearlyGross = computed(() => monthlyGross.value * 12)

const fetchSalaryForm = async () => {
    const {data} = await axios.get(`${config.apiBase}/calculator/salary-form?monthly_gross=${monthlyGross.value}`)
    salaryForm.value = data
    fetchReturn(data)
}
const fetchReturn = async (salaryForm) => {
    const {data} = await axios.post(`${config.apiBase}/calculator/calculate`, {
        gender: 'male',
        tax_file_location:'dhaka_city_corporation',
        salary_form: JSON.stringify(salaryForm),
    })
    if(!data) return
    if(data.return) salaryReturn.value = data.return
    if(data.salary_income) salaryIncome.value = data.salary_income
}

const debounceUpdate = debounce(() => fetchSalaryForm(), 1000)
onMounted(() => {
    fetchSalaryForm()
})
</script>