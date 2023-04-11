import type { Actions } from '@sveltejs/kit'; // <--Error Module '"@sveltejs/kit"' has no exported member 'Request'.ts(2305)

import * as db from '$lib/server/database.js';
import type { Message } from '$lib/types/types.js';

let currentFolderId: number | null = null;

export const load = async function (): Promise<{ messages: Message[] }> {
	if (currentFolderId === null) return { messages: [] };

	return {
		messages: db.getSerializableHistory() ?? []
	};
};

export const actions = {
	chat: async (event) => {
		const clientAddress = event.getClientAddress();

		const data = await event.request.formData();

		if (currentFolderId === null) {
			currentFolderId = await db.createFolder(clientAddress);
		}

		await db.sendUserMessage(clientAddress, <string>data.get('message'), currentFolderId);
	},

	createFolder: async (event) => {
		const ip = event.getClientAddress();

		// const data = await event.request.formData();
		await db.createFolder(ip);
	},

	selectFolder: async (event) => {
		const clientAddress = event.getClientAddress();

		const data = await event.request.formData();

		currentFolderId = Number(data.get('id'));

		await db.selectFolder(clientAddress, currentFolderId);
	},

	deleteFolder: async (event) => {
		const clientAddress = event.getClientAddress();

		const data = await event.request.formData();

		const deleteFolderId = Number(data.get('id'));

		await db.deleteFolder(clientAddress, deleteFolderId);

		currentFolderId = null;
	},

	renameFolder: async (event) => {
		const clientAddress = event.getClientAddress();

		const data = await event.request.formData();

		console.log(data);
		

		const newName = data.get('newName') as string;
		const renameFolderId = Number(data.get('id'));

		if (newName !== null || newName !== '')
			await db.renameFolder(clientAddress, renameFolderId, newName);
	}
} satisfies Actions;
