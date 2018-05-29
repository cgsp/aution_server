import * as http from 'http';

const server = http.createServer((req, res) => {
  res.end('hellp node')
})

server.listen(8000);