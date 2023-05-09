<script lang="ts">
	import { goto } from '$app/navigation';
	import { head_selector } from 'svelte/internal';

	export let data;
	const _cropStyle = 'object-cover object-top';

	const categoryUrl = (category: string) => {
		return `blog?category=${category}`;
	};

	const postUrl = (slug: string) => {
		return `blog/${slug}`;
	};
</script>

<div class="container h-full mx-auto flex flex-col w-full my-auto mt-4">
	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		{#each data.posts as post}
			<div class="card card-hover flex flex-col overflow-hidden h-[500px]">
				{#if post.headerImage !== undefined}
					<header>
						<img class="w-full aspect-[21/9]" src={post.headerImage} alt="" />
					</header>
				{/if}
				<div class="p-4 space-y-4">
					{#each post.categories as category}
						<a class="unstyled" href={categoryUrl(category)}>
							<h4 class="text-sm text-gray-500">{category}</h4>
						</a>
					{/each}
					<h1>
						<a href={postUrl(post.slug)}>{post.title}</a>
					</h1>
					<p>{post.date}</p>
					<p>{post.title}</p>
					<p>{post.description}</p>
				</div>
			</div>
		{/each}
	</section>
</div>
