import { createRouter, createWebHistory } from "vue-router";
import Tutorial from "./components/Tutorial.vue";
import Overview from "./components/Overview.vue";

const routes = [
	{
		path: "/",
		component: Overview,
	},
	{
		path: "/tutorial/:tutorialId",
		component: Tutorial,
	},
] as const;

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
