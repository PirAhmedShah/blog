import { error } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
	const { category: slug } = params;
	const { categories } = await parent();

	const category = categories.find((c) => c.slug === slug);
	if (!category) error(404, `Category "${slug}" does not exist.`);

	const content = await category.load();
	return { category, content };
};
