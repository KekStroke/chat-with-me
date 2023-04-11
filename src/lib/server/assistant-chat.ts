import { OpenAIEmbeddings } from 'langchain/embeddings';
import { PineconeStore } from 'langchain/vectorstores';
import { makeChain } from './utils/makechain';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from './config/pinecone';
import { pinecone } from './utils/pinecone-client';
import { error } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import type { Message } from '$lib/types/types';

export async function run(question: string, history : Message[]) {
	if (!question) {
		throw error(400, 'No questin in the request');
	}
	// OpenAI recommends replacing newlines with spaces for best results
	const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

	const index = pinecone.Index(PINECONE_INDEX_NAME);

    
	/* create vectorstore*/
	const vectorStore = await PineconeStore.fromExistingIndex(
		new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
		{
			pineconeIndex: index,
			textKey: 'text',
			namespace: PINECONE_NAME_SPACE
		}
	);

	// console.log("vectorStore:", vectorStore);

	//create chain
	const chain = makeChain(vectorStore);
    
    // console.log("Chain:", chain);
	try {
		//Ask a question
		const response = await chain.call({
			question: sanitizedQuestion,
			chat_history: history || []
		});

		console.log('Response::', response.text);
		console.log('Sources::', response.sourceDocuments);
		// { sourceDocs: response.sourceDocuments };
	} catch (error) {
		console.log('error', error);
	} finally {
		// sendData('[DONE]');
		// res.end();
	}
}
