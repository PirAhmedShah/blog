<script lang="ts">
	import { base, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { type Category } from '$lib/types/category.type.js';
	import ThemeToggle from '../ui/ThemeToggle.svelte';

	interface Props {
		categories: Category[];
	}
	const { categories }: Props = $props();
	const activeSlug = $derived(page.params.category);
</script>

<header>
	<a href={resolve('/')}> <img src="{base}/logo.svg" alt="Brand" height={32} /> </a>

	<nav aria-label="Category navigation">
		<ul>
			{#each categories as category (category.slug)}
				{@const isActive = category.slug === activeSlug}
				<li class:active={isActive}>
					<a href={resolve(`/${category.slug}`)} aria-current={isActive ? 'page' : undefined}>
						{category.metadata.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="actions">
		<ThemeToggle size={16} />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem; /* Added vertical padding for better breathing room */
		border-bottom: 1px solid var(--border); /* Optional: Adds a subtle separator */
	}

	header ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 1.5rem;
	}

	/* Links styling */
	ul li a {
		color: var(--muted-foreground); /* Slightly muted for better contrast with brand */
		text-decoration: none;
		transition: color 0.3s ease;
	}

	ul li a:hover,
	.active a {
		color: var(--primary);
	}

	.active a {
		font-weight: 600;
	}
</style>
