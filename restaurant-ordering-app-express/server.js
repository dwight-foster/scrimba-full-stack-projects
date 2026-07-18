import express from 'express';
import session from 'express-session'
import { cartRouter } from './routes/cart.js';
import { authRouter } from './routes/auth.js';
import { meRouter } from './routes/me.js';
import { foodRouter } from './routes/food.js';
import 'dotenv/config';

const app = express();
const PORT = 8000;
const secret = process.env.SPIRAL_SESSION_SECRET || 'jellyfish-baskingshark'

app.use(express.json());

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}))

app.use(express.static('public'));
app.use('/api/cart', cartRouter);
app.use('/api/auth/me', meRouter);
app.use('/api/auth', authRouter);
app.use('/api/food', foodRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}).on('error', (err) => {
    console.log('Failed to start server: ', err);
});