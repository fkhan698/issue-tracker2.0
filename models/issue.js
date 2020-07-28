const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Issue', issueSchema)