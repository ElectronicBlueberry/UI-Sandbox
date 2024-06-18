<script setup lang="ts">
import { ref, watch } from "vue";
import { useDraggable } from "@vueuse/core";
import { determineWidth } from "@/lib/math";

const props = defineProps<{
	side: "left" | "right";
}>();

const panelWidth = ref(300);
const dragHandle = ref<HTMLButtonElement | null>(null);
const root = ref<HTMLElement | null>(null);

const { position } = useDraggable(dragHandle);

watch(
	() => position.value,
	() => {
		const rectRoot = root.value?.getBoundingClientRect();
		const rectDraggable = dragHandle.value?.getBoundingClientRect();

		if (rectRoot && rectDraggable) {
			panelWidth.value = determineWidth(
				rectRoot,
				rectDraggable,
				250,
				900,
				props.side,
				position.value.x,
			);
		}
	},
);
</script>

<template>
	<section
		ref="root"
		class="galaxy-drag-panel"
		:class="{
			'side-left': props.side === 'left',
			'side-right': props.side === 'right',
		}"
		:style="`--panel-width: ${panelWidth}px;`"
	>
		<button ref="dragHandle" class="drag-handle"></button>
		<div class="flex-panel-content">
			<slot></slot>
		</div>
	</section>
</template>

<style scoped>
.galaxy-drag-panel {
	width: var(--panel-width);
	display: grid;

	--drag-handle-color: color-mix(
		in oklch,
		var(--gx-brand-secondary),
		var(--gx-brand-dark) 20%
	);

	&.side-left {
		grid-template-columns: 1fr auto;
		grid-template-areas: "slot handle";

		.drag-handle {
			border-left: 1px solid var(--drag-handle-color);
		}
	}

	&.side-right {
		grid-template-columns: auto 10fr;
		grid-template-areas: "handle slot";

		.drag-handle {
			border-right: 1px solid var(--drag-handle-color);
		}
	}
}

.drag-handle {
	grid-area: handle;
	border: none;
	border-width: 0;
	background-color: var(--gx-white);
	padding: 0;
	width: 6px;
	cursor: col-resize;

	&:hover,
	&:active {
		background-color: var(--gx-brand-info);
	}
}

.flex-panel-content {
	grid-area: slot;
	pointer-events: none;
	display: flex;
	flex-direction: column;
}
</style>
