<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const currentSandbox = computed(() => {
	return route.params["sandboxId"];
});

watch(
	() => currentSandbox.value,
	() => {
		fetch(`http://localhost:3000/sandbox/${currentSandbox.value}`, {
			method: "POST",
		});
	},
	{ immediate: true },
);

const sandboxes = import.meta.glob("../sandboxes/*/Index.vue", {
	import: "default",
	eager: true,
});
</script>

<template>
	<div>
		<component
			:is="sandboxes[`../sandboxes/${currentSandbox}/Index.vue`]"
		></component>
	</div>
</template>

<style scoped></style>
