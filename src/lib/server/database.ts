import { chat } from '$lib/server/langchain';
import type { Message } from '$lib/types/types';
import { BaseChatMessage, HumanChatMessage, AIChatMessage, SystemChatMessage } from 'langchain/schema';

import { error } from '@sveltejs/kit';

// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.
const messageHistory: BaseChatMessage[] = [];

export function getSerializableMessages(): Message[] {
	const stringMessages = messageHistory.map((message) => {
		let role : 'human' | 'ai' | 'system';
		if (message instanceof HumanChatMessage) role = 'human'
		else if (message instanceof AIChatMessage) role = 'ai'
		else if (message instanceof SystemChatMessage) role = 'system'
		else throw error(500);
		return {
			'text':message.text,
			'role': role
		}
	});
	// console.log(stringMessages);
	return stringMessages;
}


export function getMessagesHistory(): BaseChatMessage[] {
	return messageHistory;
}

export async function sendUserMessage(messageString: string) {
	const response = await chat(messageString);
	messageHistory.push(response);
}

// export function deleteMessage(userid, todoid) {
// 	const todos = db.get(userid);
// 	const index = todos.findIndex((todo) => todo.id === todoid);

// 	if (index !== -1) {
// 		todos.splice(index, 1);
// 	}
// }
