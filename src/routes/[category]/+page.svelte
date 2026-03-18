<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { SvelteSet } from 'svelte/reactivity';
	import { fade, fly } from 'svelte/transition';

	let { data } = $props();

	const category = $derived(data.category);
	const tags = $derived(data.tags);
	const CategoryContent = $derived(data.content);

	let selectedTags = new SvelteSet();

	const posts = $derived(
		selectedTags.size === 0
			? data.posts
			: data.posts.filter((post) => post.metadata.tags?.some((tag) => selectedTags.has(tag)))
	);

	function toggleTag(tag: string) {
		if (selectedTags.has(tag)) selectedTags.delete(tag);
		else selectedTags.add(tag);
	}
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
		<!-- Hero -->
		<header class="hero">
			<p class="eyebrow">Category</p>
			<h1>{category.metadata.name}</h1>
			<p class="description">{category.metadata.description}</p>
		</header>

		<!-- Category prose content -->
		<article class="prose">
			<CategoryContent />
		</article>

		<!-- Tag filter bar -->
		{#if tags.length > 0}
			<section class="filter-section" aria-label="Filter posts by tag">
				<p class="filter-label">
					Filter by tag
					{#if selectedTags.size > 0}
						<button class="clear-btn" onclick={() => selectedTags.clear()}> Clear all × </button>
					{/if}
				</p>
				<div class="tag-list" role="group" aria-label="Tag filters">
					{#each tags as tag (tag)}
						<button
							class="tag"
							class:active={selectedTags.has(tag)}
							aria-pressed={selectedTags.has(tag)}
							onclick={() => toggleTag(tag)}
						>
							{tag}
						</button>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Posts grid -->
		{#if posts.length > 0}
			<div class="grid-container">
				{#each posts as post (post.id)}
					<a
						href={resolve(`/${category.slug}/${post.id}/${post.slug}/`)}
						class="card"
						in:fly={{ y: 16, duration: 250 }}
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
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 1.5rem 6rem;
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

	/* ── Filter bar ───────────────────────────────────────── */
	.filter-section {
		margin-bottom: 2.5rem;
	}

	.filter-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted-foreground);
		margin: 0 0 0.75rem;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
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

	.tag.active {
		background: var(--primary);
		border-color: var(--primary);
		color: var(--primary-foreground);
	}

	/* display-only card tags */
	.tag--sm {
		font-size: 0.65rem;
		padding: 0.2rem 0.5rem;
		cursor: default;
		pointer-events: none;
	}

	/* ── Clear btn ────────────────────────────────────────── */
	.clear-btn {
		appearance: none;
		background: none;
		border: none;
		font-family: inherit;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--muted-foreground);
		cursor: pointer;
		padding: 0;
		text-decoration: underline;
		text-underline-offset: 3px;
		transition: color 0.15s ease;
	}

	.clear-btn:hover {
		color: var(--foreground);
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
