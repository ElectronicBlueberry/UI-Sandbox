<script setup lang="ts">
import { type Theme, loadThemes } from "./themes";
import GalaxyPanelLayout from "@/components/galaxy/GalaxyPanelLayout.vue";
import Masthead from "./Masthead.vue";
import { ref, watch } from "vue";

const themes = loadThemes();
const currentTheme = ref<string>("null");

const themeStyle = ref<Theme | null>(null);

watch(
	() => currentTheme.value,
	() => {
		if (currentTheme.value !== "null") {
			themeStyle.value = themes[currentTheme.value] ?? null;
		} else {
			themeStyle.value = null;
		}
	},
);
</script>

<template>
	<div class="main" :style="themeStyle">
		<Masthead></Masthead>
		<GalaxyPanelLayout>
			<h1>Themes</h1>
			<label>
				Current Theme
				<select class="theme-selector" v-model="currentTheme">
					<option value="null">-- no theme --</option>
					<option v-for="theme in Object.keys(themes)" :value="theme">
						{{ theme }}
					</option>
				</select>
			</label>

			<section class="alert-box">
				<h2>Alert Box</h2>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
					officia odit delectus accusantium accusamus, necessitatibus
					consectetur numquam et optio voluptatem.
				</p>
			</section>
		</GalaxyPanelLayout>
	</div>
</template>

<style scoped>
.main {
	--masthead-color: #2c3143;
	--masthead-text-color: #f8f9fa;
	--masthead-text-hover: gold;
	--masthead-text-active: white;
	--masthead-link-color: transparent;
	--masthead-link-hover: transparent;
	--masthead-link-active: #181a24;
	--masthead-logo-img: "./favicon.svg";

	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.alert-box {
	background-color: var(--alert-color);
}
</style>
