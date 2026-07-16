import { addToCart, getAll, deleteAllItems, deleteOneItem, removeAllItems } from "../controllers/cartController.js";
import express from 'express';

export const cartRouter = express.Router();


cartRouter.post('/add', addToCart);
cartRouter.post('/subtract', deleteOneItem);
cartRouter.post('/remove', deleteAllItems);
cartRouter.delete('/clear', removeAllItems);
cartRouter.get('/all', getAll);