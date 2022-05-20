const express = require("express");
const dataStore = require("./file_datastore");

const pokemonApiRouter = express.Router();

pokemonApiRouter.post('/pokemon', (req, res) => {
  console.log(req.body, req.headers);
  writeResult = dataStore.add(req.body);
  if (writeResult.success) {
    res.status(200)
      .json({id: writeResult.id});
  } else {
    res.status(409)
      .json({error: writeResult.error});
  }
  // TODO: there are more things that could go wrong
});

pokemonApiRouter.get('/pokemon', (req, res) => {
  const includeDeleted = JSON.parse(req.query.includeDeleted || false);
  let pokemon = dataStore.getAll(includeDeleted);
  res.status(200).json(pokemon);
});

pokemonApiRouter.get('/pokemon/:id', (req, res) => {
  let pokemon = dataStore.getById(parseInt(req.params.id));
  res.json(pokemon);
});

pokemonApiRouter.put('/pokemon/:id', (req, res) => {
  dataStore.update(req.params.id, req.body)
  res.status(200).send();
});

pokemonApiRouter.delete('/pokemon/:id', (req, res) => {
  let {deleted} = dataStore.delete(req.params.id);

  if (deleted) {
    res.status(200)
      .json({deleted: true});
  } else {
    res.status(404)
    .json({deleted: false, reason: 'not found'});
  }
});

module.exports = pokemonApiRouter;
