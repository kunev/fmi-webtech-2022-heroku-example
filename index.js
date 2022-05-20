const express = require("express");
const pokemonApiRouter = require("./api");

const app = express();

if (process.env.NODE_ENV === 'development') {
  const cors = require('cors');
  app.use(cors());
} else if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('static'));
}

app.use(express.json());
app.use('/api', pokemonApiRouter);


app.listen(3001, () => {console.log('server running')});
