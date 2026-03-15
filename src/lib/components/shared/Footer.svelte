<script lang="ts">
	import { base } from '$app/paths';
	import { Github, Linkedin, Mail } from '@lucide/svelte';
</script>

<footer class="site-footer">
	<div class="footer-container">
		<div class="brand-section">
			<img src="{base}/images/avatars/me.webp" alt="Pir Ahmed Shah" class="avatar" loading="lazy" />
			<div class="brand-text">
				<span class="name">Pir Ahmed Shah</span>
				<span class="tagline">20yo Student @ FAST-NUCES</span>
			</div>
		</div>

		<div class="nav-section">
			<nav class="social-links">
				<a
					href="https://github.com/PirAhmedShah"
					target="_blank"
					rel="noreferrer"
					aria-label="GitHub"
				>
					<Github size={20} />
				</a>
				<!-- <a
					href="NO twitter page"
					target="_blank"
					rel="noreferrer"
					aria-label="Twitter"
				>
					<Twitter size={20} />
				</a> -->
				<a
					href="https://linkedin.com/in/pirahmedshah"
					target="_blank"
					rel="noreferrer"
					aria-label="LinkedIn"
				>
					<Linkedin size={20} />
				</a>
				<a href="mailto:pirahmedshah1@gmail.com" aria-label="Email">
					<Mail size={20} />
				</a>
			</nav>
		</div>
	</div>

	<div class="footer-bottom">
		<p>&copy; {new Date().getFullYear()} Pir Ahmed Shah. Building in the open.</p>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: 6rem;
		padding: 4rem 1.5rem 2rem;
		border-top: 1px solid var(--border);
		background: transparent;
	}

	.footer-container {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 2rem;
	}

	/* Identity */
	.brand-section {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--border);
		transition: border-color 0.3s ease;
	}

	.brand-section:hover .avatar {
		border-color: var(--primary);
	}

	.brand-text {
		display: flex;
		flex-direction: column;
	}

	.name {
		font-weight: 600;
		color: var(--foreground);
		font-size: 1.05rem;
	}

	.tagline {
		font-size: 0.85rem;
		color: var(--muted-foreground);
	}

	/* Navigation */
	.nav-section {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 1rem;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-links a {
		color: var(--muted-foreground);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border-radius: 8px;
		background: transparent;
		transition: all 0.2s ease;
	}

	.social-links a:hover {
		color: var(--primary);
		background: var(--border); /* Subtle background highlight on hover */
		transform: translateY(-2px); /* Slight lift effect */
	}

	/* Bottom Copyright */
	.footer-bottom {
		max-width: 1000px;
		margin: 3rem auto 0;
		padding-top: 1.5rem;
		border-top: 1px dashed var(--border);
		text-align: center;
		color: var(--muted-foreground);
		font-size: 0.85rem;
	}

	/* Mobile Responsiveness */
	@media (max-width: 640px) {
		.footer-container {
			flex-direction: column;
			align-items: flex-start;
		}

		.nav-section {
			align-items: flex-start;
			width: 100%;
		}
	}
</style>
