import { ref } from 'vue'

export default function useSidebar() {
    const show = ref(false)

    const toggleSidebar = () => show.value =!show.value

    return { show, toggleSidebar }
}