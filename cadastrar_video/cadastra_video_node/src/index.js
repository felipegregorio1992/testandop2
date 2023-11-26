require('dotenv').config();

const express = require('express');
const Loaders = require('./db/mongo/index');
const routesVideos = require('./routes/routes'); 
const routesCadastro = require('./routes/routercadastro');
const cors = require('cors');

const app = express();
app.use(cors());
Loaders.start();
app.use(express.json());
app.use(routesVideos);
app.use(routesCadastro);

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
});


