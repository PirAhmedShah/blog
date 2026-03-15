import type { Category } from "$lib/types/category.type";
import type { Post, PostMetadata } from "$lib/types/post.type";
import { error } from "@sveltejs/kit";
import type { Component } from "svelte";

interface LoadData {
    posts: Post[],
    category: Category
}

export const load = async ({ params, parent }): Promise<LoadData> => {
    const { categories } = await parent();

    const categoryExists = categories.find((c) => c.slug === params.category);
    if (!categoryExists) {
        error(404, `Category '${params.category}' does not exist.`);
    }

    const allFiles = import.meta.glob('/src/lib/posts/*/*.svx', {
        eager: true,
        import: 'metadata'
    }) as Record<string, PostMetadata>;

    const allResolvers = import.meta.glob('/src/lib/posts/*/*.svx', {
        import: 'default'
    });

    const posts = Object.entries(allResolvers)
        .filter(([path]) => path.startsWith(`/src/lib/posts/${params.category}/`))
        .map(([path, resolver]): Post => {
            const slug = path.split('/').pop()?.replace('.svx', '');
            if (!slug) error(500, `Slug error in ${path}`);
            return {
                slug,
                metadata: allFiles[path],
                load: resolver as () => Promise<Component>,
                content: null
            };
        }).sort((a, b) => a.metadata.date < b.metadata.date ? 1 : -1);

    return {
        posts, category: {
            ...categoryExists,
            content: await categoryExists.load()
        }
    };
};