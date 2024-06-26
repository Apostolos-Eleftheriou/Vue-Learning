<script setup>
import SearchForm from './SearchForm.vue';
import FilterRadios from './FilterRadios.vue';
import FilterDropdown from './FilterDropdown.vue';
import { computed, ref } from 'vue';

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});

const searchFilter = ref('');
const radioFilter = ref('');
const statusFilter = ref([]);

const filteredItems = computed(() => {
    let items = props.items;
    switch(radioFilter.value) {
        case 'today':
            items = items.filter(item => new Date(item.dueAt).getDate() === new Date().getDate());
            break;
        case 'past':
            items = items.filter(item => new Date(item.dueAt).getDate() < new Date().getDate());
            break;
    }

    if(statusFilter.value.length) {
        items = items.filter(item => statusFilter.value.includes(item.status));
    }

    if(searchFilter.value !== '') {
        items = items.filter(item => item.name.toLowerCase().includes(searchFilter.value.toLowerCase()) || item.email.toLowerCase().includes(searchFilter.value.toLowerCase()) || item.status.toLowerCase().includes(searchFilter.value.toLowerCase()));
    }

    return items
});
const handleSearch = (search) => {
    searchFilter.value = search.trim();
}
const handleRadioFilter = (filter) => {
    radioFilter.value = filter;
}
const handleStatusFilter = (status) => {
    if(statusFilter.value.includes(status)) {
        // statusFilter.value = statusFilter.value.filter(item => item !== status);
        return statusFilter.value.splice(statusFilter.value.indexOf(status), 1)
    } 

    statusFilter.value.push(status);
}
</script>

<template>
    <div class="bg-white relative border rounded-lg">
        <div class="flex items-center justify-between">
            <SearchForm @search="handleSearch"/>
            <div class="flex items-center justify-end text-sm font-semibold">
                <FilterRadios @filter="handleRadioFilter"/>
                <FilterDropdown :items="items" @filterStatus="handleStatusFilter"/>
            </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th class="px-4 py-3">ID</th>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Email</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Due at</th>
                </tr>
            </thead>
            <tr v-if="filteredItems.length" v-for="item in filteredItems" :key="item.id" class="border-b last:border-b-0 even:bg-white odd:bg-slate-50">
                <td class="px-4 py-3 font-medium text-gray-900">{{ item.id }}</td>
                <td class="px-4 py-3 font-medium text-gray-900">{{ item.name }}</td>
                <td class="px-4 py-3">{{ item.email }}</td>
                <td class="px-4 py-3 capitalize">{{ item.status }}</td>
                <td class="px-4 py-3">{{ item.dueAt }}</td>
            </tr>
            <tr v-else class="w-full text-center">
                <td colspan="12" class="px-4 py-3 font-medium text-rose-600 italic">
                    <img src="https://cdn-icons-png.flaticon.com/512/11611/11611088.png" alt="" class="m-auto w-10 h-10 animate-bounce object-contain">
                    <p>No Match...</p>
                </td>
            </tr>
        </table>
    </div>

</template>

<style></style>