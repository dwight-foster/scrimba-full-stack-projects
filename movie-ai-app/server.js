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
  const {time, prefs} = req.body;
  const query = `They have ${time} time` + prefs.map((pref, index) => {
    const {favoritemovie, era, mood, filmperson} = pref;
    return `Person ${index+1}'s favorite movie is ${favoritemovie}, they want something ${era}, and ${mood}. They would want to be stranded on an island with ${filmperson}.`
  }).join('\n');
  try {
    const embedding = await createEmbedding(query);
    const matches = await findMatch(embedding, 3);
    const completion = await getChatCompletion(matches, query);
    const { movies } = JSON.parse(completion);
    const html = movies.map((movie) => {
      const { name, description } = movie;
      return { name: name, description: marked.parse(description) }
    });
    // const html = marked.parse(completion);
    res.status(200).json({message: JSON.stringify(html)});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
