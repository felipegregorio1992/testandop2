// mongodb.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    nome: String,
    data: String,
    categoria: String,
    descricao: String,
    link: String,
    usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

const VideoModel = mongoose.model('Video', VideoSchema);

module.exports = VideoModel;
