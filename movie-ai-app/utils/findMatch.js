import { openai, supabase } from './config.js';


export async function findMatch(embedding, num) {
    try {
        const { data } = await supabase.rpc('match_movies', {
            query_embedding: embedding,
            match_threshold: 0.7,
            match_count: num
        });

        const match = data.map(obj => obj.content).join('\n');
        return match;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }

}