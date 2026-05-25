import path from 'node:path';
import fs from 'node:fs/promises';


export async function saveInvestments (investment) {
    try {
        const pathTXT = path.join('data', 'investments.txt');
        let data = await fs.readFile(pathTXT, 'utf8');
        const {date, investmentAmount, price, goldAmount} = investment;
        const investmentString = `${date}, amount paid: £${investmentAmount}, price per Oz: £${price}, gold sold: ${goldAmount} Oz\n`;
        data += investmentString;
        fs.writeFile(pathTXT, data);

    } catch (err) {
        throw new Error(err);
    }

}