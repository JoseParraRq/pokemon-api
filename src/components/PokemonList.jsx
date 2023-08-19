import React, { useContext, useState } from 'react'
import { PokemonContext } from '../context/pokemonContext'
import { CardPokemon, Loader } from '../components'

export const PokemonList = () => {
  const { allPokemons, loading, filteredPokemons } =
  useContext(PokemonContext);

return (
  <>
    {loading ? (
      <Loader />
    ) : (
      <div className='card-list-pokemon container'>
        {filteredPokemons?.length ? (
          <>
            {filteredPokemons.map(pokemon => (
              <CardPokemon pokemon={pokemon} key={pokemon.id} />
            ))}
          </>
        ) : (
          <>
            {allPokemons.map(pokemon => (
              <CardPokemon pokemon={pokemon} key={pokemon.id} />
            ))}
          </>
        )}
      </div>
    )}
  </>
);
};