<script lang="ts">
	import { goto } from '$app/navigation';
	import { Autocomplete, InputChip, type AutocompleteOption, type PopupSettings } from '@skeletonlabs/skeleton';
	import { head_selector } from 'svelte/internal';

	export let data;
	const categoryUrl = (category: string) => {
		return `blog?category=${category}`;
	};

	const postUrl = (slug: string) => {
		return `blog/${slug}`;
	};
    let searchParam: null | string = null;
    $: filteredPosts = data.posts.filter((post) => {
        if (searchParam === null) return true;
        return post.title.toLowerCase().includes(searchParam.toLowerCase());
    });

</script>

<div class="container h-full mx-auto flex flex-col w-full mt-12 space-y-8">
	<input
		class="input !border-warning-500 !border-opacity-50"
		type="search"
		name="autocomplete-search"
		bind:value={searchParam}
		placeholder="Search..."
	/>
	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		{#each filteredPosts as post}
			<article class="card card-hover flex flex-col overflow-hidden">
				{#if post.headerImage !== undefined}
					<a class="unstyled" href={postUrl(post.slug)}>
						<img class="w-full aspect-[21/9]" src={post.headerImage} alt="" />
					</a>
				{:else}
					<header>
						<img class="w-full aspect-[21/9]" src="/default.jpg" alt="" />
					</header>
				{/if}
				<div class="p-4 space-y-4">
					<div class="flex space-x-2 justify-evenly">
						{#each post.categories as category}
							<a class="unstyled" href={categoryUrl(category)}>
								<h4 class="text-sm text-warning-500 hover:text-warning-700">{category}</h4>
							</a>
						{/each}
					</div>
					<a class="unstyled" href={postUrl(post.slug)}>
						<h1>{post.title}</h1>
					</a>
					<p>{post.description}</p>
					<p>{post.date}</p>
				</div>
			</article>
		{/each}
	</section>
</div>
