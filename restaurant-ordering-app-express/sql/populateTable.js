import { getDBConnection } from "../db/db.js";

async function populateTable() {
    const db = await getDBConnection();

    try {
        await db.run(
            `INSERT INTO foods (name, ingredients, price, emoji)
             VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
            [
                'Pizza', 'pepperoni, mushroom, mozzarella', 14, '🍕',
                'Hamburger', 'beef, cheese, lettuce', 12, '🍔',
                'Beer', 'grain, hops, yeast, water', 12, '🍺'
            ]
        );
        
    } catch (err) {
        console.error('Error inserting into databse: ', err.message);
    } finally {
        await db.close();
    }
    
}

populateTable();