const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log("auth-jwt를 지나서");
    console.log(req.headers);
    
    const { authorization } = req.headers;
    console.log({ authorization });
    next();
}
