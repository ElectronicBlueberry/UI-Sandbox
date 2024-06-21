<script setup lang="ts">
import GalaxyFlexPanel from "./GalaxyFlexPanel.vue";
import { count } from "@/lib/math";
</script>

<template>
	<div class="gx__galaxy-panel-layout">
		<GalaxyFlexPanel side="left" class="gx__tools gx__panel">
			<div class="gx__side-panel-content">
				<h2>Tools</h2>
				<input type="text" placeholder="search tools" />
				<div class="gx__placeholder-list">
					<div
						v-for="i in count(10)"
						:key="i"
						class="gx__tool gx__placeholder"
						:style="`--fade: ${i}0%;`"
					></div>
				</div>
			</div>
		</GalaxyFlexPanel>
		<div class="gx__scroll-wrapper">
			<section class="gx__panel-content gx__main">
				<slot></slot>
			</section>
		</div>

		<GalaxyFlexPanel side="right" class="gx__history gx__panel">
			<div class="gx__side-panel-content">
				<h2>History</h2>
				<input type="text" placeholder="search datasets" />
				<div class="gx__placeholder-list">
					<div
						v-for="i in count(6)"
						:key="i"
						class="gx__dataset gx__placeholder"
						:style="`--fade: ${Math.floor(i + 4)}0%;`"
					></div>
				</div>
			</div>
		</GalaxyFlexPanel>
	</div>
</template>

<style scoped>
.gx__galaxy-panel-layout {
	--gx-white: white;
	--gx-brand-light: #f8f9fa;
	--gx-brand-dark: #2c3143;
	--gx-brand-secondary: #dee2e6;
	--gx-brand-primary: #25537b;
	--gx-brand-info: #2077b3;
	--gx-brand-success: #66cc66;

	display: flex;
	height: 100%;
}

.gx__tools {
	background-color: var(--gx-brand-light);
}

.gx__panel {
	overflow: hidden;

	& h2 {
		font-weight: normal;
		font-size: 1.1rem;
		margin: 0;
	}

	& input {
		padding: 4px 8px;
		height: 20px;
		flex-shrink: 0;
		outline: none;
		border-radius: 4px;
		border-color: color-mix(
			in oklch,
			var(--gx-brand-secondary),
			var(--gx-brand-dark) 20%
		);
		border-style: solid;
		border-width: 1px;
	}
}

.gx__side-panel-content {
	pointer-events: none;
	display: flex;
	flex-direction: column;
	padding: 0.5rem 1rem;
	gap: 1rem;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.gx__scroll-wrapper {
	position: relative;
	flex: 1;
}

.gx__main {
	padding: 1rem;
	overflow-y: auto;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.gx__placeholder-list {
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	gap: 10px;
	overflow: hidden;
}

.gx__placeholder {
	border-radius: 4px;

	&.gx__tool {
		height: 60px;
		background-color: color-mix(
			in oklch,
			var(--gx-brand-secondary),
			var(--gx-brand-light) var(--fade)
		);
	}

	&.gx__dataset {
		height: 110px;
		background-color: color-mix(
			in oklch,
			var(--gx-brand-success),
			var(--gx-white) var(--fade)
		);
	}
}
</style>
