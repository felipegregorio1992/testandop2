// models/adminModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  nome: String,
  senha: String,
});

const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;
