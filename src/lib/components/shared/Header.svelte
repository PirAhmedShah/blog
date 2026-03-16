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
	<a href={resolve('/')}> <img src="{base}/logo.svg" alt="Brand" height={32} width={32} /> </a>

	<nav aria-label="Category navigation">
		<ul>
			{#each categories as category (category.slug)}
				{@const isActive = category.slug === activeSlug}
				<li class:active={isActive}>
					<a href={resolve(`/${category.slug}/`)} aria-current={isActive ? 'page' : undefined}>
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
		transition: all 0.3 ease;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1vw 2vw;
		border-bottom: 1px solid var(--border);
	}

	header ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 2vw;
	}

	ul li a {
		color: var(--muted-foreground);
		text-decoration: none;
	}

	ul li a:hover,
	.active a {
		color: var(--primary);
	}

	.active a {
		font-weight: 600;
	}
</style>
