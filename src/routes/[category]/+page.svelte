<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';

	let { data } = $props();

	const posts = $derived(data.posts ?? []);
	const category = $derived(data.category);
	const CategoryComponent = $derived(category.content);
</script>

{#key page.url.pathname}
	<main class="container" in:fade={{ duration: 300 }}>
		<article class="category-header prose">
			<h1>{category.metadata.name}</h1>
			<p class="description">{category.metadata.description}</p>

			<CategoryComponent />
			<div class="meta-divider"></div>
		</article>

		{#if posts.length > 0}
			<div class="grid-container">
				{#each posts as post (post.slug)}
					<a href={resolve(`/${category.slug}/${post.slug}`)} class="card">
						<div class="card-content">
							<h3>{post.metadata.title}</h3>
							<p>{post.metadata.description}</p>
						</div>
						<span class="read-more">Read article →</span>
					</a>
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<p>No articles published in this category yet.</p>
			</div>
		{/if}
	</main>
{/key}

<style>
	.container {
		margin: 0 auto;
		padding: 4rem 1.5rem;
	}

	.category-header {
		margin-bottom: 3rem;
	}

	.description {
		font-size: 1.25rem;
		color: var(--muted-foreground);
		max-width: 600px;
	}

	.meta-divider {
		width: 60px;
		height: 4px;
		margin-top: 2rem;
		border-radius: 2px;
	}
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 2rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		color: var(--card-foreground);
	}

	.card:hover {
		transform: translateY(-8px);
		border-color: var(--primary);
		box-shadow: 0 10px 30px -10px var(--border);
	}

	.card-content h3 {
		margin: 0 0 1rem 0;
		font-size: 1.5rem;
	}

	.card-content p {
		color: var(--muted-foreground);
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.read-more {
		margin-top: auto;
		font-weight: 600;
		color: var(--primary);
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.empty-state {
		text-align: center;
		padding: 5rem;
		border: 2px dashed var(--border);
		border-radius: var(--radius);
		color: var(--muted-foreground);
	}
</style>
