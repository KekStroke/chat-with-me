<script lang="ts">
	import { newMessage } from '$lib/stores';

	import Icon from '$lib/components/Icon.svelte';
	import type { Message } from '$lib/types/types';

	let form: HTMLFormElement;

	function handleSubmit(e: SubmitEvent): void {
		console.log('sending...', e);
		// if ($newMessage.sender == 'user') return;

		const target = e.target as HTMLFormElement;
		const formData = new FormData(target);
		const messageString = formData.get('message') as string;

		if (messageString === '') return;

		const message = {
			sender: 'user',
			message: messageString
		} as Message;

		$newMessage = message;

		target.reset();

		form.scrollIntoView();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.repeat) return;

		switch (e.key) {
			case 'Enter':
				if (e.ctrlKey) {
					const newEvent = new Event('submit', { cancelable: true });
					(<HTMLFormElement>e.target).form.dispatchEvent(newEvent);
					break;
				}
		}
	}
</script>

<footer class="{$$props.class}">
	<form class="relative" on:submit|preventDefault={handleSubmit} bind:this={form}>
		<textarea
			class="textarea resize-none"
			name="message"
			rows="4"
			placeholder="Send a message..."
			on:keydown={handleKeyDown}
		/>
		<button class="btn p-0 absolute bottom-2 fill-sur right-2 opa">
			<span class="badge-icon w-8 h-8 variant-filled-surface">
				<Icon name="send" class="fill-surface-300" />
			</span>
		</button>
	</form>
</footer>