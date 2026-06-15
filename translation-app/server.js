import express from 'express';
import OpenAI from 'openai';
import 'dotenv/config'

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL
});

const messages = [];

app.post('/api/translate', async (req, res) => {
    const {inputtext, language} = req.body;
    const currMessage = [{
    role: 'system',
    content: `You are a helpful LLM translation assistant. 
            Your job is to take the given text and target language and 
            directly translate it. 
            No need for an intro or conclusion the only thing you should
            give is the translation. The form of the input will be 
            text: <given_text> language: <target_language>
            You should return just the translated text.
            If no translation is possible just say cannot translate.`
    },
    {
        role: 'user',
        content: `text: ${inputtext} language: ${language}`
    }];
    const response = await client.responses.create({
        model: process.env.AI_MODEL,
        input: currMessage
    });
    res.status(200).json({ message: response.output_text});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

