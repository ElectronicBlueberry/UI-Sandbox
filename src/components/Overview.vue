<script setup lang="ts">
import { onMounted, ref } from "vue";
import { prettifySandboxName } from "@/lib/prettify";
import type SandboxInformation from "../../api_types/sandbox";

const sandboxes = ref<Record<string, SandboxInformation[]>>({});

onMounted(async () => {
	const response = await fetch("http://localhost:3000/sandboxes");
	sandboxes.value = await response.json();
});
</script>

<template>
	<div class="hero">
		<h1>Available Sandboxes</h1>
	</div>

	<div class="categories-container">
		<section v-for="category in Object.keys(sandboxes)" class="category">
			<h2>{{ category }}</h2>

			<ul>
				<li v-for="sandbox in sandboxes[category]">
					<router-link :to="`/sandbox/${sandbox.name}`">
						{{ prettifySandboxName(sandbox.name) }}
					</router-link>
				</li>
			</ul>
		</section>
	</div>
</template>

<style scoped>
* {
	box-sizing: border-box;
}

.hero {
	display: grid;
	place-items: center;
	width: 100%;
	height: 240px;
}

h1 {
	margin: 0;
	font-size: 3rem;
	padding: 0.1em 0.4em;
	border-radius: 0.5rem;
	background: var(--ui-sandbox-brand-gradient);
}

.categories-container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-flow: column;
	gap: 1rem;
	padding: 1rem;
}

.category {
	background-color: rgb(239, 240, 241);
	padding: 0.75rem;
	border-radius: 0.25rem;
}

.category h2 {
	margin: 0;
	font-weight: 400;
}

.category ul {
	margin: 0;
	padding-top: 0.25rem;
	padding-bottom: 0.25rem;
	padding-left: 1rem;
}

.category ul a {
	color: oklch(40% 0.75 200);
}

.category ul a:visited {
	color: oklch(30% 0.8 190);
}
</style>
