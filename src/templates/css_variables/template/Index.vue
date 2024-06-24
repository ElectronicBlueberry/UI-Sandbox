<script setup lang="ts">
import GalaxyPanelLayout from "@/components/galaxy/GalaxyPanelLayout.vue";
</script>

<template>
	<GalaxyPanelLayout class="main">
		<h1>Custom CSS Parameters, or CSS Variables</h1>
		<input class="position-slider" type="range" />
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
	left: calc(100% * 0 - 50px * 0);

	width: 50px;
	height: 50px;

	background-color: color-mix(
		in oklch longer hue,
		var(--box-color-from),
		var(--box-color-to) 0%
	);
}
</style>
