import React, { useContext, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { PokemonContext } from '../context/pokemonContext'

export const Navigation = () => {

const {onInputChange, valueSearch, onResetForm} = useContext(PokemonContext)//se puede destructurar usando const {numero} = useContext(PokemonContext)
const navigate = useNavigate()
const onSearchSubmit =(e)=>{
    e.preventDefault()
    navigate('/search',{
        state:valueSearch
    })
    onResetForm()
}
    return (
        <>
            <header className='container'>
                <Link to='/' className='logo'>
                    <img
                        src='https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png'
                        alt='Logo Pokedex'
                    />
                </Link>

                <form onSubmit={onSearchSubmit}>

                    <div className='form-group'>
                        <input
                            type='search'
                            name='valueSearch'
                            id=''
                            value={valueSearch}
                            onChange={onInputChange}
                            placeholder='Buscar nombre de pokemon'
                            style={{ marginTop: '12px' }}
                        />
                    </div>

                    <button className='btn-search'>Buscar</button>
                </form>
            </header>

            <Outlet />
        </>
    )
}
