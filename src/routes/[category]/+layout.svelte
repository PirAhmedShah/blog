<script lang="ts">
	import Header from '$lib/components/shared/Header.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	import Sidebar from '$lib/components/shared/Sidebar.svelte';

	let { data, children } = $props();
</script>

<Header categories={data.categories} />

<div class="page-wrapper">
	<main class="content">
		{@render children?.()}
	</main>
	<Sidebar />
</div>

<Footer />

<style>
	.page-wrapper {
		display: grid;
		grid-template-columns: 0.75fr 0.25fr;
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		.page-wrapper {
			grid-template-columns: 1fr;
		}
	}
</style>
