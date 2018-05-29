/*
 * @Author: John.Guan 
 * @Date: 2018-05-29 23:01:41 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-05-29 23:31:56
 */

import * as express from 'express';
import * as path from 'path';
import { Server } from 'ws';

const app = express();
// 处理静态资源
app.use('/', express.static(path.join(__dirname, '..', 'client')));

app.get('/api', (req, res) => {
  res.send('这里是首页');
})

app.get('/api/stock', (req, res) => {
  res.json(stocks);
})

app.get('/api/stock/:id', (req, res) => {
  res.json(stocks.find((item) => item.id == req.params.id));
})

const server = app.listen(8080, 'localhost', () => {
  console.log('服务启动，地址8080')
})

// const wsServer = new Server({ port: 8081 });
// wsServer.on('connection', websocket => {
//   websocket.send('欢迎连接ws服务器');
//   websocket.on('message', message => {
//     console.log(`接收到客户端发送的消息${message}`);
//   })
// })

// setInterval(() => {
//   if (wsServer.clients) {
//     wsServer.clients.forEach(client => {
//       client.send('hahhaha');
//     })
//   }
// }, 2000)

const subscriptions = new Set<any>(); //客户端集合
const wsServer = new Server({ port: 8081 });
wsServer.on('connection', websocket => {
  subscriptions.add(websocket); //客户端集合
})

let messageCount = 0;

setInterval(() => {
  subscriptions.forEach(subscription => {
    // 判断是否还连接着
    if (subscription.readyState === 1) {
      subscription.send(JSON.stringify({ messageCount: messageCount++ }));
    } else {
      subscriptions.delete(subscription);
    }

  })
}, 2000)


export class Stock {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {

  }
}

const stocks: Array<Stock> = [
  new Stock(1, '第1个股票', 1, 1, 'gsp第1个股票', ['IT', '互联网', '金融']),
  new Stock(2, '第2个股票', 2, 2, 'gsp第2个股票', ['IT', '互联网']),
  new Stock(3, '第3个股票', 3, 3, 'gsp第3个股票', ['金融']),
  new Stock(4, '第4个股票', 4, 4.3, 'gsp第4个股票', ['IT', '互联网']),
  new Stock(5, '第5个股票', 5, 5.3, 'gsp第5个股票', ['IT', '互联网'])
]