<script lang="ts">
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import * as Icons from '@lucide/svelte';

	let { data } = $props();
	const categories = $derived(data.categories);
	const postsByCategory = $derived(data.postsByCategory);
</script>

<svelte:head>
	<title>Pir Ahmed Shah | Dev Blog</title>
	<meta name="title" content="Pir Ahmed Shah | Dev Blog" />
	<meta
		name="description"
		content="Technical writing on systems programming, web engineering, and computer science fundamentals by a 2nd-year CS student at FAST-NUCES."
	/>
	<meta name="author" content="Pir Ahmed Shah" />
	<link rel="canonical" href="https://pirahmedshah.github.io/blog/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Pir Ahmed Shah | Dev Blog" />
	<meta property="og:url" content="https://pirahmedshah.github.io/blog/" />
	<meta property="og:title" content="Pir Ahmed Shah | Dev Blog" />
	<meta
		property="og:description"
		content="Technical writing on systems programming, web engineering, and computer science fundamentals by a 2nd-year CS student at FAST-NUCES."
	/>
	<meta property="og:image" content="https://pirahmedshah.github.io/blog/og-image.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Pir Ahmed Shah Dev Blog" />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@AhmedX" />
	<meta name="twitter:creator" content="@AhmedX" />
	<meta name="twitter:url" content="https://pirahmedshah.github.io/blog/" />
	<meta name="twitter:title" content="Pir Ahmed Shah | Dev Blog" />
	<meta
		name="twitter:description"
		content="Technical writing on systems programming, web engineering, and computer science fundamentals by a 2nd-year CS student at FAST-NUCES."
	/>
	<meta name="twitter:image" content="https://pirahmedshah.github.io/blog/og-image.png" />
	<meta name="twitter:image:alt" content="Pir Ahmed Shah Dev Blog" />
</svelte:head>

<main>
	<section class="hero" in:fade={{ duration: 600 }}>
		<p class="eyebrow">Pir Ahmed Shah</p>
		<h1>Welcome to my<br />digital garden.</h1>
		<p class="subtitle">
			Engineering logs, Svelte 5 deep dives, and CS fundamentals from a 1st-year student at
			FAST-NUCES.
		</p>
	</section>

	<div class="divider"></div>

	<section class="categories" in:fade={{ duration: 600, delay: 200 }}>
		<p class="section-label">Explore categories</p>
		<div class="grid">
			{#each categories as category (category.slug)}
				{@const Icon = Icons[category.metadata.icon as keyof typeof Icons.icons]}
				{@const count = postsByCategory[category.slug]?.length ?? 0}

				<a
					href={resolve(`/${category.slug}/`)}
					class="card"
					style="--card-accent: {category.metadata.color}"
				>
					<div class="accent-bar"></div>
					<div class="card-header">
						<div class="icon-wrapper">
							{#if Icon}<Icon size={20} />{/if}
						</div>
						<span class="post-badge">{count} {count === 1 ? 'post' : 'posts'}</span>
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
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 5%;
	}

	.hero {
		text-align: center;
		padding: 5rem 0 3rem;
	}

	.eyebrow {
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--muted-foreground);
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 3rem;
		font-weight: 500;
		line-height: 1.2;
		color: var(--foreground);
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 1.1rem;
		color: var(--muted-foreground);
		max-width: 480px;
		margin: 0 auto;
		line-height: 1.7;
	}

	.divider {
		width: 40px;
		height: 2px;
		background: var(--border);
		margin: 0 auto 3rem;
		border-radius: 2px;
	}

	.section-label {
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted-foreground);
		margin-bottom: 1.25rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		padding-bottom: 4rem;
	}

	.card {
		position: relative;
		overflow: hidden;
		padding: 1.5rem;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		text-decoration: none;
		color: var(--foreground);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition:
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.card:hover {
		border-color: var(--card-accent);
		transform: translateY(-3px);
	}

	.accent-bar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--card-accent);
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.card:hover .accent-bar {
		opacity: 1;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.icon-wrapper {
		width: 36px;
		height: 36px;
		border-radius: var(--radius);
		background: var(--muted);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--card-accent);
	}

	.post-badge {
		font-size: 0.7rem;
		font-weight: 500;
		padding: 3px 8px;
		border-radius: 99px;
		background: var(--muted);
		color: var(--muted-foreground);
		border: 1px solid var(--border);
	}

	.card h3 {
		font-size: 1.1rem;
		font-weight: 500;
	}

	.card p {
		font-size: 0.9rem;
		color: var(--muted-foreground);
		line-height: 1.6;
		flex-grow: 1;
	}

	.explore-link {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--card-accent);
	}
</style>
