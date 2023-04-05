<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}

	const folders = ['Folder 1 adfasfsadfasdfsdfsafdsfsdfsdssdfsdfsdfsd', 'Folder 2'];
</script>

<nav class="list-nav p-4 w-full">
	<ul class="flex flex-col gap-2">
		<li>
			<button class="btn w-full variant-ghost">Create Folder!</button>
		</li>
		{#each folders as folder}
			<li>
				<button
					class="btn w-full break-words whitespace-nowrap overflow-hidden justify-start"
					on:click={drawerClose}><span class="folder-name block w-full text-left">{folder}</span></button
				>
			</li>
		{:else}
			<li><p>You don't have any folders yet!</p></li>
		{/each}
	</ul>
</nav>

<style>
	.folder-name {
		mask-image: linear-gradient(to left, transparent 1%, black 10%);
	}
</style>
