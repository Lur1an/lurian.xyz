<script lang="ts">
	import { page } from '$app/stores';
	import { faBook, faGamepad, faHippo, faHouse, faLightbulb } from '@fortawesome/free-solid-svg-icons';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	const links = [
		{ href: '/', text: 'Home', icon: faHouse },
		{ href: '/blog', text: 'Blog', icon: faBook },
		{ href: '/playground', text: 'Playground', icon: faGamepad },
		{ href: '/memes', text: 'Memes', icon: faHippo },
		{ href: '/about', text: 'About', icon: faLightbulb }
	];

	$: classesActive = (href: string) => (href === $page.url.pathname ? 'variant-ghost-primary' : '');
</script>

<nav class="flex flex-row list-nav justify-center">
	{#each links as link}
		<a href={link.href} class={classesActive(link.href)}>
            <Icon data={link.icon} class="mr-2" />
            {link.text}
        </a>
	{/each}
</nav>
