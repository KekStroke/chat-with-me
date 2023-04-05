import type { Actions } from "@sveltejs/kit"; // <--Error Module '"@sveltejs/kit"' has no exported member 'Request'.ts(2305)

import * as db from '$lib/server/database.js';

export function load() {
	return {
		messages: db.getSerializableMessages() ?? []
	};
}


export const actions = {
	chat: async ({ request }) => {
		const data = await request.formData();
        await db.sendUserMessage(data.get('message') as string)
	}
} satisfies Actions;