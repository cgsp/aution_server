"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: John.Guan
 * @Date: 2018-05-27 21:05:47
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-05-27 21:58:12
 */
var express = require("express");
var app = express();
app.get('/api', function (req, res) {
    res.send('这里是首页');
});
app.get('/api/stock', function (req, res) {
    res.json(stocks);
});
app.get('/api/stock/:id', function (req, res) {
    res.json(stocks.find(function (item) { return item.id == req.params.id; }));
});
var server = app.listen(8080, 'localhost', function () {
    console.log('服务启动，地址8080');
});
var Stock = /** @class */ (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, '第1个股票', 1, 1, 'gsp第1个股票', ['IT', '互联网', '金融']),
    new Stock(2, '第2个股票', 2, 2, 'gsp第2个股票', ['IT', '互联网']),
    new Stock(3, '第3个股票', 3, 3, 'gsp第3个股票', ['金融']),
    new Stock(4, '第4个股票', 4, 4.3, 'gsp第4个股票', ['IT', '互联网']),
    new Stock(5, '第5个股票', 5, 5.3, 'gsp第5个股票', ['IT', '互联网'])
];
