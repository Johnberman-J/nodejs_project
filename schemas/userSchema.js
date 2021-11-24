const mongoose = require("mongoose");
            
const userSchema = new mongoose.Schema({   // posting시 필요한 정보들을 기입
  nickname: String,
  password: String,
  confirmPW: String,
});

userSchema.virtual("userId").get(function () {
  return this._id.toHexString();
})
userSchema.set("toJson", {
  virtuals: true,
})

module.exports = mongoose.model("users", userSchema);