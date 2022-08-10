const mongoose = require('mongoose');
const Schema = mongoose;
const feedSchema = mongoose.Schema({

    writer: {
        type: String
    },
    description: {
        type: String
    },
    filePath: {
        type: String
    },
    contractAddress: {
        type: String
    },
    tokenNum: {
        type: String
    },
}, { timestamps: true })

const Feed = mongoose.model('Feed', feedSchema);

module.exports = { Feed }