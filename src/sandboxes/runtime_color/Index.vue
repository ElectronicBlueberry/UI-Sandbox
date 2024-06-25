<script setup lang="ts">
import GalaxyPanelLayout from "@/components/galaxy/GalaxyPanelLayout.vue";
import { count } from "@/lib/math";
import { computed, ref } from "vue";

const buttonColor = ref("#f0f00f");

const color1 = ref("#ff0000");
const color2 = ref("#00ff00");
const color3 = ref("#0000ff");
const color4 = ref("#ff00ff");

const colorVars = computed(() => ({
	"--color-1": color1.value,
	"--color-2": color2.value,
	"--color-3": color3.value,
	"--color-4": color4.value,
}));
</script>

<template>
	<GalaxyPanelLayout>
		<h1>Runtime CSS color calculations</h1>

		<div class="button-exercise">
			<label>
				Button Color
				<input v-model="buttonColor" class="button-color-input" type="color" />
			</label>

			<button
				class="colorable-button"
				:style="`--button-color: ${buttonColor};`"
			>
				Color Me!
			</button>
		</div>

		<form>
			<label>
				color 1
				<input v-model="color1" type="color" />
			</label>

			<label>
				color 2
				<input v-model="color2" type="color" />
			</label>

			<label>
				color 3
				<input v-model="color3" type="color" />
			</label>

			<label>
				color 4
				<input v-model="color4" type="color" />
			</label>
		</form>

		<div class="button-grid" :style="colorVars">
			<button
				v-for="i in count(100)"
				class="color-button"
				:key="i"
				:style="`--x-pos: ${(i % 10) / 9}; --y-pos: ${Math.floor(i / 10) / 9}`"
			></button>
		</div>
	</GalaxyPanelLayout>
</template>

<style scoped>
.button-exercise {
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin-bottom: 40px;
}

.colorable-button {
	width: 200px;
	height: 32px;
	border-style: solid;
	border-radius: 4px;

	--light: oklch(100% 0.3 none);
	--dark: oklch(0% 0.7 none);
	--neutral: oklch(60% none none);

	background-color: color-mix(in oklch, var(--button-color), var(--light) 30%);
	border-color: color-mix(in oklch, var(--button-color), var(--neutral) 50%);
	color: color-mix(in oklch, var(--button-color), var(--dark) 40%);

	&:hover,
	&:focus-visible {
		background-color: color-mix(
			in oklch,
			var(--button-color),
			var(--light) 40%
		);
		border-color: color-mix(in oklch, var(--button-color), var(--light) 10%);
		color: color-mix(in oklch, var(--button-color), var(--dark) 40%);
	}

	&:focus-visible {
		outline: 3px solid rgb(29, 165, 243);
	}

	&:active {
		background-color: color-mix(
			in oklch,
			var(--button-color),
			var(--light) 20%
		);
		border-color: color-mix(in oklch, var(--button-color), var(--dark) 10%);
		color: color-mix(in oklch, var(--button-color), var(--dark) 50%);
	}
}

form {
	display: flex;
	gap: 25px;

	label {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}

.button-grid {
	margin-top: 20px;

	display: grid;
	gap: 10px;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(10, 1fr);

	button {
		aspect-ratio: 1;
		border-style: solid;
		border-radius: 8px;

		--color-x-a: color-mix(
			in oklch,
			var(--color-1),
			var(--color-2) calc(100% * var(--x-pos))
		);

		--color-x-b: color-mix(
			in oklch,
			var(--color-3),
			var(--color-4) calc(100% * var(--x-pos))
		);

		background-color: color-mix(
			in oklch,
			var(--color-x-a),
			var(--color-x-b) calc(100% * var(--y-pos))
		);
	}
}
</style>
