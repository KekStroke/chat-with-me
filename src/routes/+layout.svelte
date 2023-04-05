<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Need this to access current url
	import { page } from '$app/stores';

	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import FoldersNavigation from '$lib/Folders/FoldersNavigation.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Header from '$lib/components/Header.svelte';

	// Only show side bar on the main page
	$: classesSidebar = $page.url.pathname !== '/' ? 'w-0' : 'w-0 lg:w-[320px]';

	let container;
</script>

<Drawer>
	<FoldersNavigation />
</Drawer>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-900 {classesSidebar}">
	<!-- Left Sidebar Slot -->
	<svelte:fragment slot="sidebarLeft">
		<FoldersNavigation />
	</svelte:fragment>
	<div
	class="min-h-screen relative overflow-y-scroll"
	bind:this={container}
	>
	<!-- Page Route Content -->
	<slot />
	<TextInput class='px-10 py-8 absolute bottom-0 w-full'></TextInput>

</div>
</AppShell>
