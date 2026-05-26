import http from 'node:http';
import { serveStatic } from './utils/serveStatic.js';
import { handleGoldPrice, handlePost, handleGenerate } from './handlers/routeHandlers.js';
import { wipeTXT } from './utils/wipeTXT.js';

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    if (!req.url.startsWith("/api")) {
        await wipeTXT();
        return await serveStatic(req, res, __dirname);
    } else if (req.url === "/api/price") {
        return await handleGoldPrice(req, res);
    } else if (req.url === "/api") {
        if (req.method === 'POST') {
            return await handlePost(req, res);
        }
    } else if (req.url === '/api/generate') {
        if (req.method === 'POST') {
            return await handleGenerate(req, res);
        }
    }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));