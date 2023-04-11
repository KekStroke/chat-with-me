<script lang="ts">
	import { newMessage } from '$lib/stores';
	import type { Message } from '$lib/types/types';

	const scrollToBottom = async (node: HTMLElement): Promise<void> => {
		node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' });
	};

	export let data;

	let messages: Message[] = [];

	let container: HTMLElement;
	$: if ($newMessage.text !== '') {
		messages = [...messages, $newMessage];
		if (container) scrollToBottom(container);
	}

	$: messages = data.messages;
</script>

<div
	class="container max-w-none bg-surface-800 min-h-screen relative pt-4 pb-36 overflow-y-scroll"
	bind:this={container}
>
	{#each messages as message}
		<p class="py-6 px-10 break-words" class:bg-surface-700={message.role == 'ai'}>
			{@html message.text.replaceAll('\n', '<br>')}
		</p>
	{:else}
		<!--  -->
	{/each}
</div>
