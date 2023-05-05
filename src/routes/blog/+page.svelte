<script lang="ts">
	export let data;
</script>

<div class="container h-full mx-auto justify-center">
	<section>
		<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14">
			{#each data.posts as post}
				<a class="card p-4 card-hover" href={'blog/' + post.slug}>
					<li>
						<h2>{post.title}</h2>
						<p>{post.date}</p>
						<p>{post.title}</p>
						<p>{post.description}</p>
					</li>
				</a>
			{/each}
		</ul>
	</section>
</div>
