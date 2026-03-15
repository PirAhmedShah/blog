import type { Category, CategoryMetadata } from "$lib/types/category.type";
import { error } from "@sveltejs/kit";
import type { Component } from "svelte";

export const load = async () => {
    const filesMetadata = import.meta.glob<CategoryMetadata>('/src/lib/posts/*.svx', {
        eager: true,
        import: 'metadata'
    });

    const files = import.meta.glob('/src/lib/posts/*.svx', {
        import: 'default'
    });

    const categories = Object.entries(files).map(([path, resolver]): Category => {
        const slug = path.split('/').pop()?.replace('.svx', '');

        if (!slug) {
            error(500, `Category slug could not be parsed from: ${path}`);
        }

        return {
            slug,
            metadata: filesMetadata[path],
            load: resolver as () => Promise<Component>,
            content: null
        };
    }).sort((a, b) => a.metadata.order - b.metadata.order);
    if (categories.length === 0) {
        error(404, 'No categories found.');
    }

    return { categories };
};