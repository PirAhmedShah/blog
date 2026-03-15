import type { Component } from "svelte";

export interface CategoryMetadata {
    name: string;
    description: string;
    color: string;
    icon: string;
    order: number;
}

export interface Category {
    slug: string;
    content: Component|null;
    metadata: CategoryMetadata;
    load: () => Promise<Component>; 
}