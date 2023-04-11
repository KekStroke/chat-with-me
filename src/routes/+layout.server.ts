import * as db from '$lib/server/database.js';
import type { LayoutServerLoadEvent } from './$types';

export const load = async function (event : LayoutServerLoadEvent): Promise<{ folders: { _id: number; name: string }[] }> {
	const clientAddress = event.getClientAddress();

	const folders = (await db.getFolders(clientAddress)) ?? [];

	return {
		folders: folders
		// messages: db.getSerializableHistory() ?? []
	};
};