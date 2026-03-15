<script>
	import { onMount } from 'svelte';
    import Moon from '@lucide/svelte/icons/moon'
    import Sun from '@lucide/svelte/icons/sun'


    let { size=24 } = $props();
	let theme = 'light';

	onMount(() => {
        theme = localStorage.getItem('theme') || 'light';

	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>
<button onclick={toggleTheme} aria-label="Toggle Theme" class="theme-toggle">
    <div style={`width: ${size}px; height: ${size}px;`} class="icon-container">
        <div class="sun">
            <Sun {size} />
        </div>
        <div class="moon">
            <Moon {size} />
        </div>
    </div>
</button>

<style>
    .theme-toggle {
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        cursor: pointer;
        background: var(--bg-card);
        color: var(--text-primary);
        overflow: hidden;
        border:none;
    }
    .theme-toggle:hover{
        color: var(--primary);

    }

    .icon-container {
        position: relative;
    }

    .sun, .moon {
        position: absolute;
        top: 0;
        left: 0;
        /* over shoot curve for pop effect  https://cubic-bezier.com/#0,1.3,.84,1.15 */
        transition: transform 0.4s cubic-bezier(0,1.3,.84,1.15), opacity 0.3s ease;
    }

    :global([data-theme='light']) .sun {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }
    :global([data-theme='light']) .moon {
        opacity: 0;
        transform: rotate(180deg) scale(0);
    }

    :global([data-theme='dark']) .sun {
        opacity: 0;
        transform: rotate(-180deg) scale(0);
    }
    :global([data-theme='dark']) .moon {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }

</style>