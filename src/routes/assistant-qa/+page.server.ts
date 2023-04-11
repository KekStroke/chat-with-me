import * as ingest from '$lib/server/ingest-data';
import { run } from '$lib/server/assistant-chat.js';

export const actions = {
	chat: async (event) => {
		
		const data = await event.request.formData();
		
		const question = <string>data.get('message');
		
		console.log('Answering question...', question);

		await run(question, []);

		console.log('Finished answering.');
		
	},
	ingest: async (event) => {
		await ingest.run();
	}
};
// Добрый день, расскажите мне про университет
