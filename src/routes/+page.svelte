<script lang="ts">
	import type { Message } from '$lib/types/types';

	import { newMessage } from '$lib/stores';

	const scrollToBottom = async (node: HTMLElement): Promise<void> => {
		node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' });
	};

	let messages: Message[] = [
		{ sender: 'user', message: 'Hello' },
		{ sender: 'model', message: 'Hello' },
		{ sender: 'user', message: 'How are you doing?' },
		{ sender: 'model', message: 'I am doing fine' }
	];

	let container: HTMLElement;
	$: if ($newMessage.message !== '') {
		messages = [...messages, $newMessage];
		if (container) scrollToBottom(container);
	}
</script>

<div class="container max-w-none bg-surface-800 min-h-screen relative pt-4 pb-36 overflow-y-scroll" bind:this={container}>
	{#each messages as { sender, message }}
		<p class="py-6 px-10 break-words" class:bg-surface-700={sender == 'model'}>
			{message}
		</p>
	{:else}
		<!-- empty list -->
	{/each}
</div>