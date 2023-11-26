
require('dotenv').config();
const express = require('express');
const routes = require('./routes/mysql/routes');
const Loaders = require('./db/mongo/index');
const routesVideos = require('./routes/mongo/routes'); 
const cors = require('cors');


const app = express();
app.use(cors());
Loaders.start();
app.use(express.json());
app.use(routes);
app.use(routesVideos);
app.set('view engine', 'html');




app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`); 
});

