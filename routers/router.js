const express = require('express');
const posting = require('../schemas/postingSchema');
const userInfo = require("../schemas/userSchema");



const router = express.Router();

// 게시글(작성) 기능 구현
router.post('/board/create', async(req, res) => {

    const{checkNumber, userName, password, content, title, postDate} = req.body;
    await posting.create({checkNumber, userName, password, content, title, postDate});

    res.send({'msg' : 'success'})
})

router.get('/home', async(req, res) => {
    const allData = await posting.find({});

    res.send(allData);
})

// 상세페이지(페이지 렌더링) 기능 구현
router.get('/detail/:detailId', async(req, res) => {
    const{ detailId } = req.params;
    const allData = await posting.find({});
    const selectedData = allData[detailId];

    const selectedUserName = selectedData['userName']
    const selectedTitle = selectedData['title']
    const selectedPostDate = selectedData['postDate']
    const selectedContent = selectedData['content']

    let sendingData = {
        selectedUserName : selectedUserName,
        selectedTitle : selectedTitle,
        selectedPostDate : selectedPostDate,
        selectedContent : selectedContent
    }
    res.send(sendingData)
})

// 수정페이지(페이지 렌더링을 위한 정보) 기능 구현
router.get('/modify/:modifyId', async(req, res) => {
    const { modifyId } = req.params;
    const allData = await posting.find({});
    const selectedData = allData[modifyId];
    
    const selectedUserName = selectedData['userName']
    const selectedTitle = selectedData['title']
    const selectedContent = selectedData['content']

    // console.log(selectedUserName,selectedTitle,selectedContent)

    let sendingData = {
        selectedUserName : selectedUserName,
        selectedTitle : selectedTitle,
        selectedContent : selectedContent
    }
    res.send(sendingData)
})

// 수정페이지(업데이트=수정)기능 구현
router.post('/modify/:modifyId', async(req, res) => {
    const { modifyId } = req.params;
    const { password, content } = req.body;
    const recievingPassword = { password, content }['password']
    const recievingContent = { password, content }['content']
    
    const allData = await posting.find({});
    const selectedData = allData[modifyId];
    

    const selectedPassword = selectedData['password'];
    const selectedCheckNum = selectedData['checkNumber'];

    if(selectedPassword!=recievingPassword) {
        res.send({msg: "비밀번호가 일치하지 않습니다!"})
    } else {
        await posting.updateOne({checkNumber: selectedCheckNum}, {content: recievingContent})
        res.send({msg: "수정 완료!"})
    }
})

// 수정페이지(삭제)기능 구현
router.delete('/modify/:modifyId', async(req, res) => {
    const { modifyId } = req.params;
    const { password } = req.body;
    const recievingPassword = { password }['password']
    
    const allData = await posting.find({});
    const selectedData = allData[modifyId];

    const selectedPassword = selectedData['password'];
    const selectedCheckNum = selectedData['checkNumber'];

    if(selectedPassword!=recievingPassword) {
        res.send({msg: "비밀번호가 일치하지 않습니다!"})
    } else {
        await posting.deleteOne({checkNumber : selectedCheckNum})
        res.send({msg: "삭제 완료!"})
    }
})

// 회원가입(이메일 중복 검사) 기능
router.get("/register", async(req, res) => {
    

    res.send({msg: "fail"})
    res.send({msg: "success"})
})

// 회원가입(register) 기능 구현
router.post("/register", async(req, res) => {


    res.send({msg : "success"})
})



module.exports = router; // 반드시 써줘야한다. 그래야 routing 다시 잡힐때 처리 가능하다...
                         // 왜 /api같은거 써먹는거냐... 그냥 하면 안되냐 app.js에서...
                         // 이게 미들웨어를 export하는 방법이다 임마. 그래서 쓰는거다.