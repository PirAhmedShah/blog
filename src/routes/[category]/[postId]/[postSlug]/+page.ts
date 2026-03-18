import { resolve } from '$app/paths';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
	const { categories, postsByCategory } = await parent();

	const category = categories.find((c) => c.slug === params.category);
	if (!category) error(404, `Category "${params.category}" does not exist.`);

	const posts = postsByCategory[category.slug] ?? [];
	const post = posts.find((p) => p.id === Number(params.postId));
	if (!post) error(404, `Post "${params.postId}" does not exist in "${category.slug}".`);

	if (post.slug !== params.postSlug)
		redirect(301, resolve(`/${params.category}/${params.postId}/${post.slug}/`));

	const content = await post.load();

	return { content, category, post };
};
