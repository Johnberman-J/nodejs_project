const mongoose = require('mongoose');

const connect = () => {
    
    mongoose
    .connect('mongodb://localhost:27017/board_prac', {
        ignoreUndefined: true
    })

    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
    console.error("MongoDB connection err", err);
});

module.exports = connect;