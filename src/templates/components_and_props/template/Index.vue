<script setup lang="ts">
// @ts-ignore unused variable
const peopleInfo = [
	{
		name: "Karla",
		favoriteAnimal: "Armadillo",
	},
	{
		name: "Alex",
		favoriteAnimal: "Bat",
	},
	{
		name: "Julia",
		favoriteAnimal: "Capybara",
	},
];
</script>

<template>
	<section class="people-page">
		<h1>People</h1>
		<div class="people-list"></div>
	</section>
</template>

<style scoped>
.people-page {
	padding: 0.5rem;
}

h1 {
	margin-top: 0;
}

.people-list {
	display: flex;
	gap: 1rem;
}
</style>
