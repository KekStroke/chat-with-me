import { ChatOpenAI } from 'langchain/chat_models';
import { BufferMemory, ChatMessageHistory } from 'langchain/memory';
import { SerpAPI, Calculator } from 'langchain/tools';
import { AgentExecutor, initializeAgentExecutor } from 'langchain/agents';
import {
	HumanChatMessage,
	SystemChatMessage,
	AIChatMessage,
	BaseChatMessage
} from 'langchain/schema';

import { OPENAI_API_KEY, SERPAPI_API_KEY } from '$env/static/private';
import type { Message } from '$lib/types/types';

import { error } from '@sveltejs/kit';
// import { getMessagesHistory } from './database';

// import { CallbackManager } from 'langchain/dist/callbacks';

const model = new ChatOpenAI({
	openAIApiKey: OPENAI_API_KEY,
	temperature: 1,
	timeout: 5000
	// maxConcurrency: 1,
	// streaming: true,
	// callbackManager: CallbackManager.fromHandlers({
	//     async handleLLMNewToken(token: string) {
	//       console.clear();
	//       s += token;
	//       console.log(s);
	//     },
	//   }),
});

const tools = [new SerpAPI(SERPAPI_API_KEY), new Calculator()];

const executor: AgentExecutor = await initializeAgentExecutor(
	tools,
	model,
	'chat-conversational-react-description',
	true
);

//   executor.memory = memory

// const chain = new ConversationChain({llm:model, memory:memory})

export async function setupModel(history: Message[]) {
	const pastMessages = history.map((message) => {
		const role: 'human' | 'ai' | 'system' = message.role;
		const text: string = message.text;
		if (role === 'human') return new HumanChatMessage(text);
		else if (role === 'ai') return new AIChatMessage(text);
		else if (role === 'system') return new SystemChatMessage(text);
		// else throw error(500);
	});
	// console.log(pastMessages);

	// const memory = new BufferMemory({
	// 	chatHistory: new ChatMessageHistory(pastMessages as BaseChatMessage[])
	// });

	executor.memory = new BufferMemory({
		returnMessages: true,
		memoryKey: 'chat_history',
		inputKey: 'input',
		chatHistory: new ChatMessageHistory(pastMessages as BaseChatMessage[])
	});
	// executor = new AgentExecutor({ agent, tools, memory, verbose: true });

	console.log('Loaded agent.');
}

export async function chat(message: string): Promise<string> {
	try {
		const response = await executor.call({ input: message });
		console.log("Response:", response.output);
		
		return response.output;
	} catch (e) {
		console.log('error:', e);

		throw error(500, 'Response timed out');
	}
}

export function getChatHistory() {
	return (<BufferMemory>executor.memory)?.chatHistory.messages;
}
