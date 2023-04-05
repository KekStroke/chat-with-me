import { ChatOpenAI } from 'langchain/chat_models';
import { AIChatMessage, HumanChatMessage } from 'langchain/schema';

import { OPENAI_API_KEY } from '$env/static/private';
import { getMessagesHistory } from './database';
// import { CallbackManager } from 'langchain/dist/callbacks';

const chatModel = new ChatOpenAI({
	openAIApiKey: OPENAI_API_KEY,
	temperature: 1,
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



export async function chat(message: string) : Promise<AIChatMessage> {
    const messageHistory = getMessagesHistory()
    messageHistory.push(new HumanChatMessage(message))
	const response = await chatModel.call(messageHistory);
	return response;
}
