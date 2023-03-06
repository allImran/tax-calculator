<template>
    <div class="pb-10">
        <div id="html2pdf">
            <slot></slot>
        </div>
        <button 
            class="px-5 py-1 bg-red-600 mt-10 text-white rounded-sm" 
            @click="downloadPDF"
        >Download</button>
    </div>
 </template>

<script setup>
const { $html2pdf } = useNuxtApp()

function downloadPDF() {
  if (document) {
    const element = document.getElementById('html2pdf')
    var opt = {
      margin:       1,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a3', orientation: 'p' }
    };
    
    $html2pdf().set(opt).from(element).save();
  }  
}
</script>