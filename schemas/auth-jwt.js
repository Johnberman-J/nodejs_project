const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log("auth-jwt를 지나서");
    const {headers} = req.headers;
    console.log(headers);
    next();
}
