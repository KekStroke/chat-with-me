<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '$lib/components/Icon.svelte';
	import type { Folder } from '$lib/types/types';
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}

	function handleSelectFolder(e: Event) {
		const formData = new FormData(e.target as HTMLFormElement);
		selectedFolder = Number(formData.get('id'));
	}

	function handleRename(e: Event, folderId: number) {
		changingFolderId = folderId;
	}

	function handleSubmitRenamed(e: Event) {
		changingFolderId = null;
	}

	let changingFolderId: null | number = null;
	let selectedFolder: null | number = null;

	export let folders: { _id: number; name: string }[] = [];
</script>

<nav class="list-nav p-4 w-full">
	<ul class="flex flex-col gap-2">
		<li>
			<form method="POST" action="?/createFolder">
				<button class="btn w-full variant-ghost">Create Folder!</button>
			</form>
		</li>
		{#each folders as folder (folder._id)}
			<li class="relative">
				{#if changingFolderId === folder._id}
					<form method="POST" action="?/renameFolder" class="flex">
						<input type="hidden" name="id" value={folder._id} />
						<input
							type="text"
							class="input block text-left"
							placeholder="new folder name"
							name="newName"
							autocomplete="off"
						/>
						<button
							class="btn h-full aspect-square break-words whitespace-nowrap overflow-hidden justify-start {selectedFolder ===
							folder._id
								? 'bg-surface-500/30'
								: ''}"><Icon name="pencil" class="fill-surface-300" /></button
						>
					</form>
				{:else}
					<form method="POST" action="?/selectFolder" on:submit={handleSelectFolder} use:enhance>
						<input type="hidden" name="id" value={folder._id} />
						<button
							class="btn w-full break-words whitespace-nowrap overflow-hidden justify-start {selectedFolder ===
							folder._id
								? 'bg-surface-500/30'
								: ''}"
							on:click={drawerClose}
							><span class="folder-name block w-full text-left">{folder.name}</span></button
						>
					</form>
					<div class="absolute right-0 top-0 h-full my-auto mx-0 flex flex-row">
						<button
							class="btn w-full h-full break-words whitespace-nowrap overflow-hidden justify-start {selectedFolder ===
							folder._id
								? 'bg-surface-500/30'
								: ''}"
							on:click={drawerClose}
							on:click|stopPropagation|preventDefault={(e) => handleRename(e, folder._id)}
							><Icon name="pencil" class="fill-surface-300" /></button
						>
						<form method="POST" action="?/deleteFolder" on:submit={handleSelectFolder} use:enhance>
							<input type="hidden" name="id" value={folder._id} />
							<button
								class="btn w-full h-full break-words whitespace-nowrap overflow-hidden justify-start {selectedFolder ===
								folder._id
									? 'bg-surface-500/30'
									: ''}"
								on:click={drawerClose}><Icon name="trash" class="fill-surface-300" /></button
							>
						</form>
					</div>
				{/if}
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
