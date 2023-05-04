<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppShell, AppBar, LightSwitch, AppRailTile, Avatar } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<!-- App Shell -->
<AppShell gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="header">
		<!-- Top Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<Avatar src="/lurian_logo.png" class="mr-4"/>
				<strong class="text-xl">lurian.dev</strong>
			</svelte:fragment>
			<NavBar />
			<svelte:fragment slot="trail">
				<a class="btn-icon btn-icon-sm hover:variant-soft-primary" href="github.com">
					<i class="fa-brands fa-discord text-lg" />
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<!-- --- -->
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
