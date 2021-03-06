const express = require('express');
const posting = require('../schemas/postingSchema');
const users = require("../schemas/userSchema");
const validationSchema = require("../schemas/validation");
const comments = require("../schemas/commentSchema");
const jwt = require("jsonwebtoken");
const authJWT = require("../schemas/auth-jwt");
const commentSchema = require('../schemas/commentSchema');


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


// 회원가입(register) 기능 구현
router.post("/register", validationSchema, async (req, res) => {
    // console.log("이곳에 도착");
    const { nickname, password, confirmPW } = req.body;
    // console.log({ nickname, password, confirmPW })
    const checkedNickname = await users.findOne({nickname});
    // console.log(checkedNickname);
    
    if(checkedNickname) {
        // console.log("중복값이 있다!");
        res.send({ msg: "중복된 닉네임입니다!"});
        return
    }
    // console.log("중복값이 없다! 다음 체크 고고!");

    const validNickname = req.body["nickname"];
    const validPassword = req.body["password"];

    if(validPassword.includes(validNickname)) {
        // console.log("닉네임이랑 비슷함!")
        res.send({ msg: "닉네임과 같은 값이 존재합니다!"})
    } else {
        const user = new users({ nickname, password, confirmPW });
        await user.save();
        res.send({ msg: "회원가입 완료!"});
    }
})

router.post('/login', async (req, res) => {
    const { nickname } = req.body;
    const userCheck = await users.findOne({ nickname });
    // console.log(userCheck)
    if(!userCheck) {
        res.send({ msg: "존재하지 않는 닉네임입니다!"});
        return;
    } else {
        const passwordCheck = req.body["password"];
        // console.log(passwordCheck);
        if(userCheck["password"]!==passwordCheck) {
            res.send({ msg : "패스워드를 확인해주세요!"});
            return;
        }
        const token = jwt.sign({ nickname }, "jason");
        // console.log(nickname);
        // res.send(token);
        res.send({token, nickname});
    }
})

// 로그인 인증을 위한 api
router.get("/auth", authJWT, async (req, res) => {
    const findingUser = res.locals["nickname"];
    // console.log(findingUser);
    res.status(200).send({ msg: "success", nickname: findingUser });
})

router.post("/comment", async (req, res) => {
    const { detailId, userID, comment, date } = req.body;
    
    const commentDB = new comments({ detailId, userID, comment, date });
    await commentDB.save();

    res.send("댓글이 등록 되었습니다!");
})

router.get("/comment", async (req, res) => {
    const allComments = await comments.find({});
    res.send(allComments)
})

router.post("/comment/modify", async(req, res) => {
    const {date, comment} = req.body;
    

    // const newDate = String(new Date()).substring(4,25);
    await comments.updateOne({ date: date }, {comment: comment});
    const selectedCommentDB = await comments.findOne({ date });

    console.log(selectedCommentDB);

    res.send({msg : "수정 완료!"});
})

router.delete("/comment/delete", async (req, res) => {
    const { date } = req.body;
    await comments.deleteOne({ date : date });
    res.send();
})


module.exports = router; // 반드시 써줘야한다. 그래야 routing 다시 잡힐때 처리 가능하다...
                         // 왜 /api같은거 써먹는거냐... 그냥 하면 안되냐 app.js에서...
                         // 이게 미들웨어를 export하는 방법이다 임마. 그래서 쓰는거다.