import { sortAndDeduplicateDiagnostics } from 'typescript';
import { openai, supabase } from './config.js';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { readFile } from 'fs/promises';


async function splitDocuments (document) {
    try {
        const text = await readFile(document, 'utf-8');
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 350,
            chunkOverlap: 30
        });
        const output = await splitter.createDocuments([text]);
        return output; 
    } catch(e) {
        throw new Error(e);
    }

}

async function createAndStoreEmbeddings() {
    try {
        const chunkData = await splitDocuments('movies.txt');
        const data = await Promise.all(
            chunkData.map(async (chunk) => {
                const text = chunk.pageContent;
                const embeddingResponse = await openai.embeddings.create({
                    model: 'text-embedding-ada-002',
                    input: text
                });
                return {
                    content: text,
                    embedding: embeddingResponse.data[0].embedding
                }
            }));
        const { error } = await supabase.from('movies').insert(data);
        if (error) {
            throw new Error(error);
        }
    } catch(e) {
        throw new Error(e);
    }

}

createAndStoreEmbeddings();