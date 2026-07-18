import { getDBConnection } from "../db/db.js";

export async function getCurrentUser(req, res) {
    const userId = req.session.userId;
    const db = await getDBConnection();
    if (userId) {
        const user = await db.get('SELECT name FROM users WHERE id = ?', [userId]);
        if (!user) {
            return res.status(500).json({ error: 'Unable to retrieve current user' });
        } 
        return res.status(200).json({ isLoggedIn: true, name: user.name });
    } else {
        return res.json({ isLoggedIn: false })
    }
}