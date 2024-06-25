<script setup lang="ts"></script>

<template>
	<nav ref="masthead" class="masthead">
		<img src="./favicon.svg" />
		<ul>
			<li class="active">Home</li>
			<li>Workflow</li>
			<li>Visualize</li>
			<li>Data</li>
			<li>Help</li>
			<li>Log in or Register</li>
		</ul>
		<div class="storage-display">Using 0%</div>
	</nav>
</template>

<style scoped>
.masthead {
	height: 48px;
	background: var(--masthead-color);
	display: flex;
	justify-content: space-between;
	align-items: stretch;
}

img {
	height: 100%;
}

ul {
	display: flex;
	list-style: none;
	align-items: stretch;
	margin: 0;
	font-size: 0.9rem;
}

li {
	cursor: pointer;
	padding: 8px;
	display: grid;
	place-items: center;

	color: var(--masthead-text-color);
	background: var(--masthead-link-color);

	&.active {
		color: var(--masthead-text-active);
		background: var(--masthead-link-active);
	}

	&:hover {
		color: var(--masthead-text-hover);
		background: var(--masthead-link-hover);
	}
}

.storage-display {
	font-size: 0.9rem;
	border-radius: 4px;
	margin: 6px;
	width: 100px;
	text-align: center;
	align-self: center;
	background-color: #e9ecef;
	color: #132b40;
}
</style>
