import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { createHighlighter } from 'shiki';

const themes = {
	dark: 'ayu-dark',
	light: 'ayu-light'
};

const langs = [
	'javascript',
	'typescript',
	'bash',
	'sh',
	'html',
	'css',
	'json',
	'svelte',
	'sql',
	'lua'
];

const highlighter = await createHighlighter({
	themes: Object.values(themes),
	langs: langs
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.svelte.md', '.md', '.svx'],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const loadedLangs = highlighter.getLoadedLanguages();
					const finalLang =
						loadedLangs.includes(lang) || ['text', 'plain', 'ansi'].includes(lang) ? lang : 'text';

					const html = escapeSvelte(
						highlighter.codeToHtml(code, {
							lang: finalLang,
							themes: themes,
							defaultColor: false
						})
					);

					return `{@html \`${html}\` }`;
				}
			}
		})
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: '/blog',
			relative: true
		},
		inlineStyleThreshold: 2048
	}
};

export default config;
