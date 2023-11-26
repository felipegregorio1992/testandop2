const express = require('express');
const router = express.Router();
const Lives = require('../../db/mongo/mongodb'); // Importe o modelo 'Lives' que você definiu

// Rota para inserir um novo registro de Live
router.post('/logado', async (req, res) => {
  try {
    const { nome, data, categoria, descricao } = req.body;

    // Crie um novo objeto Live com os dados recebidos
    const novaLive = new Lives({ nome, data, categoria, descricao });

    // Salve a nova live no banco de dados
    await novaLive.save();

    // Redirecione para a página de listagem de lives
    res.redirect('/logado');

  } catch (error) {
    console.error('Erro ao inserir a live:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



router.delete('/excluirlive/:id', async (req, res) => {
  try {
 
    const liveId = req.params.id;

  
    const live = await Lives.findById(liveId);

    if (!live) {
      return res.status(404).json({ error: 'Live não encontrada' });
    }

  
    await live.remove();

    
    res.json({ message: 'Live excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir a live:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


// router.get('/dados', async (req, res) => {
//   try {
  
//     const dados = await Lives.find().exec();

  
//     res.json(dados);
//   } catch (error) {
//     console.error('Erro ao buscar dados do banco de dados:', error);
//     res.status(500).json({ error: 'Erro interno do servidor' });
//   }
// });

router.get('/buscarlives', async (req, res) => {
  try {
    
    const lives = await Lives.find();

    
    res.json(lives);
  } catch (error) {
    console.error('Erro ao buscar as lives:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
