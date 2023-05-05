<script lang="ts">
	export let data;
</script>

<div class="container h-full mx-auto flex justify-left">
	<ul>
		{#each data.posts as post}
			<li>
				<a href={"blog/" + post.slug} data-sveltekit-preload-data>
					{post.title}
				</a>
				<p>
					{post.date}
				</p>
			</li>
		{/each}
	</ul>
</div>
