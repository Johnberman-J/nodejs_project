const mongoose = require("mongoose");

const { Schema } = mongoose;                
const userSchema = new Schema({   // posting시 필요한 정보들을 기입
  nickname: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPW: {
    type: String
  }
});

module.exports = mongoose.model("user", userSchema);