<script setup lang="ts">
import GalaxyFlexPanel from "./GalaxyFlexPanel.vue";
import { count } from "@/lib/math";
</script>

<template>
	<div class="galaxy-panel-layout">
		<GalaxyFlexPanel side="left" class="tools panel">
			<div class="side-panel-content">
				<h2>Tools</h2>
				<input type="text" placeholder="search tools" />
				<div class="placeholder-list">
					<div
						v-for="i in count(10)"
						:key="i"
						class="tool placeholder"
						:style="`--fade: ${i}0%;`"
					></div>
				</div>
			</div>
		</GalaxyFlexPanel>
		<div class="scroll-wrapper">
			<section class="panel-content main">
				<slot></slot>
			</section>
		</div>

		<GalaxyFlexPanel side="right" class="history panel">
			<div class="side-panel-content">
				<h2>History</h2>
				<input type="text" placeholder="search datasets" />
				<div class="placeholder-list">
					<div
						v-for="i in count(6)"
						:key="i"
						class="dataset placeholder"
						:style="`--fade: ${Math.floor(i + 4)}0%;`"
					></div>
				</div>
			</div>
		</GalaxyFlexPanel>
	</div>
</template>

<style scoped>
.galaxy-panel-layout {
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

.tools {
	background-color: var(--gx-brand-light);
}

.panel {
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

.side-panel-content {
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

.scroll-wrapper {
	position: relative;
	flex: 1;
}

.main {
	padding: 1rem;
	overflow-y: auto;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.placeholder-list {
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	gap: 10px;
	overflow: hidden;
}

.placeholder {
	border-radius: 4px;

	&.tool {
		height: 60px;
		background-color: color-mix(
			in oklch,
			var(--gx-brand-secondary),
			var(--gx-brand-light) var(--fade)
		);
	}

	&.dataset {
		height: 110px;
		background-color: color-mix(
			in oklch,
			var(--gx-brand-success),
			var(--gx-white) var(--fade)
		);
	}
}
</style>
