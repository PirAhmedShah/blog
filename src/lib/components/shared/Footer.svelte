<script lang="ts">
	import Github from '@lucide/svelte/icons/github';
	import Linkedin from '@lucide/svelte/icons/linkedin';
	import Mail from '@lucide/svelte/icons/mail';
	import Logo from '../ui/Logo.svelte';
</script>

<footer class="site-footer">
	<div class="footer-container">
		<div class="brand-section">
			<Logo width=48 height=48/>
			<div class="brand-text">
				<span class="name">Pir Ahmed Shah</span>
				<span class="tagline">21yo Student @ FAST-NUCES</span>
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

				<a
					href="https://linkedin.com/in/pirahmedshah"
					target="_blank"
					rel="noreferrer"
					aria-label="LinkedIn"
				>
					<Linkedin size={20} />
				</a>

				<!-- X (Twitter) -->
				<a
					href="https://x.com/PirAhmedShah_"
					target="_blank"
					rel="noreferrer"
					aria-label="X (Twitter)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
					</svg>
				</a>

				<!-- Instagram -->
				<a
					href="https://instagram.com/pir.ahmed_shah"
					target="_blank"
					rel="noreferrer"
					aria-label="Instagram"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
						<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
						<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
					</svg>
				</a>

				<!-- Reddit -->
				<a
					href="https://reddit.com/user/BurgerWithoutBun"
					target="_blank"
					rel="noreferrer"
					aria-label="Reddit"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
					</svg>
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

	.brand-section {
		display: flex;
		align-items: center;
		gap: 1rem;
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
		background: var(--border);
		transform: translateY(-2px);
	}

	.footer-bottom {
		max-width: 1000px;
		margin: 3rem auto 0;
		padding-top: 1.5rem;
		border-top: 1px dashed var(--border);
		text-align: center;
		color: var(--muted-foreground);
		font-size: 0.85rem;
	}

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
