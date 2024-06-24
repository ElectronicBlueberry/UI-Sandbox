<script setup lang="ts"></script>

<template>
	<section class="container-element">
		<h2>Item</h2>
		<div>Lorem ipsum dolor sit amet consectetur</div>
		<button>Details</button>
	</section>
</template>

<style scoped>
.container-element {
	display: flex;
	gap: 20px;

	padding: 6px;
	background-color: color-mix(
		in oklch,
		var(--gx-brand-info),
		var(--gx-white) 80%
	);
	border-radius: 4px;

	h2 {
		font-size: 1rem;
		margin: 0;
	}
}
</style>
