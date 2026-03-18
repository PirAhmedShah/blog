import type { Component } from 'svelte';

export interface PostMetadata {
	title: string;
	description: string;
	date: string;
	author: string;
}

export interface Post {
	id: number;
	slug: string;
	category: string;
	metadata: PostMetadata;
	load: () => Promise<Component>;
}

export interface PostFileNameMatch extends RegExpMatchArray {
	groups: {
		id: string;
	};
}
