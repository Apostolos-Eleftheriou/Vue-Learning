<script setup>

const emit = defineEmits(['filter']);

const handleChange = (e) => {
    emit('filter', e.target.value);
}
</script>
<template>
    <label class="flex mr-4 items-center flex-nowrap">
        <input type="radio" name="show" value="all" checked @change="handleChange">
        <span class="whitespace-nowrap ml-1">Show All</span>
    </label>
    <label class="flex mr-4 items-center flex-nowrap">
        <input type="radio" name="show" value="today" @change="handleChange">
        <span class="whitespace-nowrap ml-1">Due Today</span>
    </label>
    <label class="flex mr-4 items-center flex-nowrap">
        <input type="radio" name="show" value="past" @change="handleChange">
        <span class="whitespace-nowrap ml-1">Past Due</span>
    </label>
</template>