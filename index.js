const express = require("express");
const pokemonApiRouter = require("./api");

const app = express();

const serverProps = {};

if (process.env.NODE_ENV === 'development') {
  const cors = require('cors');
  app.use(cors());
  serverPrompt.port = 3001;
} else if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('static'));
  serverProps.port = process.env.PORT;
}

app.use(express.json());
app.use('/api', pokemonApiRouter);


app.listen(serverProps.port, () => {console.log(`server running on port ${serverProps.port}`)});
