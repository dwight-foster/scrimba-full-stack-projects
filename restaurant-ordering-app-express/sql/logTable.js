import { getDBConnection } from "../db/db.js";


async function logTable(name) {
    const db = await getDBConnection();
    try {
        const table = await db.all(`SELECT * FROM ${name}`);
        console.table(table);
    } catch (err) {
        console.error('Error fetching table:', err.message);
    } finally {
        await db.close();
    }

}

logTable('users');