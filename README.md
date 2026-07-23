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

## Post Inventory

### The Stack
- [Project: Contributing to a Roblox Player Finder](https://pirahmedshah.github.io/blog/stack/0/)
- [Deep Dive: Bitmask Auto-Tiling in 2D Games](https://pirahmedshah.github.io/blog/stack/1/)
- [Dynamic Lerp Camera & Viewport Culling in 2D Engines](https://pirahmedshah.github.io/blog/stack/2/)
- [Visualizing Algorithms: Render-Throttled Pathfinding](https://pirahmedshah.github.io/blog/stack/3/)
- [Building a Bulletproof Rust Backend: Performance & Security Deep Dive](https://pirahmedshah.github.io/blog/stack/4/)
- [Optimizing Physics Engines & Creative Coding in the Browser](https://pirahmedshah.github.io/blog/stack/5/)
- [Hardening a Fresh VPS: UFW, SSH, and the Principle of Least Access](https://pirahmedshah.github.io/blog/stack/6/)
- [Weighted Tag-Matching: Building a Related-Posts Algorithm](https://pirahmedshah.github.io/blog/stack/7/)
- [Bulletproof Financial APIs: Idempotency Keys in NestJS & Postgres](https://pirahmedshah.github.io/blog/stack/8/)
- [Integrating Roblox OAuth 2.0 for Platform Identity Verification](https://pirahmedshah.github.io/blog/stack/9/)
- [Scraping SPAs: MutationObservers and PGN Reconstruction on Chess.com](https://pirahmedshah.github.io/blog/stack/10/)

### Ship
- [Case Study: Rodevsy's Session Architecture - JWT + Redis Whitelisting](https://pirahmedshah.github.io/blog/ship/0/)
- [Why I Migrated Rodevsy from Next.js to SvelteKit 5](https://pirahmedshah.github.io/blog/ship/1/)
- [Designing the Rodevsy ERD: Modeling Mutually Exclusive Relationships](https://pirahmedshah.github.io/blog/ship/2/)
- [Rodevsy's CI/CD: From Manual SSH Builds to a Docker Registry Pipeline](https://pirahmedshah.github.io/blog/ship/3/)
- [Case Study: Migrating Rodevsy's VPS to Rootless Docker](https://pirahmedshah.github.io/blog/ship/4/)
- [Case Study: Designing RoDevsy's Escrow State Machine & Atomic Ledger](https://pirahmedshah.github.io/blog/ship/5/)
- [Securing the Marketplace: Automated Backdoor Scanning for Roblox Assets](https://pirahmedshah.github.io/blog/ship/6/)
- [Architecting a Local Chess Engine Bridge: Manifest V3 & WebSockets](https://pirahmedshah.github.io/blog/ship/7/)

### The Lab
- [Building a Container From Scratch: Namespaces & Cgroups in C](https://pirahmedshah.github.io/blog/lab/0/)
- [Taming Stockfish in Node.js: Asynchronous UCI Streams and Time-Based Depth](https://pirahmedshah.github.io/blog/lab/1/)

### Scripts
- [Resource: Bash Redirection & Operators Cheatsheet](https://pirahmedshah.github.io/blog/scripts/0/)
- [Why Roblox RemoteFunctions Are an Anti-Pattern](https://pirahmedshah.github.io/blog/scripts/1/)
- [Roblox's Client-Server Model & Network Ownership, Explained](https://pirahmedshah.github.io/blog/scripts/2/)

### Journal
- [Retrospective: February 2026](https://pirahmedshah.github.io/blog/journal/0/)
- [Weekly Log: 11 - March 2026](https://pirahmedshah.github.io/blog/journal/1/)
- [Learning: What Building This Blog Taught Me](https://pirahmedshah.github.io/blog/journal/2/)
- [TIL: Why Having a Blog Matters More Than I Thought](https://pirahmedshah.github.io/blog/journal/3/)
- [Resource: Tag Reference](https://pirahmedshah.github.io/blog/journal/4/)
- [Build Log: This Blog](https://pirahmedshah.github.io/blog/journal/5/)
- [TIL: Svelte 5 Transitions Done Right](https://pirahmedshah.github.io/blog/journal/6/)
- [Resource: Beginner's Guide to Github Actions](https://pirahmedshah.github.io/blog/journal/7/)
- [Weekly Log: 13 - March 2026](https://pirahmedshah.github.io/blog/journal/8/)
- [TIL: Why Financial Ledgers Must Be Append-Only](https://pirahmedshah.github.io/blog/journal/9/)

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

```markdown
---
title: "Post Title"
description: "Brief summary of the post"
date: "2026-03-15"
author: "Pir Ahmed Shah"
tags: ["svelte", "backend", "fast-nuces"]
---

# Your Content Here
```

## License

MIT © Pir Ahmed Shah