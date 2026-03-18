import type { Category, CategoryMetadata } from '$lib/types/category.type';
import type { Post, PostFileNameMatch, PostMetadata } from '$lib/types/post.type';
import { slugify } from '$lib/utils/slugify.util';
import type { Component } from 'svelte';

export const prerender = true;
export const ssr = true;
export const trailingSlash = 'always';

// ─── Filename pattern ────────────────────────────────────────────────────────

const POST_FILENAME_RE = /^(?<id>\d+)\.svx$/;

// ─── Parsers ─────────────────────────────────────────────────────────────────

function parseCategory(
	path: string,
	metadata: CategoryMetadata,
	loader: () => Promise<unknown>
): Category {
	const slug = path.split('/').pop()?.replace('.svx', '');
	if (!slug) throw new Error(`Category slug could not be parsed from: ${path}`);

	return { slug, metadata, load: loader as () => Promise<Component> };
}

function parsePost(path: string, metadata: PostMetadata, loader: () => Promise<unknown>): Post {
	const [category, filename] = path.split('/').slice(-2);
	if (!filename) throw new Error(`Filename error in ${path}`);

	const match = filename.match(POST_FILENAME_RE) as PostFileNameMatch | null;
	if (!match) throw new Error(`Invalid filename, must be '[id].svx'. Got: ${filename}`);

	const id = Number(match.groups.id);

	return {
		slug: slugify(metadata.title),
		id,
		category,
		metadata,
		load: loader as () => Promise<Component>
	};
}

// ─── Validation ───────────────────────────────────────────────────────────────

const REQUIRED_STRING_FIELDS = ['title', 'description', 'author', 'date'] as const;

function validatePost(post: Post): void {
	const { category, id, metadata } = post;
	const location = `$lib/posts/${category}/${id}.svx`;

	for (const field of REQUIRED_STRING_FIELDS) {
		const value = metadata[field];
		if (!value || typeof value !== 'string')
			throw new Error(`Invalid or missing "${field}" metadata in ${location}`);
	}

	if (!Array.isArray(metadata.tags) || metadata.tags.length === 0)
		throw new Error(`Invalid or missing "tags" metadata in ${location}`);

	metadata.tags.forEach((tag, i) => {
		if (!tag || typeof tag !== 'string')
			throw new Error(`Invalid tag at index ${i} in ${location}`);
	});
}

// ─── Load ─────────────────────────────────────────────────────────────────────

export const load = async () => {
	// Categories
	const categoryMetadata = import.meta.glob<CategoryMetadata>('/src/lib/posts/*.svx', {
		eager: true,
		import: 'metadata'
	});
	const categoryLoaders = import.meta.glob('/src/lib/posts/*.svx', { import: 'default' });

	const categories = Object.entries(categoryLoaders)
		.map(([path, loader]) => parseCategory(path, categoryMetadata[path], loader))
		.sort((a, b) => a.metadata.order - b.metadata.order);

	if (categories.length === 0)
		throw new Error('No categories found. Add at least one .svx file to /src/lib/posts/');

	// Posts
	const postMetadata = import.meta.glob('/src/lib/posts/*/*.svx', {
		eager: true,
		import: 'metadata'
	}) as Record<string, PostMetadata>;
	const postLoaders = import.meta.glob('/src/lib/posts/*/*.svx', { import: 'default' });

	const posts = Object.entries(postLoaders)
		.map(([path, loader]) => parsePost(path, postMetadata[path], loader))
		.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));

	// Group, sort within category, and validate
	const postsByCategory = Object.groupBy(posts, (post) => post.category);

	for (const group of Object.values(postsByCategory)) {
		if (!group) continue;

		group.sort((a, b) => a.id - b.id);

		group.forEach((post, i) => {
			if (i !== post.id)
				throw new Error(
					`Post IDs must be sequential. Expected ${i} but got ${post.id} for "${post.slug}" in "${post.category}".`
				);
			validatePost(post);
		});
	}

	return { categories, postsByCategory };
};
