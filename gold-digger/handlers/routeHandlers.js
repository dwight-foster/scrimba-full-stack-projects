import { getGoldPrice } from '../utils/getGoldPrice.js';
import { parseJSONBody } from '../utils/parseJSONBody.js';
import { investEvents } from '../event/investEvents.js';
import { sendResponse } from '../utils/sendResponse.js';

export async function handleGoldPrice(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');


    setInterval(() => {
        res.write(
            `data: ${JSON.stringify({
                event: 'price-updated',
                price: getGoldPrice()
            })}\n\n`
        );
    }, 2000);
}

export async function handlePost(req, res) {
    try {
        const data = await parseJSONBody(req);
        investEvents.emit('investment-made', data);
        sendResponse(res, 201, 'application/json', JSON.stringify(data));
    } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({error: err}));
    }
}