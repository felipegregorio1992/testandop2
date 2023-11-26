const mongoose = require('mongoose');

async function startDB() {
  try {
    await mongoose.connect('mongodb+srv://felipegregoriotesteemail:w56T6zzH8dOc6LGE@cluster0.uojqmrv.mongodb.net/seu-banco-de-dados', {

    });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro na conexão com o MongoDB:', error);
  }
}

module.exports = startDB;