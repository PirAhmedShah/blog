<script lang="ts">
	let { tags, selected = $bindable([]) } = $props();
	selected = []; //reset the state in every initialization, insuring tags filter reset on category navigation
	const toggle = (tag: string) => {
		const idx = selected.indexOf(tag);
		if (idx !== -1) selected.splice(idx, 1);
		else selected.push(tag);
	};
</script>

{#if tags.length > 0}
	<section class="filter-section" aria-label="Filter posts by tag">
		<p class="filter-label">
			Filter by tag
			{#if selected.length > 0}
				<button class="clear-btn" onclick={() => (selected.length = 0)}> Clear all × </button>
			{/if}
		</p>
		<div class="tag-list" role="group" aria-label="Tag filters">
			{#each tags as tag (tag)}
				<button
					class="tag"
					class:active={selected.includes(tag)}
					aria-pressed={selected.includes(tag)}
					onclick={() => toggle(tag)}
				>
					{tag}
				</button>
			{/each}
		</div>
	</section>
{/if}

<style>
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
</style>
