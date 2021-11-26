const mongoose = require("mongoose");

            
const commentSchema = new mongoose.Schema({   // posting시 필요한 정보들을 기입
    detailId: String,
    userID: String,
    comment: String,
    date: String,
});


module.exports = mongoose.model("comments", commentSchema);