
<script>
import { onMounted, onUnmounted } from 'vue';
export const useClickOutside = (elementRef, callback) => {
    const handleClick = (e) => {
        if (elementRef.value && !elementRef.value.contains(e.target)) {
            callback();
        }
    };

    onMounted(() => document.addEventListener('click', handleClick));
    onUnmounted(() => document.removeEventListener('click', handleClick));
};
</script>