<template>
  <div class="relative h-screen">
    <Navbar :toggleSidebar="toggleSidebar"/>
    <div style="height: calc(100% - 140px);" class="container mx-auto overflow-y-auto">
      <NuxtPage />
    </div>
    <Footer />

    <NavDrawer :show="show" :toggleSidebar="toggleSidebar"/>
  </div>
</template>

<script setup>
import useSidebar from '~/composables/useSidebar.js'

const {show, toggleSidebar} = useSidebar()
</script>
