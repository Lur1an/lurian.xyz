<script lang="ts">
	import '../app.postcss';

	import { AppShell, AppBar, LightSwitch, Avatar, Modal } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/components/NavBar.svelte';
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<Modal />
<AppShell gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<Avatar src="/lurian_logo.png" class="mr-4" />
				<strong class="text-xl">lurian.xyz</strong>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<NavBar />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ul class="flex items-center space-x-8 mr-4">
					<li>
						<a class="" href="https://www.github.com/lur1an">
							<Icon data={faGithub} scale={2} />
						</a>
					</li>
					<li>
						<LightSwitch class="scale-[1.5]" />
					</li>
				</ul>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
