<template>
    <div>
        <Tab></Tab>
        <client-only>
            <PdfWrapper>
                <div class="flex gap-x-20 mt-10 text-sm">
                    <div>
                        <p>Gender</p>
                        <select name="" id="">
                            <option
                                v-for="gender in genderArr"
                                :key="gender" 
                                value="gender"
                            >{{ gender }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <p>Location</p>
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
                <div class="flex gap-x-10 text-sm mt-5">
                    <div class="w-40">
                        <p class="text-center">Monthly Gross</p>
                        <input 
                            type="number"
                            v-model="monthlyGross"
                            class="font-sm text-center"
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

                <div class="mt-5">
                    <PaymentTable :salaryForm="salaryForm"/>
                </div>

                <TitleComponent class="mt-5" title="Calculation of Income Tax Liability"/>
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