import React from 'react';
import './App.css';
import Pokemon from './Pokemon';

const BASE_ADDRESS = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {allPokemon: []};

    this.saveToServer = this.saveToServer.bind(this);
    this.newPokemon = this.newPokemon.bind(this);
  }

  componentDidMount() {
    fetch(`${BASE_ADDRESS}/api/pokemon`, {
      method: 'GET',
      mode: 'cors',
    })
      .then(response => response.json())
      .then((allPokemon) => {
        this.setState({allPokemon: allPokemon});
      });
  }

  saveToServer() {
    this.state.allPokemon.forEach((pokemon) => {
      if (pokemon.id === null) {
        //newly created pokemon
        fetch(`${BASE_ADDRESS}/api/pokemon`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pokemon),
        });
      } else {
        // update existing pokemon
        fetch(`${BASE_ADDRESS}/api/pokemon/${pokemon.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pokemon),
        });
      }
    });
  }

  newPokemon() {
    let allPokemon = this.state.allPokemon
    allPokemon.push({
      id: null,
      name: '',
      type: '',
    });

    this.setState({allPokemon: allPokemon});
  }

  render() {
    return (
      <div className="App">
        <h1>Gotta catch 'em all!'</h1>     

        <div className="flex-col-container">
          {this.state.allPokemon.map((pokemon) => {
            return <Pokemon pokemon={pokemon} />
          })}
        </div>
        <button onClick={this.newPokemon}>New</button>
        <button onClick={this.saveToServer}>Save</button>
      </div>
    );
  }
}

export default App;
