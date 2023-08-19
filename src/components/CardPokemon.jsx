import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PokemonPage } from '../pages'
import { Dialog } from 'primereact/dialog';
import { primerMayuscula } from '../helpers/utils';
import { getPokemonDetails } from '../services/services';
import { PokemonContext } from '../context/pokemonContext';

export const CardPokemon = ({ pokemon }) => {

    const [showModal, setShowModal] = useState(false);
    const [position, setPosition] = useState('left');
  const {globalPokemons} = useContext(PokemonContext)
   
    return (
        <>
          
            <div className={`card-pokemon ${pokemon?.types[0]?.type?.name}`} onClick={() => setShowModal(true)} >
                <div className="row">
                    <div className="col-6">
                    <div className='card-info'>
                    <h3 style={{color:'black',fontWeight:'bold', fontSize:'120%'}}>{primerMayuscula(pokemon.name)}</h3>
                        <div style={{fontSize:'80%'}}>Height: {pokemon.height}</div>
                        <div style={{fontSize:'80%'}}>Weight: {pokemon.weight} KG</div>
                        <div style={{fontSize:'80%'}}>Abilities: {pokemon?.abilities[0].ability?.name} ...</div>
                    <div className='card-types' style={{color:'black'}}>
                        {pokemon.types.map(type => (
                            <span key={type.type.name} className={type.type.name} style={{color:'black', fontSize:'15px'}}>
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>
                    </div>
                    <div className="col-6">
                    <div className={`card-img ${pokemon?.types[0]?.type?.name}`} style={{paddingBottom:'0%'}}>
                    <img
                        // src={pokemon.sprites.front_default}
                        src={pokemon.sprites.other.dream_world.front_default}
                        alt={`Pokemon ${pokemon.name}`}
                    />
                </div>
                    </div>
                </div>
            </div>
            <>
                <Dialog
                    header={`Detalle de ${primerMayuscula(pokemon.name)}`}
                    visible={showModal}
                    position={position}
                    style={{ width: '50vw' }}
                    onHide={() => setShowModal(false)}
                    draggable={false}
                    resizable={false}
                >
                    <PokemonPage idPokemon={pokemon.id} />
                </Dialog>
            </>
        </>
    )
}
