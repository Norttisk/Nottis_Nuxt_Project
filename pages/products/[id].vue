<template>
    <div>
        <p>this is a {{ id }} page</p>
    </div>
</template>

<script setup>
const { id } = useRoute().params;
</script>

<style scoped></style>
