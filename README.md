# [BLOG](https://github.com/PirAhmedShah/blog)

Personal engineering blog and digital garden. This repository contains the source code for my blog, where I document my journey as a 4th-semester CS student at **FAST-NUCES**, technical deep dives into **Svelte 5**, and the development of **RoDevsy**.

## The Stack

Built with a focus on high-performance frontend and a "KISS" (Keep It Simple, Stupid) philosophy.
- **Framework:** SvelteKit 5 (utilizing Runes)
- **Content:** Mdsvex (Markdown for Svelte)
- **Syntax Highlighting:** Shiki
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm

## The Grid (Categories)

The blog is structured into five core areas:
- **The Lab:** Coursework from FAST (OS, Networking, Linux).
- **Ship:** Building RoDevsy and full-stack implementation notes.
- **The Stack:** Web dev tutorials, Svelte 5 patterns, and Docker/DevOps.
- **Scripts:** Specialized Luau engineering and Roblox ecosystem security.
- **Journal:** Weekly retrospectives and raw "Today I Learned" snippets.

## Local Development

1. **Clone the repo:**
   `git clone https://github.com/PirAhmedShah/blog.git`
   `cd blog`

2. **Install dependencies:**
   `pnpm install`

3. **Start the dev server:**
   `pnpm dev`

## Writing a Post

New entries are added as `.svx` files in the `$lib/posts/` directory. Each file requires standard frontmatter:

---
title: "Post Title"
description: "Brief summary of the post"
date: "2026-03-15"
author: "Pir Ahmed Shah"
tags: ["svelte", "backend", "fast-nuces"]
---

# Your Content Here

## License
MIT © Pir Ahmed Shah