import http from 'node:http';
import { serveStatic } from './utils/serveStatic.js';
import { handleGoldPrice, handlePost } from './handlers/routeHandlers.js';
import { investEvents } from './event/investEvents.js';

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    if (!req.url.startsWith("/api")) {
        return await serveStatic(req, res, __dirname);
    } else if (req.url === "/api/price") {
        return await handleGoldPrice(req, res);
    } else if (req.url === "/api") {
        if (req.method === 'POST') {
            return await handlePost(req, res);
        }
    }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));