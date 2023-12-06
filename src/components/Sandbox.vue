<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { prettifySandboxName } from "@/lib/prettify";
import MarkdownIt from "markdown-it";
import { useSandboxReset } from "@/lib/useSandboxReset";
import { useTestingContext } from "@/lib/useTestingContext";

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

const hints = import.meta.glob("../templates/*/hint.md", { as: "raw" });
const currentHint = ref("");
const md = new MarkdownIt();
const hintDialog = ref<HTMLDialogElement | null>(null);

watch(
	() => currentSandbox.value,
	async () => {
		const hintUrl = `../templates/${currentSandbox.value}/hint.md`;
		const hintImport = hints[hintUrl];

		if (hintImport) {
			const hintString = await hintImport();
			currentHint.value = md.render(hintString);
		} else {
			currentHint.value = "";
		}
	},
	{ immediate: true },
);

const tests = import.meta.glob("../templates/*/test.ts", {
	import: "default",
});
const testStatus = ref("");

watch(
	() => currentSandbox.value,
	() => {
		testStatus.value = "";
	},
	{ immediate: true },
);

const { currentContext, clearContext } = useTestingContext();

async function runTest() {
	const testUrl = `../templates/${currentSandbox.value}/test.ts`;
	const testImport = tests[testUrl];

	if (testImport) {
		const testFunction = (await testImport()) as Function;

		try {
			await testFunction();
			console.log("Test passed");
			testStatus.value = "test passed";
		} catch (e) {
			const error = e as Error;

			if (currentContext.value === null) {
				console.error("Test failed");
			} else {
				console.error(`Test failed while ${currentContext.value}`);
			}

			testStatus.value = "test failed. see console for details";
			console.log(error.message);
		} finally {
			clearContext();
		}
	} else {
		console.warn("No test defined");
		testStatus.value = "no test defined";
	}
}

const { resetKey } = useSandboxReset();
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

			<span>
				{{ testStatus }}
			</span>

			<button class="sandbox-page__button" @click="hintDialog?.showModal()">
				hint
			</button>

			<button class="sandbox-page__button" @click="runTest">test</button>
		</aside>

		<dialog ref="hintDialog" class="sandbox-page__modal">
			<section class="sandbox-page__modal-content">
				<div class="sandbox-page__modal-title-bar">
					<h2>
						Hint for Sandbox "{{
							prettifySandboxName(currentSandbox ?? "unknown")
						}}"
					</h2>

					<button class="sandbox-page__button red" @click="hintDialog?.close()">
						close
					</button>
				</div>
				<div class="sandbox-page__modal-markdown" v-html="currentHint"></div>
			</section>
		</dialog>

		<div class="main-sandbox-component" :key="resetKey">
			<component
				:is="sandboxes[`../sandboxes/${currentSandbox}/Index.vue`]"
			></component>
		</div>
	</div>
</template>

<style scoped>
/* --- Top Bar --- */
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
	background: var(--ui-sandbox-brand-gradient);
}

.sandbox-page__top-bar > h2 {
	margin: 0;
	flex-grow: 1;
}

/* --- Buttons --- */
.sandbox-page__button {
	--hue: 175;
	--hue-active: 160;

	box-sizing: border-box;
	text-decoration: none;
	font-size: 1rem;
	border: none;
	cursor: pointer;
	background: oklch(92% 0.1 var(--hue));
	display: grid;
	place-items: center;
	padding: 0.125em 0.5em;
	border-radius: 0.25rem;
	color: black;
	box-shadow: 3px 3px 0 oklch(80% 0.15 var(--hue));
	transition:
		background 0.1s,
		box-shadow 0.1s;
}

.sandbox-page__button:hover {
	background: oklch(90% 0.18 var(--hue-active));
	box-shadow: 4px 4px 0 oklch(80% 0.18 var(--hue-active));
}

.sandbox-page__button:active {
	background: oklch(90% 0.18 var(--hue-active));
	box-shadow: 2px 2px 0 oklch(70% 0.18 var(--hue-active));
}

.sandbox-page__button.yellow {
	--hue: 90;
	--hue-active: 115;
}

.sandbox-page__button.red {
	--hue: 15;
	--hue-active: 20;
}

/* --- Modal --- */
.sandbox-page__modal {
	box-sizing: border-box;
	border-radius: 0.5rem;
	background: var(--ui-sandbox-brand-gradient);
	padding: 2px;
	border: none;
}

.sandbox-page__modal-content {
	background: white;
	border-radius: calc(0.5rem - 2px);
	padding: 1rem;
}

.sandbox-page__modal-title-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: -0.25rem;
}

.sandbox-page__modal-title-bar > h2 {
	font-size: 1.5rem;
	margin: 0;
}

.sandbox-page__modal-markdown:global(:last-child) {
	margin-bottom: 0;
}
</style>
