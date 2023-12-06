<script setup lang="ts"></script>

<template>
	<div class="flex-layout">
		<button>Click Me!</button>
		<span> button was clicked <span id="button-counter">0</span> times </span>

		<input type="text" />
		<span> capitalized: <span id="input-capitalized"></span> </span>
	</div>
</template>

<style scoped>
.flex-layout {
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 1rem;
	padding: 1rem;
}
</style>
