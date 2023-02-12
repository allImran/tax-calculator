<template>
    <div class="flex justify-center items-center h-full">
        <div class="space-y-5 -mt-32">
            <p class="text-red-600 text-3xl font-bold text-center">ট্যাক্স ক্যালকুলেটর</p>
            <div class="flex">
                <input 
                    type="text"
                    class="border border-red-600 h-10 w-72 px-3 text-center"
                >
                
                <nuxt-link 
                    to="/tax-card" 
                    class="w-10 text-3lx bg-red-600 text-white"
                >
                    <div class="h-full w-full flex justify-center items-center">Go</div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>"