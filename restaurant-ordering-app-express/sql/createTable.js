import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'


async function createTable() {
    const db = await open({
        filename: path.join('database.db'),
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        ingredients TEXT NOT NULL,
        price INTEGER NOT NULL,
        emoji TEXT NOT NULL
        );
        `);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
        );
        `);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        food_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (food_id) REFERENCES foods (id), 
        FOREIGN KEY (user_id) REFERENCES users (id)
        );
        `);
    await db.close();
    console.log('table created');
}

await createTable();