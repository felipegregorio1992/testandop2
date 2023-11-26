const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../db/mongo/mongodbusuario');

// Rota de cadastro de usuário
router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifique se o e-mail já está em uso
    const usuarioExistente = await UsuarioModel.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já está em uso' });
    }

    // Crie um novo usuário sem hash de senha
    const novoUsuario = new UsuarioModel({ nome, email, senha });

    // Salve o novo usuário no banco de dados
    await novoUsuario.save();

    // Gere um token JWT
    const token = jwt.sign({ usuarioId: novoUsuario._id }, 'seuSegredo', { expiresIn: '1h' });

    // Retorne o token e o nome para o cliente
    res.json({ token, nome });
  } catch (error) {
    console.error('Erro ao cadastrar o usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de login de usuário
router.post('/login', async (req, res) => {
  try {
    // Extraia email e senha do corpo da requisição
    const { email, senha } = req.body;

    // Encontre o usuário com base no e-mail fornecido
    const usuario = await UsuarioModel.findOne({ email });

    // Verifique se o usuário existe e se a senha está correta (sem comparar hashes)
    if (!usuario || senha !== usuario.senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gere um token JWT
    const token = jwt.sign({ usuarioId: usuario._id }, 'seuSegredo', { expiresIn: '1h' });

    // Retorne o token e o nome para o cliente
    res.status(200).json({ token, nome: usuario.nome });
  } catch (error) {
    console.error('Erro no login do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao fazer login' });
  }
});

module.exports = router;
