<script setup lang="ts">
import { onMounted, ref } from "vue";
import type TutorialWithMeta from "../../api_types/tutorialsWithMeta";

const tutorials = ref<Record<string, TutorialWithMeta[]>>({});

onMounted(async () => {
	const response = await fetch("http://localhost:3000/tutorials");
	tutorials.value = await response.json();
});

function prettifyTutorialName(name: string) {
	const words = name.split("_");
	const capitalized = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1),
	);
	return capitalized.join(" ");
}
</script>

<template>
	<h1>Available Tutorials</h1>

	<template v-for="category in Object.keys(tutorials)">
		<h2>{{ category }}</h2>

		<ul>
			<li v-for="tutorial in tutorials[category]">
				<router-link :to="`/tutorial/${tutorial.name}`">
					{{ prettifyTutorialName(tutorial.name) }}
				</router-link>
			</li>
		</ul>
	</template>
</template>
