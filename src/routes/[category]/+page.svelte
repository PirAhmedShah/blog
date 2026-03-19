<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import TagFilter from '$lib/components/shared/TagFilter.svelte';

	let { data } = $props();

	let selected = $state<string[]>([]);

	const posts = $derived.by(() => {
		if (selected.length === 0) return data.posts;

		const result = [];
		for (const post of data.posts) {
			let weight = 0;
			for (const tag of post.metadata.tags) {
				if (selected.includes(tag)) weight++;
			}
			if (weight > 0) result.push({ post, weight });
		}
		return result.sort((a, b) => b.weight - a.weight).map(({ post }) => post);
	});
</script>

<svelte:head>
	<title>{data.category.metadata.name} | Pir Ahmed Shah's Blog</title>
	<meta name="title" content="{data.category.metadata.name} | Pir Ahmed Shah's Blog" />
	<meta name="description" content={data.category.metadata.description} />
	<meta name="author" content="Pir Ahmed Shah" />
	<link rel="canonical" href="https://pirahmedshah.github.io/blog/{page.params.category}/" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Pir Ahmed Shah | Dev Blog" />
	<meta property="og:url" content="https://pirahmedshah.github.io/blog/{page.params.category}/" />
	<meta property="og:title" content="{data.category.metadata.name} | Pir Ahmed Shah's Blog" />
	<meta property="og:description" content={data.category.metadata.description} />
	<meta property="og:image" content="https://pirahmedshah.github.io/blog/og-image.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{data.category.metadata.name} | Pir Ahmed Shah's Blog" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@AhmedX" />
	<meta name="twitter:creator" content="@AhmedX" />
	<meta name="twitter:url" content="https://pirahmedshah.github.io/blog/{page.params.category}/" />
	<meta name="twitter:title" content="{data.category.metadata.name} | Pir Ahmed Shah's Blog" />
	<meta name="twitter:description" content={data.category.metadata.description} />
	<meta name="twitter:image" content="https://pirahmedshah.github.io/blog/og-image.png" />
	<meta name="twitter:image:alt" content="{data.category.metadata.name} | Pir Ahmed Shah's Blog" />
</svelte:head>

{#key page.params.category}
	<main class="container" in:fly={{ y: -24, duration: 300 }}>
		<header class="hero">
			<p class="eyebrow">Category</p>
			<h1>{data.category.metadata.name}</h1>
			<p class="description">{data.category.metadata.description}</p>
		</header>
		<article class="prose">
			<data.content />
		</article>
		<TagFilter tags={data.tags} bind:selected />
		{#if posts.length > 0}
			<div class="grid-container">
				{#each posts as post (post.id)}
					<a
						href={resolve(`/${data.category.slug}/${post.id}/${post.slug}/`)}
						class="card"
						in:fly={{ y: 16, duration: 250 }}
						animate:flip={{ duration: 250 }}
					>
						<div class="card-body">
							<h3>{post.metadata.title}</h3>
							<p class="card-desc">{post.metadata.description}</p>
						</div>
						<footer class="card-footer">
							{#if post.metadata.tags?.length}
								<ul class="card-tags" aria-label="Tags">
									{#each post.metadata.tags as tag (tag)}
										<li class="tag tag--sm">{tag}</li>
									{/each}
								</ul>
							{/if}
							<span class="read-more" aria-hidden="true">Read article →</span>
						</footer>
					</a>
				{/each}
			</div>
		{:else}
			<div class="empty-state" in:fade={{ duration: 200 }}>
				<p>No articles published in this category yet.</p>
			</div>
		{/if}
	</main>
{/key}

<style>
	.container {
		max-width: 800px;
		width: 100%;
		margin: 0 auto;
		padding: 4rem 1.5rem 6rem;
		box-sizing: border-box;
	}

	/* ── Hero ─────────────────────────────────────────────── */
	.hero {
		margin-bottom: 2.5rem;
		padding-bottom: 2.5rem;
		border-bottom: 1px solid var(--border);
	}

	.eyebrow {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--primary);
		margin: 0 0 0.75rem;
	}

	.hero h1 {
		font-size: clamp(2rem, 5vw, 3.25rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.1;
		margin: 0 0 1rem;
		color: var(--foreground);
	}

	.description {
		font-size: 1.1rem;
		color: var(--muted-foreground);
		max-width: 56ch;
		line-height: 1.7;
		margin: 0;
	}

	/* ── Prose ────────────────────────────────────────────── */
	.prose {
		margin-bottom: 3rem;
		color: var(--foreground);
	}

	/* ── Tags ─────────────────────────────────────────────── */
	.tag {
		appearance: none;
		background: transparent;
		font-family: inherit;
		cursor: pointer;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		padding: 0.3rem 0.65rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		color: var(--muted-foreground);
		transition:
			color 0.15s ease,
			border-color 0.15s ease,
			background 0.15s ease;
		line-height: 1;
	}

	.tag:hover {
		border-color: var(--primary);
		color: var(--primary);
	}

	/* display-only card tags */
	.tag--sm {
		font-size: 0.65rem;
		padding: 0.2rem 0.5rem;
		cursor: default;
		pointer-events: none;
	}

	/* ── Grid ─────────────────────────────────────────────── */
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
		gap: 1.25rem;
	}

	/* ── Card ─────────────────────────────────────────────── */
	.card {
		display: flex;
		flex-direction: column;
		padding: 1.75rem;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		color: var(--card-foreground);
		transition:
			transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.2s ease,
			box-shadow 0.25s ease;
	}

	.card:hover {
		transform: translateY(-4px);
		border-color: var(--primary);
		box-shadow: 0 8px 24px -8px color-mix(in srgb, var(--primary) 20%, transparent);
	}

	.card-body {
		flex: 1;
		margin-bottom: 1.5rem;
	}

	.card-body h3 {
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		margin: 0 0 0.6rem;
		line-height: 1.3;
	}

	.card-desc {
		font-size: 0.9rem;
		color: var(--muted-foreground);
		line-height: 1.65;
		margin: 0;
	}

	.card-footer {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.read-more {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--primary);
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		transition: gap 0.15s ease;
	}

	.card:hover .read-more {
		gap: 0.6rem;
	}

	/* ── Empty state ──────────────────────────────────────── */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 5rem 2rem;
		border: 2px dashed var(--border);
		border-radius: var(--radius);
		color: var(--muted-foreground);
	}

	.empty-state p {
		margin: 0;
		font-size: 1rem;
	}
</style>
