var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },

},{collection:'pessoas'})

var Pessoas = mongoose.model("Pessoas",postSchema);

module.exports = Pessoas;