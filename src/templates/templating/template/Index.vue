<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
const names = ref("");
</script>

<template>
	<div class="templating-page">
		<button @click="count += 1">You've clicked me {{ count }} times</button>
		<span>Count is even</span>
		<span>Count is odd</span>

		<label for="names"> Enter a comma separated list of names </label>
		<input id="names" v-model="names" />
		<span>You've entered the following names:</span>
		<ol>
			<li>name</li>
		</ol>
	</div>
</template>

<style scoped>
.templating-page {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.5rem;
	padding: 1rem;
}

label {
	margin-top: 2rem;
}
</style>
