import { chat, getChatHistory, setupModel } from '$lib/server/langchain';
import type { Folder, Message } from '$lib/types/types';
import { HumanChatMessage, AIChatMessage, SystemChatMessage } from 'langchain/schema';

import { error } from '@sveltejs/kit';
import { users } from '$db/users';

export async function getFolders(clientAddress: string): Promise<{ _id: number; name: string }[]> {
	const user = await users.findOne({ address: clientAddress });

	let folders = user?.folders;

	if (!(folders instanceof Array)) {
		await clearFolders(clientAddress);
		const user = await users.findOne({ address: clientAddress });
		folders = user?.folders;
	}

	return (
		folders.map((folder: Folder) => {
			return {
				_id: folder._id,
				name: folder.name
			};
		}) || []
	);
}

async function clearFolders(clientAddress: string) {
	await users.updateOne(
		{ address: clientAddress },
		{
			$set: {
				folders: []
			}
		}
	);
}

export async function createFolder(clientAddress: string): Promise<number> {
	const user = await users.findOne({ address: clientAddress });
	const lastFolderId = user?.folders.at(-1)?._id ?? 0;

	const newFolder: Folder = { name: 'New Folder', _id: lastFolderId + 1, history: [] };

	await users.updateOne({ address: clientAddress }, { $push: { folders: newFolder } });

	return newFolder._id;
}

export async function selectFolder(clientAddress: string, folderId: number) {
	const user = await users.findOne({ address: clientAddress });
	const folder = user?.folders.find((folder: Folder) => folder._id === folderId);

	setupModel(folder.history);
}

export async function deleteFolder(clientAddress: string, folderId: number) {
	console.log('deleting folder...', folderId);

	users.updateOne(
		{ address: clientAddress, 'folders._id': folderId },
		{
			$pull: {
				folders: {
					_id: folderId
				}
			}
		}
	);

	console.log('folder deleted!');
}

export async function renameFolder(clientAddress: string, folderId: number, newName: string) {
	console.log('renaming folder on', newName, folderId);

	const result = await users.updateOne(
		{ address: clientAddress, 'folders._id': folderId },
		{
			$set: {
				'folders.$.name': newName
			}
		}
	);
	console.log(result);
}

export async function saveMessage(clientAddress: string, message: Message, folderId: number) {
	await users.updateOne(
		{ address: clientAddress, 'folders._id': folderId },
		{
			$push: {
				'folders.$.history': {
					text: message.text,
					role: message.role
				}
			}
		}
	);
}

export function getSerializableHistory(): Message[] {
	const stringMessages = getChatHistory()?.map((message) => {
		let role: 'human' | 'ai' | 'system';
		if (message instanceof HumanChatMessage) role = 'human';
		else if (message instanceof AIChatMessage) role = 'ai';
		else if (message instanceof SystemChatMessage) role = 'system';
		else throw error(500);
		return {
			text: message.text,
			role: role
		};
	});
	// await users.updateOne({ address: clientAddress }, { $push: { folders: newFolder } });
	// console.log(stringMessages);
	return stringMessages;
}

export async function sendUserMessage(address: string, messageString: string, folderId: number) {
	const response = await chat(messageString);
	await saveMessage(address, { text: messageString, role: 'human' }, folderId);
	await saveMessage(address, { text: response, role: 'ai' }, folderId);
}
