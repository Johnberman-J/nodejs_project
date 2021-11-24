const Joi = require("joi");

const validationSchema = Joi.object({
    nickname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(4)
        .required(),
    confirmPW: Joi.ref('password')
})

module.exports = async (req, res, next) => {
    try {
        const result = await validationSchema.validateAsync(req.body);
        console.log(result);
    } catch (error) {
        res.send({msg: "닉네임 또는 패스워드를 확인해주세요"});
    }
    next();
}


// const nickname = 'jason333';
// const password = '3331';
// const confirmPW = '3334';


// const result = validationSchema.validate({ nickname, password, confirmPW });
// console.log(result)

// if(password.includes(nickname)===true) {
//     console.log("닉네임과 같은 값이 비밀번호에 포함되어 있습니다!");
//     return;
// }