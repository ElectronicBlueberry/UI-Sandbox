<script setup lang="ts">
import GalaxyPanelLayout from "@/components/galaxy/GalaxyPanelLayout.vue";
import GalaxyFlexPanel from "@/components/galaxy/GalaxyFlexPanel.vue";
import ContainerElement from "./ContainerElement.vue";
import { count } from "@/lib/math";
</script>

<template>
	<GalaxyPanelLayout>
		<div class="container-queries-page">
			<GalaxyFlexPanel class="flex-panel" side="left" :max-width="1200">
				<div class="element-gird-left">
					<ContainerElement v-for="i in count(12)" :key="i"></ContainerElement>
				</div>
			</GalaxyFlexPanel>
			<div class="element-grid-right">
				<ContainerElement v-for="i in count(12)" :key="i"></ContainerElement>
			</div>
		</div>
	</GalaxyPanelLayout>
</template>

<style scoped>
.container-queries-page {
	display: flex;
	align-items: flex-start;
}

.flex-panel {
	min-height: 100%;
	background-color: var(--gx-brand-light);
}

.element-gird-left {
	display: grid;
	gap: 8px;
	padding: 12px;
}

.element-grid-right {
	width: 100%;
	display: grid;
	gap: 8px;
	padding: 12px;
	align-items: stretch;
	grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}
</style>
