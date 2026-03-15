import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
    const { posts, category } = await parent();

    const post = posts.find((p) => p.slug === params.posts);

    if (!post) {
        throw error(404, `Post '${params.posts}' not found in category '${params.category}'`);
    }

    return {
        meta: post.metadata,
        content: await post.load(),
        category
    };
};