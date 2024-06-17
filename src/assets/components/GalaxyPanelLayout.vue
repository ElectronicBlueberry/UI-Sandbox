<script setup lang="ts">
import GalaxyFlexPanel from "./GalaxyFlexPanel.vue";
</script>

<template>
	<div class="galaxy-panel-layout">
		<GalaxyFlexPanel side="left" class="tools panel">
			<h2>Tools</h2>
			<input type="text" placeholder="search tools" />
		</GalaxyFlexPanel>
		<section class="main"></section>
		<GalaxyFlexPanel side="right" class="history panel">
			<h2>History</h2>
			<input type="text" placeholder="search datasets" />
		</GalaxyFlexPanel>
	</div>
</template>

<style scoped>
.galaxy-panel-layout {
	--gx-brand-light: #f8f9fa;
	--gx-brand-secondary-button: #bdc6d0;
	--gx-brand-secondary-background: #dee2e6;
	--gx-brand-primary: #25537b;
	--gx-brand-info: #2077b3;

	display: flex;
	height: 100%;
}

.tools {
	background-color: var(--gx-brand-light);
}

.panel {
	h2 {
		margin: 0.5rem 1rem;
		font-weight: normal;
		font-size: 1.1rem;
	}

	input {
		margin: 0.5rem 1rem;
		padding: 4px 8px;
		height: 20px;
		outline: none;
		border-radius: 4px;
		border-color: var(--gx-brand-secondary-button);
		border-style: solid;
		border-width: 1px;
	}
}

.main {
	flex: 1;
	padding: 1rem;
}
</style>
