<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';

	let { data } = $props();

	const { meta, content: PostContent, category } = $derived(data);
	const thumbnailUrl = $derived(
		`${base}/images/thumbnails/${page.params.category}/${page.params.posts}.webp`
	);
</script>

{#key page.url.pathname}
	<div class="post-wrapper" in:fade={{ duration: 300 }}>
		<header
			class="hero-header"
			style="background-image: linear-gradient(to bottom, transparent, var(--background)), url('{thumbnailUrl}');"
		>
			<div class="hero-content">
				<span class="meta-tag">
					{category.metadata.name}
				</span>
				<h1>{meta.title}</h1>
				<p class="subtitle">{meta.description}</p>
				<time datetime={meta.date}>
					{new Date(meta.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
			</div>
		</header>

		<div class="post-container">
			<article class="post-content prose">
				<PostContent />
			</article>
		</div>
	</div>
{/key}

<style>
	/* Wrap everything */
	.post-wrapper {
		width: 100%;
	}

	/* === HERO HEADER STYLES === */
	.hero-header {
		min-height: 400px;
		display: flex;
		align-items: flex-end; /* Pushes content to the bottom of the hero */
		justify-content: center;

		/* Background properties */
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: var(--card); /* Fallback color if image 404s */

		/* Optional: Add a subtle bottom border to transition into the page */
		border-bottom: 1px solid var(--border);
		padding: 4rem 1.5rem 3rem 1.5rem;
	}

	.hero-content {
		max-width: 750px;
		width: 100%;
		margin: 0 auto;
		position: relative;
		z-index: 10;
	}

	.meta-tag {
		padding: 0.5rem 1rem;
	}
	.hero-header .meta-tag {
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		font-size: 1.5rem;
		margin-bottom: 1rem;
		/* Dropshadow to make the colored text pop against the image */
		text-shadow: 0 2px 4px inherit;
	}

	.hero-header h1 {
		font-size: 3.5rem; /* Made slightly larger for hero impact */
		line-height: 1.1;
		margin-bottom: 1.25rem;
	}

	.hero-header .subtitle {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
		max-width: 90%;
	}

	.hero-header time {
		font-size: 0.95rem;
		font-weight: 500;
	}

	/* === POST CONTENT STYLES === */
	.post-container {
		max-width: 750px;
		margin: 4rem auto;
		padding: 0 1.5rem;
	}

	/* Target the rendered markdown content safely */
	.post-content :global(h2) {
		font-size: 2rem;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		color: var(--foreground);
	}

	.post-content :global(h3) {
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: var(--foreground);
	}

	.post-content :global(p) {
		line-height: 1.8;
		margin-bottom: 1.5rem;
		font-size: 1.1rem;
		color: var(--foreground);
	}

	.post-content :global(a) {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.post-content :global(ul),
	.post-content :global(ol) {
		margin-bottom: 1.5rem;
		padding-left: 1.5rem;
		font-size: 1.1rem;
		color: var(--foreground);
	}

	.post-content :global(li) {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	.post-content :global(pre) {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.25rem;
		overflow-x: auto;
		margin-bottom: 1.5rem;
	}
</style>
