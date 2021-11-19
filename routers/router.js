const express = require('express');
const posting = require('../schemas/postingSchema')


const router = express.Router();

router.post('/board/create', async(req, res) => {
    const{postId, userName, password, content, title, postDate} = req.body;

    console.log(req.body)
    // let checkingPostId = await posting.find({postId})
    // if(checkingPostId.length == 0) {
    //     await posting.create({postId, userName, password, content, title, postDate});
    // }
    
    res.send({'msg' : 'success'})
})


module.exports = router; // 반드시 써줘야한다. 그래야 routing 다시 잡힐때 처리 가능하다...
                         // 왜 /api같은거 써먹는거냐... 그냥 하면 안되냐 app.js에서...