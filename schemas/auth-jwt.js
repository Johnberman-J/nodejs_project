const JWT = require("jsonwebtoken");
const users = require("./userSchema");

module.exports = async (req, res, next) => {
    try {  
        const [authType, jwt] = req.headers["authorization"].split(" ");
    // console.log(jwt);
    const tokenInfo = JWT.verify(jwt,"jason");
    // console.log(tokenInfo["nickname"]);
    const { checkingUser } = tokenInfo["nickname"];
    
    const findingUser = await users.findOne({ checkingUser });
    // console.log(findingUser);
    if(!findingUser) {
        res.send({ msg: "로그인이 필요합니다."});
        return;
    }
    
    res.locals = findingUser;
    next();

    } catch (err) {
        res.send({ msg: "로그인이 필요합니다."});
    }
    
}
