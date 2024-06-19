<script setup lang="ts">
import GalaxyPanelLayout from "@/components/galaxy/GalaxyPanelLayout.vue";
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
	</GalaxyPanelLayout>
</template>

<style scoped>
/* --- Fancy Headings --- */
.heading {
	display: grid;
	grid-template-columns: 50px auto 1fr;
	gap: 10px;
	align-items: center;
}

/* lines to left and right of heading */
pseudo-elements-here {
	content: "";
	display: block;
	height: 3px;
	background-color: var(--gx-brand-secondary);
}

/* remove top margin from first heading */
replace-me {
	margin-top: 0;
}

/* --- Nesting Boxes --- */
section {
	background-color: var(--gx-brand-secondary);
	padding: 0.5rem 1rem;
	border-radius: 4px;
}
</style>
