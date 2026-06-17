import express from 'express';
import { openai, supabase } from './utils/config.js';
import { findMatch } from './utils/findMatch.js';
import { createEmbedding } from './utils/createEmbedding.js';
import { getChatCompletion } from './utils/getChatCompletion.js';
import { marked } from "marked";


const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());



app.post('/api/query', async (req, res) => {
  const { favoritemovie, movieage, movietype } = req.body;
  const query = `My favorite movie is ${favoritemovie}, I want something ${movieage}, and ${movietype}.`;
  try {
    const embedding = await createEmbedding(query);
    const matches = await findMatch(embedding, 3);
    const completion = await getChatCompletion(matches, query);
    const html = marked.parse(completion);
    res.status(200).json({message: html});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
