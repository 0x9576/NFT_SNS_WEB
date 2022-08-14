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
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    locationInfo: {
        type: String
    },
}, { timestamps: true })

const Feed = mongoose.model('Feed', feedSchema);

module.exports = { Feed }