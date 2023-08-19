import React, { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../context/pokemonContext'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { primerMayuscula } from '../helpers/utils'
import { Dialog } from 'primereact/dialog';
import { getPokemonEncounters } from '../services/services'
import { Fieldset } from 'primereact/fieldset';

export const PokemonPage = ({ idPokemon }) => {
  const { getPokemonById } = useContext(PokemonContext)
  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState({})
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const [encounters, setEncounters] = useState([])



  const getPokemon = async (id) => {
    const responsePokemon = await getPokemonById(id)
    setPokemon(responsePokemon)
    const urlSegments = responsePokemon?.location_area_encounters?.split("/");
    const pokemonLocation = urlSegments[urlSegments.length - 1];
    const encounters = await getPokemonEncounters(responsePokemon?.id, pokemonLocation)
    const mapEncounters = encounters?.succesfull.map((e) => {
      return {
        area: e.location_area.name
      }
    })
    setEncounters(mapEncounters?.length > 0 ? mapEncounters : [])
    setLoading(false)
  }

  useEffect(() => {
    getPokemon(idPokemon);
  }, [])

  return (

    <main className='container main-pokemon'>
      {
        loading ? (
          <Loader/>
        ) :
          (
            <>
              <div className='header-main-pokemon'>
                <span className='number-pokemon'>#{pokemon.id}</span>
                <div className='container-img-pokemon'>
                  <img
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={`Pokemon ${pokemon?.name}`}
                  />
                </div>

                <div className='container-info-pokemon'>
                  <h1>{primerMayuscula(pokemon.name)}</h1>
                  <div className='card-types info-pokemon-type'>
                    {pokemon.types.map(type => (
                      <span key={type.type.name} className={`${type.type.name}`}>
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                  <div className='info-pokemon'>
                    <div className='group-info'>
                      <p>Altura</p>
                      <span>{pokemon.height}</span>
                    </div>
                    <div className='group-info'>
                      <p>Peso</p>
                      <span>{pokemon.weight}KG</span>
                    </div>
                  </div>
                </div>
              </div>
              <Fieldset legend="Habilidades" toggleable collapsed={true} >
                  {/* <h1>¿Donde Encontrarlos?</h1> */}
                  <div className='stats'>
                    {
                      pokemon?.abilities.map((ability, index) =>
                        <div style={{ color: 'black', fontSize: '18px', fontWeight:'bold' }}>
                          {`${index + 1}. ${ability.ability.name}`}
                        </div>
                      )
                    }
                  </div>
                </Fieldset>
              <div>
                <Fieldset legend="¿Donde Encontrarlo?" toggleable collapsed={true} >
                  {/* <h1>¿Donde Encontrarlos?</h1> */}
                  <div className='stats'>
                    {
                      encounters.map((e, index) =>
                        <div style={{ color: 'black', fontSize: '18px', fontWeight:'bold' }}>
                          {`${index + 1}. ${e.area}`}
                        </div>
                      )
                    }
                  </div>
                </Fieldset>
              </div>
              <Fieldset legend="Estadisticas" toggleable collapsed={true} >
                <div className='container-stats'>
                  {/* <h1>Estadísticas</h1> */}
                  <div className='stats'>
                    <div className='stat-group'>
                      <span>Hp</span>
                      <div className='progress-bar'></div>
                      <span className='counter-stat'>
                        {pokemon.stats[0].base_stat}
                      </span>
                    </div>
                    <div className='stat-group'>
                      <span>Attack</span>
                      <div className='progress-bar'></div>
                      <span className='counter-stat'>
                        {pokemon.stats[1].base_stat}
                      </span>
                    </div>
                    <div className='stat-group'>
                      <span>Defense</span>
                      <div className='progress-bar'></div>
                      <span className='counter-stat'>
                        {pokemon.stats[2].base_stat}
                      </span>
                    </div>
                    <div className='stat-group'>
                      <span>Special Attack</span>
                      <div className='progress-bar'></div>
                      <span className='counter-stat'>
                        {pokemon.stats[3].base_stat}
                      </span>
                    </div>
                    <div className='stat-group'>
                      <span>Special Defense</span>
                      <div className='progress-bar'></div>
                      <span className='counter-stat'>
                        {pokemon.stats[4].base_stat}
                      </span>
                    </div>
                    <div className='stat-group'>
                      <span>Speed</span>
                      <div className='progress-bar'></div>
                      <span className='counter-stat'>
                        {pokemon.stats[5].base_stat}
                      </span>
                    </div>
                  </div>
                </div>
              </Fieldset>
            </>
          )
      }
    </main>
  )
}
