<script lang="ts">
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import * as Icons from '@lucide/svelte';

	let { data } = $props();
	const categories = $derived(data.categories);
</script>

<main>
	<section class="hero" in:fade={{ duration: 600 }}>
		<h1>Welcome to my digital garden.</h1>
		<p>Exploring systems, theory, and the craft of software development.</p>
	</section>

	<section class="categories-grid" in:fade={{ duration: 600, delay: 200 }}>
		<h2>Explore Categories</h2>
		<div class="grid">
			{#each categories as category (category.slug)}
				{@const Icon = Icons[category.metadata.icon as keyof typeof Icons.icons]}

				<a
					href={resolve(`/${category.slug}`)}
					class="category-card"
					style="--card-primary: {category.metadata.color}"
				>
					<div class="icon-wrapper">
						{#if Icon}
							<Icon size={64} />
						{/if}
					</div>

					<h3>{category.metadata.name}</h3>
					<p>{category.metadata.description}</p>
					<span class="explore-link">Explore →</span>
				</a>
			{/each}
		</div>
	</section>
</main>

<style>
	main {
		margin: 0 auto;
		padding: 4rem 5%;
	}

	.hero {
		text-align: center;
		padding: 4rem 0;
		margin-bottom: 2rem;
	}
	h1 {
		font-size: 3.5rem;
		margin-bottom: 1rem;
		color: var(--foreground);
	}
	.hero p {
		font-size: 1.25rem;
		color: var(--muted-foreground);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
	}

	.category-card {
		padding: 2rem;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		color: var(--foreground);
		transition:
			transform 0.3s ease,
			border-color 0.3s ease;
		display: flex;
		flex-direction: column;
		/* Use the metadata color on hover */
		border-top: 4px solid transparent;
	}

	.category-card:hover {
		transform: translateY(-8px);
		border-top-color: var(--card-primary);
	}

	.icon-wrapper {
		margin-bottom: 1.5rem;
		color: var(--card-primary);
	}

	.category-card h3 {
		margin: 0 0 1rem 0;
		font-size: 1.5rem;
	}
	.category-card p {
		color: var(--muted-foreground);
		margin-bottom: 2rem;
		flex-grow: 1;
	}
	.explore-link {
		font-weight: 600;
		color: var(--card-primary);
	}
</style>
