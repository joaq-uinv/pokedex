import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [datosPokemon, setDatosPokemon] = useState([]);
  const [tipoPokemon, setTipoPokemon] = useState("");

  const onChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    traerPokemon();
  };

  const traerPokemon = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      setTipoPokemon(res.data.types[0].type.name);
      setDatosPokemon([res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <h1>Pokédex</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Buscar Pokémon"
          required
        />
        <label htmlFor="">
          <span></span>
        </label>
      </form>
      {datosPokemon.map((data) => {
        return (
          <div className="contenedor">
            <img src={data.sprites["front_default"]} alt="" />
            <div className="tabla">
              <div className="cuerpo">
                <div className="fila-tabla">
                  <div className="celda-tabla">Type</div>
                  <div className="celda-tabla">{tipoPokemon}</div>
                </div>
                <div className="fila-tabla">
                  <div className="celda-tabla">Height</div>
                  <div className="celda-tabla">
                    {" "}
                    {Math.round(data.height * 3.9)}"
                  </div>
                </div>
                <div className="fila-tabla">
                  <div className="celda-tabla">Weight</div>
                  <div className="celda-tabla">
                    {" "}
                    {Math.round(data.weight / 4.3)} lbs
                  </div>
                </div>
                <div className="fila-tabla">
                  <div className="celda-tabla">Number of Battles</div>
                  <div className="celda-tabla">{data.game_indices.length}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
