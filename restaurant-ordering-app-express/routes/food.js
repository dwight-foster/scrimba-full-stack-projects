import express from 'express';
import { getFood } from '../controllers/foodController.js';

export const foodRouter = express.Router();

foodRouter.get('/all', getFood);