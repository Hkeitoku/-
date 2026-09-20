import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const files={'/':'dist/index.html','/index.html':'dist/index.html','/style.css':'dist/style.css','/app.js':'dist/app.js'};
const mime={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8'};
http.createServer(async(req,res)=>{const file=files[new URL(req.url,'http://localhost').pathname];if(!file){res.writeHead(404);return res.end('Not found')}try{const body=await readFile(fileURLToPath(new URL(file,import.meta.url)));res.writeHead(200,{'Content-Type':mime[file.split('.').pop()],'Cache-Control':'no-store'});res.end(body)}catch{res.writeHead(500);res.end('Unable to load')}}).listen(4317,'127.0.0.1',()=>console.log('http://127.0.0.1:4317'));
