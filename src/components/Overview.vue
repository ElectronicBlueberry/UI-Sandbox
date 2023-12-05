<script setup lang="ts">
import { onMounted, ref } from "vue";
import type SandboxInformation from "../../api_types/sandbox";

const sandboxes = ref<Record<string, SandboxInformation[]>>({});

onMounted(async () => {
	const response = await fetch("http://localhost:3000/sandboxes");
	sandboxes.value = await response.json();
});

function prettifySandboxName(name: string) {
	const words = name.split("_");
	const capitalized = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1),
	);
	return capitalized.join(" ");
}
</script>

<template>
	<h1>Available Sandboxes</h1>

	<template v-for="category in Object.keys(sandboxes)">
		<h2>{{ category }}</h2>

		<ul>
			<li v-for="sandbox in sandboxes[category]">
				<router-link :to="`/sandbox/${sandbox.name}`">
					{{ prettifySandboxName(sandbox.name) }}
				</router-link>
			</li>
		</ul>
	</template>
</template>
