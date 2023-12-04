<script setup lang="ts">
import { onMounted, ref } from "vue";

const serverResponse = ref("");

onMounted(async () => {
	const res = await fetch("http://localhost:3000");
	serverResponse.value = await res.json();
});
</script>

<template>
	<div>Response from server: {{ serverResponse }}</div>
</template>

<style scoped></style>
