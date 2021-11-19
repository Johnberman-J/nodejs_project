const express = require('express');
const posting = require('../schemas/postingSchema')


const router = express.Router();

router.post('/board/create', async(req, res) => {

    const{checkNumber, userName, password, content, title, postDate} = req.body;
    await posting.create({checkNumber, userName, password, content, title, postDate});
    
    res.send({'msg' : 'success'})
})

router.get('/home', async(req, res) => {
    const allData = await posting.find({});
    console.log(allData);

    res.send(allData);
})

module.exports = router; // 반드시 써줘야한다. 그래야 routing 다시 잡힐때 처리 가능하다...
                         // 왜 /api같은거 써먹는거냐... 그냥 하면 안되냐 app.js에서...