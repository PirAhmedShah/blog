<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let { height, width } = $props();

	// Initialize with current theme, fallback to 'light'
	let theme = $state(
		browser ? document.documentElement.getAttribute('data-theme') || 'light' : 'light'
	);

	onMount(() => {
		// Reactively update when the ThemeToggle changes the data-theme attribute
		const observer = new MutationObserver(() => {
			theme = document.documentElement.getAttribute('data-theme') || 'light';
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		return () => observer.disconnect();
	});
</script>

<img
	src="{base}/images/avatars/me.webp"
	{height}
	{width}
	alt="Pir Ahmed Shah"
	class="avatar"
	class:dark={theme === 'dark'}
	loading="lazy"
/>

<style>
	.avatar {
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--border);
		transition:
			border-color 0.3s ease,
			filter 0.3s ease;
	}

	.avatar:hover {
		outline: 1px solid var(--border);
	}

	.avatar.dark {
		filter: invert(1);
	}
</style>
