import { openai, supabase } from './config.js';

export async function createEmbedding(input) {
    try {
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input 
        });
        return embeddingResponse.data[0].embedding;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}