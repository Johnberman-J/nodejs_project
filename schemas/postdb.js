const mongoose = require("mongoose");

const { Schema } = mongoose;                
const postingSchema = new Schema({   // posting시 필요한 정보들을 기입
  postId: {
    type: Number,
    required: true,                // 이 값이 필수정보냐? true!
    unique: true                   // 이 postId가 unique 해야하냐? true!
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true  
  }
});

module.exports = mongoose.model("Goods", postingSchema);