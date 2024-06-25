<script setup lang="ts">
import GalaxyPanelLayout from "@/components/galaxy/GalaxyPanelLayout.vue";
import { ref } from "vue";

const sliderValue = ref(0);
</script>

<template>
	<GalaxyPanelLayout class="main" :style="`--slider-pos: ${sliderValue};`">
		<h1>Custom CSS Parameters, or CSS Variables</h1>
		<input
			v-model.number="sliderValue"
			class="position-slider"
			type="range"
			min="0"
			max="1"
			step="0.01"
		/>
		<div class="sliding-box-container">
			<div class="sliding-box"></div>
		</div>
	</GalaxyPanelLayout>
</template>

<style scoped>
.main {
	--box-color-from: rgb(111, 201, 111);
	--box-color-to: rgb(255, 121, 121);
}

.sliding-box-container {
	border: 1px solid var(--gx-brand-dark);
	height: 50px;
	position: relative;
	border-radius: 10px;
	overflow: hidden;
}

.sliding-box {
	position: relative;
	left: calc(100% * var(--slider-pos) - 50px * var(--slider-pos));

	width: 50px;
	height: 50px;

	background-color: color-mix(
		in oklch longer hue,
		var(--box-color-from),
		var(--box-color-to) calc(100% * var(--slider-pos))
	);
}
</style>
