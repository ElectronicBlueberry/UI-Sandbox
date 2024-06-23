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

			<button class="colorable-button">Color Me!</button>
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

	background-color: rgb(102, 222, 226);
	border-color: rgb(72, 157, 206);
	color: rgb(46, 102, 134);

	&:hover,
	&:focus {
		background-color: rgb(131, 238, 241);
		border-color: rgb(95, 182, 233);
		color: rgb(46, 102, 134);
	}

	&:focus-visible {
		outline: 3px solid rgb(29, 165, 243);
	}

	&:active {
		background-color: rgb(84, 202, 206);
		border-color: rgb(55, 135, 182);
		color: rgb(30, 74, 99);
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
	}
}
</style>
