<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const { children, ...restProps }: { children?: import('svelte').Snippet } & HTMLButtonAttributes = $props();
</script>

<button {...restProps}>{@render children?.()}</button>

<style>
	button {
		background-color: var(--foreground);
		color: var(--background);
		padding: 0.5rem 1rem;
		border: none;
		cursor: pointer;
		transition:
			color,
			background-color 0.2s ease;
	}
	button:hover {
		background-color: var(--primary);
		color: var(--primary-foreground);
	}
</style>
