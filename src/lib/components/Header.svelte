<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
    import type { DrawerSettings } from '@skeletonlabs/skeleton';


	// Drawer
	const drawerSettings: DrawerSettings = {
		id: '1',
		// Provide your property overrides:
		bgDrawer: 'bg-surface-900',
		width: 'w-[350px]',
		height: 'h-full'
	};
	function drawerOpen(): void {
		drawerStore.open(drawerSettings);
	}
</script>

<header class='{$$props.class} w-full'>

    <!-- App Bar -->
    <AppBar>
        <svelte:fragment slot="lead">
            <div class="flex items-center">
                <button class="lg:hidden btn btn-sm mr-4" on:click|stopPropagation={drawerOpen}>
                    <span>
					<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
                        <rect width="100" height="20" />
						<rect y="30" width="100" height="20" />
						<rect y="60" width="100" height="20" />
					</svg>
				</span>
			</button>
			<strong class="text-xl uppercase">Skeleton</strong>
		</div>
	</svelte:fragment>
    
	<svelte:fragment slot="trail">
		<a
			class="btn btn-sm variant-ghost-surface"
			href="https://discord.gg/EXqV7W8MtY"
			target="_blank"
			rel="noreferrer"
            >
			Discord
		</a>
		<a
        class="btn btn-sm variant-ghost-surface"
			href="https://twitter.com/SkeletonUI"
			target="_blank"
			rel="noreferrer"
            >
			Twitter
		</a>
		<a
        class="btn btn-sm variant-ghost-surface"
        href="https://github.com/skeletonlabs/skeleton"
        target="_blank"
        rel="noreferrer"
		>
        GitHub
    </a>
</svelte:fragment>
</AppBar>

</header>