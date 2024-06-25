<script setup lang="ts">
import GalaxyPanelLayout from "@/components/galaxy/GalaxyPanelLayout.vue";
import { generateBooleanFields } from "@/lib/randomData";

const randomData = generateBooleanFields(
	["hasImage", "hasHeading"] as const,
	12,
);
</script>

<template>
	<GalaxyPanelLayout>
		<h1>Advanced CSS Selectors</h1>

		<p>
			CSS pseudo elements can add visual decoration without altering the
			document.
		</p>

		<h2>Sub-Heading</h2>

		<section>
			<h3>Stuff in Boxes</h3>

			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas qui velit
				rerum odit, alias nihil sapiente beatae ad harum doloribus numquam
				aliquid maxime ipsam voluptates saepe deserunt blanditiis, optio at.
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
				aperiam aliquid perspiciatis?
			</p>

			<section>
				<h4>Smaller Boxes</h4>

				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
					reiciendis, sint commodi quaerat voluptatibus nemo quis ab quos saepe
					facilis at asperiores doloremque assumenda quod harum placeat
					perferendis id consequatur.
				</p>
			</section>

			<section>
				<h4>Another Small Box</h4>

				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
					consequuntur aliquid consectetur laudantium quaerat deserunt ut!
				</p>
			</section>
		</section>

		<h2>Sub-Heading 2</h2>

		<p>
			The content of the following boxes is dynamic. We want to style them
			depending on their content, without adding classes.
		</p>

		<div class="news-item-box">
			<div v-for="(data, i) in randomData" :key="i" class="news-item">
				<h3 v-if="data.hasHeading">News Item</h3>

				<img
					v-if="data.hasImage"
					src="https://placehold.co/300x200/white/gray"
				/>
				<p v-else>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et ratione
					veritatis voluptas? Dolorem sed tempora voluptatibus ab quae!
				</p>
			</div>
		</div>
	</GalaxyPanelLayout>
</template>

<style scoped>
/* --- Fancy Headings --- */
h1,
h2 {
	display: grid;
	grid-template-columns: 50px auto 1fr;
	gap: 10px;
	align-items: center;

	/* lines to left and right of heading */
	&::before,
	&::after {
		content: "";
		display: block;
		height: 3px;
		background-color: var(--gx-brand-secondary);
	}

	/* remove top margin from first heading */
	&:first-of-type {
		margin-top: 0;
	}
}

/* --- Nesting Boxes --- */
section {
	background-color: var(--gx-brand-secondary);
	padding: 0.5rem 1rem;
	border-radius: 4px;

	section {
		background-color: white;
	}
}

/* --- Functional Selectors --- */
.news-item-box {
	--news-item-with-img-color: rgb(109, 147, 252);

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	gap: 20px;
}

.news-item {
	background-color: var(--gx-brand-secondary);
	padding: 8px;
	border-radius: 4px;

	&:has(img) {
		background-color: var(--news-item-with-img-color);
	}

	&:not(:has(h3)) {
		border: 2px solid black;
	}
}
</style>
