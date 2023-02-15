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
                        <select name="" id="">
                            <option
                                class="capitalize"
                                v-for="gender in genderArr"
                                :key="gender" 
                                value="gender"
                            >
                                {{ gender }}
                            </option>
                        </select>
                    </div>
                </div>
                <p class="py-1 text-center bg-gray-200 mt-5">Income details</p>

                <div class="flex gap-x-10 text-sm mt-5">
                    <div class="w-40">
                        <p class="text-center">Monthly Gross</p>
                        <input 
                            type="text"
                            v-model="monthlyGross"
                            class="font-sm text-center"
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
                
            </PdfWrapper>
        </client-only>
    </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
const genderArr = ['male', 'female', 'other'];
const locationArr = ['dhaka'];
const salaryForm = ref([])
const route = useRoute()
const config = useRuntimeConfig()
const monthlyGross = ref(route.query.monthly_gross)
const yearlyGross = computed(() => monthlyGross.value * 12)

const fetchSalaryForm = async () => {
    const {data} = await axios.get(`${config.apiBase}/calculator/salary-form?monthly_gross=${monthlyGross.value}`)
    salaryForm.value = data
}
onMounted(() => {
    fetchSalaryForm()
})
</script>