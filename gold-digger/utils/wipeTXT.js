import path from 'node:path';
import fs from 'node:fs/promises';


export async function wipeTXT () {
    try {
        const pathTXT = path.join('data', 'investments.txt');

        fs.writeFile(pathTXT, '');

    } catch (err) {
        throw new Error(err);
    }

}