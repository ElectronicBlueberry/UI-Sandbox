<script setup lang="ts">
import { ref, watch } from "vue";
import { useDraggable } from "@vueuse/core";
import { clamp } from "@/lib/math";

const props = defineProps<{
	side: "left" | "right";
}>();

const panelWidth = ref(300);
const dragHandle = ref<HTMLButtonElement | null>(null);

const { position } = useDraggable(dragHandle);

watch(
	() => position.value,
	() => {
		if (props.side === "left") {
			panelWidth.value = clamp(position.value.x + 6, 250, 800);
		} else {
			panelWidth.value = clamp(window.innerWidth - position.value.x, 250, 800);
		}
	},
);
</script>

<template>
	<section
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

	&.side-left {
		grid-template-columns: 1fr auto;
		grid-template-areas: "slot handle";

		.drag-handle {
			border-left: 1px solid var(--gx-brand-secondary-button);
		}
	}

	&.side-right {
		grid-template-columns: auto 10fr;
		grid-template-areas: "handle slot";

		.drag-handle {
			border-right: 1px solid var(--gx-brand-secondary-button);
		}
	}
}

.drag-handle {
	grid-area: handle;
	border: none;
	border-width: 0;
	background-color: white;
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
