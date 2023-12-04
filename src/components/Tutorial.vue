<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const currentTutorial = computed(() => {
	return route.params["tutorialId"];
});

watch(
	() => currentTutorial.value,
	() => {
		fetch(`http://localhost:3000/tutorial/${currentTutorial.value}`, {
			method: "POST",
		});
	},
	{ immediate: true },
);

const tutorials = import.meta.glob("../tutorials/*/Index.vue", {
	import: "default",
	eager: true,
});
</script>

<template>
	<div>
		<component
			:is="tutorials[`../tutorials/${currentTutorial}/Index.vue`]"
		></component>
	</div>
</template>

<style scoped></style>
