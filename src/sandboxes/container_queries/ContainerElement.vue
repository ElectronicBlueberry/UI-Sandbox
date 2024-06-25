<script setup lang="ts"></script>

<template>
	<section class="container-element grid">
		<h2>Item</h2>
		<div>Lorem ipsum dolor sit amet consectetur</div>
		<button>Details</button>
	</section>
</template>

<style scoped>
.container-element {
	container-type: inline-size;
	padding: 6px;
	background-color: color-mix(
		in oklch,
		var(--gx-brand-info),
		var(--gx-white) 80%
	);
	border-radius: 4px;

	h2 {
		grid-area: h;
		font-size: 1rem;
		margin: 0;
	}

	div {
		grid-area: d;
	}

	button {
		grid-area: b;
	}

	&.grid {
		display: grid;

		grid-template-columns: auto 1fr auto;
		grid-template-areas:
			"h . b"
			"d d d";

		@container (min-width: 400px) {
			gap: 10px;
			grid-template-areas: "h d b";
		}
	}
}
</style>
