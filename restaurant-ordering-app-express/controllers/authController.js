import validator from 'validator'
import { getDBConnection } from '../db/db.js'
import bcrypt from 'bcryptjs'


export async function  loginUser(req, res) {
    let { username, password } = req.body;
    username = username.trim();
    password = password.trim();
    const db = await getDBConnection();

    if (!username || !password) {
        res.status(400).json({ error: 'Password and username required.' });
    }

    const user = await db.get('SELECT password, id FROM users WHERE username = ?', [username]);
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.userId = user.id;
    return res.json({ message: 'Logged in' });
}

export async function registerUser(req, res) {
    let { name, email, username, password} = req.body;
    if (!name || !email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    name = name.trim();
    email = email.trim();
    username = username.trim();

    if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {

        return res.status(400).json(
        { error: 'Username must be 1–20 characters, using letters, numbers, _ or -.' }
        );
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Email must be valid. '});
    }

    const db = await getDBConnection();

    const existing = await db.get('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);

    if (existing) {
        return res.status(400).json({ error: 'That email or username is already in use. '});
    } 

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.run('INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)', [name, email, username, hashed]);

    req.session.userId = result.lastID;

    res.status(200).json({ message: 'User registered '});

}

export async function logoutUser(req, res) {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error logging out: ", err);
                return res.status(500).json({ error: err });

            } 
            res.status(200).json({ message: 'Successfully logged out' });
        })
    } else {
        res.end();
    }
} 