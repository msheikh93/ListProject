const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    listItem : {type: String, required: true},
});

module.exports = mongoose.model('listSchema', listSchema);