import { ref, onMounted, onUnmounted, watchEffect } from 'vue';

export const isSidebarVisible = ref(true);

export const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
    if (!isSidebarVisible.value) {
        document.body.classList.add('sidebar-hidden');
    } else {
        document.body.classList.remove('sidebar-hidden');
    }
};

const handleResize = () => {
    isSidebarVisible.value = window.innerWidth > 1024;
};

onMounted(() => {
    handleResize(); // Check screen size on mount
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

// watchEffect(() => {
//     document.body.classList.toggle('sidebar-hidden', !isSidebarVisible.value);
// });