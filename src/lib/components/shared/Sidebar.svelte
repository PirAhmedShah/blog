<script lang="ts">
	import { page } from '$app/state';
	import { SvelteMap } from 'svelte/reactivity';

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	let headings = $state<Heading[]>([]);
	let activeId = $state<string>('');
	let sidebarRef = $state<HTMLElement | null>(null);

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const _path = page.url.pathname;
		const domHeadings = document.querySelectorAll(
			'article.prose h1, article.prose h2, article.prose h3, article.prose h4'
		);

		const extracted: Heading[] = [];
		domHeadings.forEach((el) => {
			const text = el.textContent || '';
			let id =
				el.id ||
				text
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/(^-|-$)/g, '');
			el.id = id;
			extracted.push({ id, text, level: parseInt(el.tagName.replace('H', ''), 10) });
		});
		headings = extracted;

		const visibleHeadings = new SvelteMap<string, number>();
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const rect = entry.target.getBoundingClientRect();
						const distFromCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
						visibleHeadings.set(entry.target.id, distFromCenter);
					} else {
						visibleHeadings.delete(entry.target.id);
					}
				});

				if (visibleHeadings.size > 0) {
					let closestId = '';
					let closestDist = Infinity;
					visibleHeadings.forEach((dist, id) => {
						if (dist < closestDist) {
							closestDist = dist;
							closestId = id;
						}
					});
					activeId = closestId;
				}
			},
			{ rootMargin: '-4px 0px -90% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
		);

		domHeadings.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	$effect(() => {
		const syncSidebarScroll = () => {
			if (!sidebarRef) return;

			const winScroll = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercent = winScroll / docHeight;

			const sidebarMaxScroll = sidebarRef.scrollHeight - sidebarRef.clientHeight;

			sidebarRef.scrollTop = scrollPercent * sidebarMaxScroll;
		};

		window.addEventListener('scroll', syncSidebarScroll, { passive: true });
		return () => window.removeEventListener('scroll', syncSidebarScroll);
	});
</script>

<aside bind:this={sidebarRef} class="sidebar">
	<div class="sidebar-content">
		<h4 class="category-title">Table of Contents</h4>

		{#if headings.length > 0}
			<nav class="toc-list">
				{#each headings as heading (heading.id)}
					<a
						href="#{heading.id}"
						class="toc-link"
						class:active={activeId === heading.id}
						class:font-bold={heading.level <= 2}
						style="margin-left: {(heading.level - 2) * 1}rem;"
					>
						{heading.text}
					</a>
				{/each}
			</nav>
		{:else}
			<p class="empty-state">No headings found.</p>
		{/if}
	</div>
</aside>

<style>
	.sidebar {
		position: sticky;
		top: 0;
		height: 100vh;
		box-sizing: border-box;
		overflow-y: auto;
		align-self: start;
		scroll-behavior: auto;
	}

	.sidebar-content {
		padding: 2rem 1rem 4rem 1rem;
	}

	.sidebar::-webkit-scrollbar {
		width: 4px;
	}
	.sidebar::-webkit-scrollbar-track {
		background: transparent;
	}
	.sidebar::-webkit-scrollbar-thumb {
		background: var(--border);
		border-radius: 4px;
	}

	.category-title {
		margin-bottom: 1.5rem;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		font-weight: 700;
		color: var(--muted-foreground);
	}

	.toc-list {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		border-left: 2px solid var(--border);
		padding-left: 1rem;
	}

	.toc-link {
		text-decoration: none;
		color: var(--muted-foreground);
		font-size: 0.85rem;
		line-height: 1.4;
		transition: color 0.2s;
		opacity: 0.8;
	}

	.toc-link.font-bold {
		font-weight: 600;
		margin-top: 0.5rem;
		color: var(--foreground);
		opacity: 1;
	}

	.toc-link.font-bold:first-child {
		margin-top: 0;
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
