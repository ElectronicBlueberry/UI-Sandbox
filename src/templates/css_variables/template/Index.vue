<script setup lang="ts">
import GalaxyPanelLayout from "@/components/galaxy/GalaxyPanelLayout.vue";
</script>

<template>
	<GalaxyPanelLayout class="main">
		<h1>Custom CSS Parameters, or CSS Variables</h1>
	</GalaxyPanelLayout>
</template>

<style scoped>
.main {
	--box-color: rgb(111, 201, 111);
}
</style>
