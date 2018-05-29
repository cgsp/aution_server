/*
 * @Author: John.Guan 
 * @Date: 2018-05-27 21:05:47 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-05-27 21:58:12
 */
import * as express from 'express';

const app = express();
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