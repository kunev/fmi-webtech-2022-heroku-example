const fs = require('fs');

const dataFileName = "./pokemon_data.json";
const data = {
  lastRead: null,
  lastSynced: null,
  pokemon: [],
  pokemonByName: {},
};

const ensureFile = () => {
  if (!fs.existsSync(dataFileName)) {
    fs.writeFileSync(dataFileName, JSON.stringify([]));
  }
}

const readFromFile = () => {
  const fileData = JSON.parse(fs.readFileSync(dataFileName));
  data.pokemon = fileData;
  for (let pokemon of data.pokemon) {
    data.pokemonByName[pokemon.name] = pokemon;
  }
  data.lastRead = Date.now();
}

const writeDataToFile = () => {
  fs.writeFileSync(dataFileName, JSON.stringify(data.pokemon));
  data.lastSynced = Date.now();
};

const getPokemonById = (id) => {
  let pokemon = data.pokemon[id];

  if (pokemon === undefined || pokemon._deleted) {
    return {found: false};
  }

  return {
    found: true,
    pokemon: pokemon,
  };
};

const getIfExists = (criteria) => {
  console.log(criteria);
  let pokemon;
  if ('id' in criteria) {
    pokemon = data.pokemon[criteria.id];
  } else if ('name' in criteria) {
    pokemon = data.pokemonByName[criteria.name];
  }

  if (pokemon === undefined || pokemon._deleted) {
    return {exists: false};
  }

  return {
    exists:true,
    pokemon: pokemon,
  };
};

ensureFile();
readFromFile();

module.exports = {
  add: (newPokemon) => {
    console.log(newPokemon);
    let {exists, pokemon} = getIfExists({name: newPokemon.name});
    console.log(exists, pokemon);
    if (exists) {
      return {
        success: false,
        error: `pokemon ${pokemon.name} already exists`
      };
    }

    let id = data.pokemon.push(newPokemon) - 1;
    newPokemon.id = id;
    data.pokemonByName[newPokemon.name] = newPokemon;

    writeDataToFile();

    return {
      success: true,
      id: id
    };
  },
  update: (id, updateData) => {
    let pokemon = data.pokemon[id];
    if (pokemon === undefined || pokemon._deleted) {
      return {success: false, error: `pokemon with id ${id} does not exist`};
    }
    for (key of Object.keys(updateData)) {
      console.log(key, pokemon[key], updateData[key]);
      pokemon[key] = updateData[key]
    }
    writeDataToFile();
  },
  getById: (id) => {
    let {exists, pokemon} = getIfExists({id: id});

    if (!exists) {
      return {found: false};
    }

    return {
      found: true,
      pokemon: data.pokemon[id],
    };
  },
  getByName: (name) => {
    let {exists, pokemon} = getIfExists({name: pokemon.name});

    if (!exists) {
      return {found: false};
    }

    return {
      found: true,
      pokemon: data.pokemonByName[name],
    };
  },
  getAll: (includeDeleted) => {
    return data.pokemon.filter((p) => {
      return includeDeleted || !p._deleted
    });
  },
  delete: (id) => {
    let {exists, pokemon} = getIfExists({name: pokemon.name});

    if (!exists) {
      return {deleted: false};
    }

    data.pokemon[id]._deleted = true;
    writeDataToFile();

    return {deleted: true};
  }
}
