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

    const clonedElement = element.cloneNode(true)
    clonedElement.classList.remove('hidden');
    clonedElement.classList.add('block');
    // need to append to the document, otherwise the downloading doesn't start
    document.body.appendChild(clonedElement);

    // https://www.npmjs.com/package/html2pdf.js/v/0.9.0#options
    $html2pdf(clonedElement, {
      filename: 'filename.pdf',
      image: { type: 'png' },
      enableLinks: true
    })
    clonedElement.remove()
  }  
}
</script>