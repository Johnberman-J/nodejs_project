const mongoose = require("mongoose");

const { Schema } = mongoose;                
const postingSchema = new Schema({   // posting시 필요한 정보들을 기입
  postId: {
    type: Number,              // 이 postId가 unique 해야하냐? true!
  },
  userName: {
    type: String,
  },
  password: {
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
  }
});

module.exports = mongoose.model("posting", postingSchema);