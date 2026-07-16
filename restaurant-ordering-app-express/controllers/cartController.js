import { getDBConnection } from "../db/db.js";

export async function addToCart(req, res) {
    const db = await getDBConnection();
    console.log(req.body.foodId);
    const foodId = parseInt(req.body.foodId, 10);
    if (isNaN(foodId)) {
        return res.status(400).json({ error: 'Invalid food ID'});
    }
    try {
        const food = await db.get('SELECT * FROM foods WHERE id = ?', [foodId]);
        if (food) {
            const existing = await db.get('SELECT * FROM cart WHERE food_id = ? AND user_id = ?', [foodId, 1]);
            if (existing) {
                await db.run('UPDATE cart SET quantity = quantity + 1 WHERE id = ?', [existing.id])
            } else {
                await db.run('INSERT INTO cart (food_id, user_id, quantity) VALUES (?, ?, ?)', [foodId, 1, 1]);
            }
            return res.json({ message: 'Added to cart' });
        } else {
            return res.status(400).json({ error: 'Invalid food ID'});
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function deleteOneItem(req, res) {
    const db = await getDBConnection();

    const foodId = parseInt(req.body.foodId, 10);
    if (isNaN(foodId)) {
        return res.status(400).json({ error: 'Invalid food ID'});
    }

    const existing = await db.get('SELECT * FROM cart WHERE food_id = ? AND user_id = ?', [foodId, 1]);
    if (!existing) {
        return res.status(400).json({ error: 'Food not in the cart' });
    }

    if (existing.quantity > 1) {
        await db.run('UPDATE cart SET quantity = quantity - 1 WHERE id = ?', [existing.id]);
    } else {
        await db.run('DELETE FROM cart WHERE id = ?', [existing.id]);
    }
    return res.json({ message: 'Subtracted from cart' });
}

export async function deleteAllItems(req, res) {
    const db = await getDBConnection();

    const foodId = parseInt(req.body.foodId, 10);
    if (isNaN(foodId)) {
        return res.status(400).json({ error: 'Invalid food ID'});
    }

    const existing = await db.get('SELECT * FROM cart WHERE food_id = ? AND user_id = ?', [foodId, 1]);
    if (!existing) {
        return res.status(400).json({ error: 'Food not in the cart' });
    }

    await db.run('DELETE FROM cart WHERE id = ?', [existing.id]);
    
    return res.json({ message: 'Removed from cart' });
}


export async function getAll(req, res) {
    const db = await getDBConnection();

    const items = await db.all(`
        SELECT F.id, F.name, c.quantity, (F.price * c.quantity) as total_amnt FROM cart c
        JOIN foods F ON c.food_id = F.id WHERE user_id = ?
        `, [1]);
    res.json({ items: items });
}

export async function removeAllItems(req, res) {
    const db = await getDBConnection();
    await db.run('DELETE FROM cart WHERE user_id = ?', [1]);
    res.json({ message: 'Cart cleared' });
}