import express from 'express';
import session from 'express-session'
import { cartRouter } from './routes/cart.js';

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(express.static('public'));
app.use('/api/cart', cartRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}).on('error', (err) => {
    console.log('Failed to start server: ', err);
});