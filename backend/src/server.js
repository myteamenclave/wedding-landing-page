const http = require('http');
const fs = require('fs');
const path = require('path');
const { createWeddingPageHandler, getWeddingPageHandler, updateWeddingPageHandler } = require('./api/wedding-pages');

const frontendRoot = path.resolve(__dirname, '../../frontend');

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  if (req.method === 'POST' && pathname === '/wedding-pages') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const payload = body ? JSON.parse(body) : {};
      const response = createWeddingPageHandler({ method: 'POST', body: payload }, res);
      sendJson(res, response.statusCode, response.body);
    });
    return;
  }

  if (req.method === 'GET' && pathname.startsWith('/wedding-pages/')) {
    const id = pathname.split('/').pop();
    const response = getWeddingPageHandler({ params: { id } }, res);
    sendJson(res, response.statusCode, response.body);
    return;
  }

  if (req.method === 'PATCH' && pathname.startsWith('/wedding-pages/')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const payload = body ? JSON.parse(body) : {};
      const id = pathname.split('/').pop();
      const response = updateWeddingPageHandler({ params: { id }, body: payload }, res);
      sendJson(res, response.statusCode, response.body);
    });
    return;
  }

  if (pathname === '/' || pathname === '/index.html') {
    sendFile(res, path.join(frontendRoot, 'index.html'), 'text/html');
    return;
  }

  if (pathname === '/wedding-page.html') {
    sendFile(res, path.join(frontendRoot, 'wedding-page.html'), 'text/html');
    return;
  }

  if (pathname === '/styles.css') {
    sendFile(res, path.join(frontendRoot, 'styles.css'), 'text/css');
    return;
  }

  if (pathname.startsWith('/src/')) {
    const filePath = path.join(frontendRoot, pathname.replace(/^\//, ''));
    const contentType = pathname.endsWith('.js') ? 'application/javascript' : 'text/plain';
    sendFile(res, filePath, contentType);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
