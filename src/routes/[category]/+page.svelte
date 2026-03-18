<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';

	let { data } = $props();

	const category = $derived(data.category);
	const posts = $derived(data.postsByCategory[category.slug]);
	const CategoryContent = $derived(data.content);
</script>

<svelte:head>
	<title>{category.metadata.name} | Pir Ahmed Shah's Blog</title>
	<meta name="title" content="{category.metadata.name} | Pir Ahmed Shah's Blog" />
	<meta name="description" content={category.metadata.description} />
	<meta name="author" content="Pir Ahmed Shah" />
	<link rel="canonical" href="https://pirahmedshah.github.io/blog/{page.params.category}/" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Pir Ahmed Shah | Dev Blog" />
	<meta property="og:url" content="https://pirahmedshah.github.io/blog/{page.params.category}/" />
	<meta property="og:title" content="{category.metadata.name} | Pir Ahmed Shah's Blog" />
	<meta property="og:description" content={category.metadata.description} />
	<meta property="og:image" content="https://pirahmedshah.github.io/blog/og-image.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{category.metadata.name} | Pir Ahmed Shah's Blog" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@AhmedX" />
	<meta name="twitter:creator" content="@AhmedX" />
	<meta name="twitter:url" content="https://pirahmedshah.github.io/blog/{page.params.category}/" />
	<meta name="twitter:title" content="{category.metadata.name} | Pir Ahmed Shah's Blog" />
	<meta name="twitter:description" content={category.metadata.description} />
	<meta name="twitter:image" content="https://pirahmedshah.github.io/blog/og-image.png" />
	<meta name="twitter:image:alt" content="{category.metadata.name} | Pir Ahmed Shah's Blog" />
</svelte:head>

{#key page.url.pathname}
	<main class="container" in:fade={{ duration: 300 }}>
		<article class="category-header prose">
			<h1>{category.metadata.name}</h1>
			<p class="description">{category.metadata.description}</p>

			<CategoryContent />
			<div class="meta-divider"></div>
		</article>

		{#if posts && posts.length > 0}
			<div class="grid-container">
				{#each posts as post (post.id)}
					<a href={resolve(`/${category.slug}/${post.id}/${post.slug}/`)} class="card">
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
