<script lang="ts">
	import { page } from '$app/state';

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	let headings = $state<Heading[]>([]);
	let activeId = $state<string>('');

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const currentPath = page.url.pathname;

		const domHeadings = document.querySelectorAll(
			'article.prose h1, article.prose h2, article.prose h3, article.prose h4'
		);

		const extracted: Heading[] = [];

		domHeadings.forEach((el) => {
			const text = el.textContent || '';

			let id = el.id;
			if (!id) {
				id = text
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/(^-|-$)/g, '');
				el.id = id;
			}

			const level = parseInt(el.tagName.replace('H', ''), 10);
			extracted.push({ id, text, level });
		});

		headings = extracted;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{ rootMargin: '0px 0px -80% 0px' }
		);

		domHeadings.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<aside class="sidebar">
	<h4 class="category-title">Table of Contents</h4>

	{#if headings.length > 0}
		<nav class="toc-list">
			{#each headings as heading (heading.id)}
				<a
					href="#{heading.id}"
					class="toc-link"
					class:active={activeId === heading.id}
					class:font-bold={heading.level === 1 || heading.level === 2}
					style="margin-left: {(heading.level - 2) * 1}rem;"
				>
					{heading.text}
				</a>
			{/each}
		</nav>
	{:else}
		<p class="empty-state">No headings found.</p>
	{/if}
</aside>

<style>
	.sidebar {
		outline: 1px solid blue !important;

		padding: 1vw;
		position: sticky;
		top: 0;
		max-height: 100vh;
		overflow-y: auto;
	}

	.category-title {
		margin-bottom: 1.5rem;
		text-transform: uppercase;
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		color: var(--muted-foreground);
	}

	.toc-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-left: 2px solid var(--border);
		padding-left: 1rem;
	}

	.toc-link {
		text-decoration: none;
		color: var(--muted-foreground);
		font-size: 0.85rem;
		line-height: 1.4;
		transition: all 0.2s;
		opacity: 0.8;
	}

	.toc-link.font-bold {
		font-weight: 600;
		margin-top: 0.25rem;
		color: var(--foreground);
	}

	.toc-link:hover {
		color: var(--primary);
		opacity: 1;
	}

	.toc-link.active {
		color: var(--primary);
		opacity: 1;
		font-weight: 600;
	}

	.empty-state {
		font-size: 0.85rem;
		color: var(--muted-foreground);
		font-style: italic;
	}

	@media (max-width: 768px) {
		.sidebar {
			display: none;
		}
	}
</style>
