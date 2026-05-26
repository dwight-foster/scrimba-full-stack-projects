import PDFDocument from "pdfkit";
import path from 'node:path';
import fs from 'node:fs';

export async function generatePDF () {
    const pathTXT = path.join('data', 'investments.txt');
    const pathPDF = path.join('data', 'investments.pdf')
    try {
        const data = await fs.promises.readFile(pathTXT, 'utf8');
        const doc = new PDFDocument();
        
        doc.pipe(fs.createWriteStream(pathPDF));
        doc
            .fontSize(15)
            .text(data, 100, 100);

        doc.end();
        console.log('here');
    } catch(err) {
        throw new Error(err);
    }

    
}