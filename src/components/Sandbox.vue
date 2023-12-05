<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { prettifySandboxName } from "@/lib/prettify";

const route = useRoute();

const currentSandbox = computed<string | undefined>(() => {
	return route.params["sandboxId"] as string;
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
	<div class="sandbox-page">
		<aside class="sandbox-page__top-bar">
			<router-link to="/" class="sandbox-page__button yellow">
				back to overview
			</router-link>

			<h2>
				{{ prettifySandboxName(currentSandbox ?? "unknown") }}
			</h2>

			<button class="sandbox-page__button">hint</button>

			<button class="sandbox-page__button">test</button>
		</aside>

		<component
			:is="sandboxes[`../sandboxes/${currentSandbox}/Index.vue`]"
		></component>
	</div>
</template>

<style scoped>
.sandbox-page__top-bar {
	box-sizing: border-box;
	display: flex;
	padding: 0.5rem;
	padding-top: 0.25rem;
	background-color: rgb(245, 245, 247);
	gap: 1rem;
	align-items: center;
	position: relative;
}

.sandbox-page__top-bar::after {
	position: absolute;
	left: 0;
	bottom: 0;
	display: block;
	content: "";
	width: 100%;
	height: 2px;
	background: linear-gradient(
		130deg,
		oklch(92% 0.15 85),
		oklch(90.58% 0.1838 134.39),
		oklch(92% 0.15 175)
	);
}

.sandbox-page__top-bar > h2 {
	margin: 0;
	flex-grow: 1;
}

.sandbox-page__button {
	box-sizing: border-box;
	text-decoration: none;
	font-size: 1rem;
	border: none;
	cursor: pointer;
	background: oklch(92% 0.1 175);
	display: grid;
	place-items: center;
	padding: 0.125em 0.5em;
	border-radius: 0.25rem;
	color: black;
	box-shadow: 3px 3px 0 oklch(80% 0.15 175);
	transition:
		background 0.2s,
		box-shadow 0.2s;
}

.sandbox-page__button.yellow {
	background: oklch(92% 0.1 90);
	box-shadow: 3px 3px 0 oklch(80% 0.15 90);
}

.sandbox-page__button:hover {
	background: oklch(90% 0.18 160);
	text-decoration: underline;
	box-shadow: 4px 4px 0 oklch(80% 0.18 160);
}

.sandbox-page__button.yellow:hover {
	background: oklch(90% 0.18 115);
	box-shadow: 4px 4px 0 oklch(80% 0.18 115);
}

.sandbox-page__button:active {
	background: oklch(90% 0.18 160);
	box-shadow: 2px 2px 0 oklch(70% 0.18 160);
}

.sandbox-page__button.yellow:active {
	background: oklch(90% 0.18 115);
	box-shadow: 2px 2px 0 oklch(70% 0.18 115);
}
</style>
