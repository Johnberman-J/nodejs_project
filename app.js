const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('views', __dirname + '/pages')              //이 부분 세팅 해주는게 개중요함 진짜
app.set('view engine', 'ejs')
app.use('/static', express.static('./static'))

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