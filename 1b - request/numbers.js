const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/IoTExam', { useNewUrlParser: true, useUnifiedTopology: true });

const schema = new mongoose.Schema({
    secret: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { versionKey: false })

module.exports = mongoose.model('numbers', schema)