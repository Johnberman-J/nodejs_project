const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');

// 스키마 이용를 위한 import
const connect = require('./schemas/connectMongo')
connect();

// 라우터 이용을 위한 import
const postingRouter = require('./routers/router') // 반드시 필요햐다! 개중요; 반대로 router에선 exports해줘야함



//이 부분 세팅 해주는게 개중요함 진짜
app.set('views', __dirname + '/pages')              
app.set('view engine', 'ejs')
app.use(express.json());
app.use("/data", [postingRouter]) // 꼭 이렇게까지 처리해서 관리해야하냐...
app.use(express.urlencoded({extended : true}))
app.use('/static', express.static('./static'))

// route에 따라서 페이지를 렌더링 해주는 부분
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/board', (req, res) => {
    res.render('board')
})

app.get('/detail', (req, res) => {
    res.render('detail')
})

app.get('/modify', (req, res) => {
    res.render('modify')
})

app.listen(3000, () => console.log('Server is opened'));