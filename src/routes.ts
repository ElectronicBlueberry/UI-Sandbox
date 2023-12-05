import { createRouter, createWebHistory } from "vue-router";
import Sandbox from "./components/Sandbox.vue";
import Overview from "./components/Overview.vue";

const routes = [
	{
		path: "/",
		component: Overview,
	},
	{
		path: "/sandbox/:sandboxId",
		component: Sandbox,
	},
] as const;

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
