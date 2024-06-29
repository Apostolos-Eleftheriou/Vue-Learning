<script setup>
import { ref, computed } from 'vue';
import { useClickOutside } from './useClickOutside.vue';
const emit = defineEmits(['filterStatus']);
const show = ref(false);
const menuRef = ref(null);
useClickOutside(menuRef, () => {
  show.value = false;
});
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});
const statuses = computed(() => {
    if (!props.items || props.items.length === 0) {
        return [];
    }
    return [...new Set(props.items.map(item => item.status))];
})
const checkedStatus = ref({});
const handleChange = (e) => {
    emit('filterStatus', e.target.value);
}
statuses.value.forEach(status => {
    if (!(status in checkedStatus.value)) {
        checkedStatus.value[status] = false;
    }
});
</script>

<template>
<div class="relative flex items-center w-full px-4" ref="menuRef">
    <button @click="show = !show" type="button" class="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 rounded-lg border hover:bg-gray-100">Filter</button>
    <transition name="mini-menu">
    <div v-if="show" class="absolute top-12 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow">
        <h6 class="mb-3 text-sm font-medium text-gray-900">Status</h6>
            <ul class="space-y-2 text-sm">
                <li v-for="(status, index) in statuses" class="flex items-center" :key="index">
                    <input type="checkbox" :id="`filter_option_${index}`" :value="status" v-model="checkedStatus[status]" @change="handleChange" class="w-4 h-4 bg-gray-100 border-gray-300 rounded-lg">
                    <label :for="`filter_option_${index}`" class="ml-2 text-sm font-medium text-gray-900 text-center capitalize">{{ status }}</label>
                </li>
            </ul>
    </div>
    </transition>
</div>

</template>