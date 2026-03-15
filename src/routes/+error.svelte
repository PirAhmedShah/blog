<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Header from '$lib/components/shared/Header.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const { data } = $props();
	const categories = $derived(data.categories);

	let canGoBack = $state(false);

	onMount(() => {
		canGoBack = history.length > 2;
	});
</script>

<Header {categories} />

<div class="error-container">
	<h1>{page.status}: {page.error?.message}</h1>
	<div>
		<Button
			onclick={() => {
				if (canGoBack) history.back();
				else goto(resolve('/'));
			}}>Go Back</Button
		>
	</div>
</div>

<style>
	.error-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 60vh;
		text-align: center;
	}
	.error-container div {
		display: flex;
		gap: 1rem;
	}
</style>
