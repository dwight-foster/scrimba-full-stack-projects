import nodemailermock from 'nodemailer-mock'; 

const transport = nodemailermock.createTransport({});

export async function sendEmail(investment) {
    const {date, investmentAmount, price, goldAmount} = investment;
    const investmentString = `${date}, amount paid: £${investmentAmount}, price per Oz: £${price}, gold sold: ${goldAmount} Oz\n`;
    const emailText = `Here is the details of your purchase: ${investmentString}`;
    
    try {
        const info = await transport.sendMail({
            from: 'sender@example.com',
            to: 'receiver@example.com',
            subject: 'Your Gold Purchase Details',
            text: emailText
        });
        
        console.log(`Success!`, info);
    } catch (err) {
        console.log(err);
    }
}
