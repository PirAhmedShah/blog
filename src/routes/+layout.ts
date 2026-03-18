// routes/+layout.ts
import type { Category, CategoryMetadata } from '$lib/types/category.type';
import type { Post, PostFileNameMatch, PostMetadata } from '$lib/types/post.type';
import { slugify } from '$lib/utils/slugify.util';
import type { Component } from 'svelte';

export const prerender = true;
export const ssr = true;
export const trailingSlash = 'always';

export const load = async () => {
	const categoryMetadata = import.meta.glob<CategoryMetadata>('/src/lib/posts/*.svx', {
		eager: true,
		import: 'metadata'
	});

	const categoryContent = import.meta.glob('/src/lib/posts/*.svx', {
		import: 'default'
	});

	const categories = Object.entries(categoryContent)
		.map(([path, resolver]): Category => {
			const slug = path.split('/').pop()?.replace('.svx', '');
			if (!slug) throw new Error(`Category slug could not be parsed from: ${path}`);

			return {
				slug,
				metadata: categoryMetadata[path],
				load: resolver as () => Promise<Component>
			};
		})
		.sort((a, b) => a.metadata.order - b.metadata.order);

	if (categories.length === 0)
		throw new Error('No categories found. Add at least one .svx file to /src/lib/posts/');

	const postMetadata = import.meta.glob('/src/lib/posts/*/*.svx', {
		eager: true,
		import: 'metadata'
	}) as Record<string, PostMetadata>;

	const postContent = import.meta.glob('/src/lib/posts/*/*.svx', {
		import: 'default'
	});

	const posts = Object.entries(postContent)
		.map(([path, resolver]): Post => {
			const metadata = postMetadata[path];
			const [category, filename] = path.split('/').slice(-2);

			if (!filename) throw new Error(`Filename error in ${path}`);

			const match = filename.match(/^(?<id>\d+)\.svx$/) as PostFileNameMatch | null;
			if (!match) throw new Error(`Invalid filename, must be '[id].svx'. Got: ${filename}`);

			const id = Number(match.groups.id);

			return {
				slug: slugify(metadata.title),
				id,
				category,
				metadata,
				load: resolver as () => Promise<Component>
			};
		})
		.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));

	const postsByCategory = Object.groupBy(posts, (post) => post.category);

	Object.values(postsByCategory).forEach((val) => {
		if (!val?.length) return;
		val.sort((a, b) => a.id - b.id);
		val.forEach((post, i) => {
			if (i !== post.id)
				throw new Error(
					`Post IDs must be sequential. Expected ${i} but got ${post.id} for "${post.slug}" in "${post.category}".`
				);
		});
	});

	return { categories, postsByCategory };
};
