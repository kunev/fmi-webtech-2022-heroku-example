import React from 'react';

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      pokemon: props.pokemon,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.fieldChange = this.fieldChange.bind(this);
  }

  toggleEdit(event) {
    this.setState({editable: !this.state.editable});
  }

  fieldChange(event) {
    let field = event.target.name;
    let newValue = event.target.value;
    let oldValue = this.state[field]
    if (oldValue != newValue) {
      let newPokemon = this.state.pokemon;
      newPokemon[field] = newValue;
      this.setState({pokemon: newPokemon});
    }
  }

  render() {
    let fields;
    if (this.state.editable) {
      fields = (
        <div className="flex-row-container">
          <input
            className="flex-item"
            name="name"
            onChange={this.fieldChange}
            value={this.state.pokemon.name} />
          <input
            className="flex-item"
            name="type"
            onChange={this.fieldChange}
            value={this.state.pokemon.type} />
        </div>
      );
    } else {
      fields = (
        <div className="flex-row-container">
          <label className="flex-item">{this.state.pokemon.name}</label>
          <label className="flex-item">{this.state.pokemon.type}</label>
        </div>
      );
    }

    return (
      <div className="flex-item">
        {fields}
        <button onClick={this.toggleEdit}>{ this.state.editable ? 'Done' : 'Edit' }</button>
      </div>
    );
   }
}

export default Pokemon;
