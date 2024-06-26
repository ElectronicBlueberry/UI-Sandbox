<script setup lang="ts">
import { onMounted, ref } from "vue";
import { prettifySandboxName } from "@/lib/prettify";
import LoadingIndicator from "./LoadingIndicator.vue";
import type SandboxInformation from "../../api_types/sandbox";
import { useRouter } from "vue-router";

const sandboxes = ref<Record<string, SandboxInformation[]>>({});
const loading = ref(true);
const showLoading = ref(false);

setTimeout(() => (showLoading.value = true), 100);

onMounted(tryToLoad);

const loadingTryPause = 1000;

async function tryToLoad() {
	try {
		const response = await fetch("http://localhost:3000/sandboxes");
		sandboxes.value = await response.json();
		loading.value = false;
	} catch (_e) {
		setTimeout(tryToLoad, loadingTryPause);
	}
}

const templateMode = (import.meta.env.VITE_TEMPLATE_MODE ?? false) as boolean;
const router = useRouter();

async function onLinkClick(e: MouseEvent, sandbox: string) {
	if (e.ctrlKey || e.shiftKey || e.metaKey || e.button !== 1) {
		return;
	}

	e.preventDefault();

	if (!templateMode) {
		await fetch(`http://localhost:3000/sandbox/${sandbox}`, {
			method: "POST",
		});
	}

	router.push((e.target as HTMLAnchorElement).href);
}
</script>

<template>
	<div class="overview">
		<div class="hero">
			<h1>Available Sandboxes</h1>
		</div>

		<div v-if="loading" class="loading">
			<LoadingIndicator v-if="showLoading" />
		</div>
		<div v-else class="categories-container">
			<section v-for="category in Object.keys(sandboxes)" class="category">
				<h2>{{ category }}</h2>

				<ul>
					<li v-for="sandbox in sandboxes[category]">
						<a
							@click="(e) => onLinkClick(e, sandbox.name)"
							:href="`/sandbox/${sandbox.name}`"
						>
							{{ prettifySandboxName(sandbox.name) }}
						</a>
					</li>
				</ul>
			</section>
		</div>
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

.loading {
	display: grid;
	place-items: center;
	height: 200px;
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
