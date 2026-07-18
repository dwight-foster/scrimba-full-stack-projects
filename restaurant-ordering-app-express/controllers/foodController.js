import { getDBConnection } from "../db/db.js";

export async function getFood(req, res) {
    const db = await getDBConnection();

    const foods = await db.all('SELECT * FROM foods');

    res.status(200).json({ items: foods });
}