<script setup lang="ts"></script>

<template>
	<span class="loading-indicator">
		<div class="spinner"></div>
		<span>Loading</span>
	</span>
</template>

<style scoped>
.loading-indicator {
	font-size: 2rem;
	display: flex;
	gap: 0.25em;
}

.spinner {
	width: 1em;
	height: 1em;
	border-radius: 50%;
	border-width: 0.1em;
	border-style: solid;
	border-color: transparent;
	border-bottom-color: oklch(75% 0.1838 134.39);
	animation-name: loading-spinner-spin;
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

@keyframes loading-spinner-spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
