<template>
<div
    v-if="show"
      style="height: calc(100% - 70px)" 
      class="sm:hidden absolute top-[70px] left-0 w-70 bg-red-700 opacity-90 px-3 py-4"
    >
    <div @click="toggleSidebar">
        <CloseIcon class="cursor-pointer text-white mb-2"/>
    </div>
    <div class="uppercase text-sm font-bold text-white flex flex-col space-y-2">
      <a href="https://app.taxhouse.com.bd/register">Create taxhouse account</a>
      <a href="https://app.taxhouse.com.bd/login">Log in</a>
    </div>
    </div>
</template>

<script setup>
defineProps({
    toggleSidebar: Function,
    show: Boolean
})
</script>