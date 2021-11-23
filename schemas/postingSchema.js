const mongoose = require("mongoose");

const { Schema } = mongoose;                
const postingSchema = new Schema({   // posting시 필요한 정보들을 기입
  checkNumber : {
    type: Number,
  },
  userName: {
    type: String,
  },
  encryptPW: {
    type: String,
  },
  content: {
    type: String,
  },
  title: {
    type: String,
  },
  postDate: {
    type: String,
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model("posting", postingSchema);