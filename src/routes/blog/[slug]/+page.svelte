<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
</svelte:head>

<article class="">
	<hgroup>
		<h1>{data.metadata.title}</h1>
	</hgroup>
	<svelte:component this={data.content} />
</article>
