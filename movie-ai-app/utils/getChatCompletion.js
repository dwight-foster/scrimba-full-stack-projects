import { openai, supabase } from './config.js';
import { movieSchema } from './movieSchema.js';


export async function getChatCompletion(text, query) {
    try {
        const messages = [{
            role: 'system', 
            content: `You are a helpful assistant recommending movies. Given the people's prefences and the context recommend one of the movies. Try to include as many people's
            prefences as you can in the decision but the movie does not need to be perfect for everyone. If there is no 
            relevant movie just say you couldn't find a movie. Do not make something up.
            Classic means pre 2000 and New is after the 2000s.  
            Your answer should look something like this:
            **School of Rock (2009)**

            A fun and stupid movie about a wannabe rocker turned fraud substitute teacher forming a rock band with his students to win the Battle of the Bands
            
            Don't add anything extra. Just the title in bold and description. If there is no good options just say could not find any recommendations in the options provided try again. 
            `
        }];
        messages.push({
            role: 'user',
            content: `Context: ${text} Question: ${query} Can you recommend me a movie?`
        });
        const { choices } = await openai.chat.completions.create({
            model: 'gpt-5.4-nano',
            messages: messages,
            response_format: movieSchema,
        });
        return choices[0].message.content;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }

}