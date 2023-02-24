<template>
    <div class="container mx-auto">
       <div class="hidden sm:flex justify-between items-center h-[70px]">
            <nuxt-link to="/">
                <img src="/logo/logo.png" alt="taxhouse-logo" class="h-[58px] p-2.5">
            </nuxt-link>
            <div class="uppercase text-sm font-bold text-black space-x-9">
                <a href="https://app.taxhouse.com.bd/register">Create taxhouse account</a>
                <a href="https://app.taxhouse.com.bd/login">Log in</a>
            </div>
       </div>

       <div class="sm:hidden h-[70px] border-b border-red-600">
            <div class="h-full flex items-center justify-between pl-2 pr-4">
                <nuxt-link to="/">
                    <img src="/logo/logo.png" alt="taxhouse-logo" class="h-[40px] p-2.5">
                </nuxt-link>
                <MenuIcon />
            </div>
       </div>
    </div>
</template>