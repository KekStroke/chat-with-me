import { PINECONE_INDEX_NAME } from '$env/static/private';


/**
 * Change the namespace to the namespace on Pinecone you'd like to store your embeddings.
 */

if (!PINECONE_INDEX_NAME || PINECONE_INDEX_NAME==='') {
  throw new Error('Missing Pinecone index name in .env file');
}

const PINECONE_NAME_SPACE = 'networks'; //namespace is optional for your vectors

export { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE };