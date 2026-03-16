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

<svelte:head>
	<title>{meta.title} | {category.metadata.name} | Pir Ahmed Shah's Blog</title>
	<meta name="description" content={meta.description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta
		property="og:url"
		content="https://pirahmedshah.github.io/blog/{page.params.category}/{page.params.posts}"
	/>
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={meta.date} />
	<meta property="article:author" content={meta.author} />
</svelte:head>

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
	:global(*) {
		box-sizing: border-box;
	}

	.post-wrapper {
		width: 100%;
		overflow-x: hidden;
	}

	.hero-header {
		min-height: 400px;
		display: flex;
		align-items: flex-end;
		justify-content: center;

		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: var(--card);

		border-bottom: 1px solid var(--border);
		padding: 4rem 1rem 2rem 1rem;
	}

	.hero-content {
		max-width: 750px;
		width: 100%;
		margin: 0 auto;
		position: relative;
		z-index: 10;
	}

	.meta-tag {
		display: inline-block;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		font-size: clamp(1rem, 4vw, 1.5rem);
		margin-bottom: 1rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		padding: 0.5rem 1rem;
	}

	.hero-header h1 {
		font-size: clamp(2.25rem, 8vw, 3.5rem);
		line-height: 1.1;
		margin-bottom: 1.25rem;

		overflow-wrap: break-word;
		word-wrap: break-word;
		hyphens: auto;
	}

	.hero-header .subtitle {
		font-size: clamp(1.1rem, 3vw, 1.25rem);
		margin-bottom: 1.5rem;
		max-width: 600px;
		line-height: 1.5;
	}

	.hero-header time {
		font-size: 0.95rem;
		font-weight: 500;
		opacity: 0.9;
	}

	.post-container {
		max-width: 750px;
		margin: clamp(2rem, 8vw, 4rem) auto;
		padding: 0 1.25rem;
	}

	.post-content {
		width: 100%;
	}

	.post-content :global(h2) {
		font-size: clamp(1.5rem, 5vw, 2rem);
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		color: var(--foreground);
		overflow-wrap: break-word;
	}

	.post-content :global(h3) {
		font-size: clamp(1.25rem, 4vw, 1.5rem);
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: var(--foreground);
	}

	.post-content :global(p) {
		line-height: 1.8;
		margin-bottom: 1.5rem;
		font-size: clamp(1rem, 2.5vw, 1.1rem);
		color: var(--foreground);
		overflow-wrap: break-word;
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
		margin-bottom: 1.5rem;

		max-width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	@media (max-width: 480px) {
		.hero-header {
			min-height: 320px;
			padding-top: 2rem;
		}
	}
</style>
