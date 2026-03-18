import { resolve } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';

export const prerender = false;

export const load = async ({ params, parent }) => {
	const { category: categorySlug, postId } = params;
	const { categories, postsByCategory } = await parent();

	const category = categories.find((c) => c.slug === categorySlug);
	if (!category) error(404, `Category "${categorySlug}" does not exist.`);

	const post = (postsByCategory[categorySlug] ?? []).find((p) => p.id === Number(postId));
	if (!post) error(404, `Post "${postId}" does not exist in "${categorySlug}".`);

	redirect(301, resolve(`/${categorySlug}/${postId}/${post.slug}/`));
};
