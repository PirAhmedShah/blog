import type { Component } from "svelte";

export interface PostMetadata {
    title: string;
    description: string;
    date: string;
    author: string;
}

export interface Post {
    slug: string;

    content: Component | null;
    metadata: PostMetadata;
    load: () => Promise<Component>;
}