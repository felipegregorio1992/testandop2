const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Lives = new Schema({
    id: ObjectId,
    nome: String,
    data: Date,
    categoria: String,
    descricao: String 
});

const LivesModel = mongoose.model('Lives', Lives);

module.exports = LivesModel;