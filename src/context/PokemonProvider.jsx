import { useEffect, useState } from "react";
import { getAllPokemons, getPokemonDetails } from "../services/services";
import { PokemonContext } from "./pokemonContext"
import { useForm } from "../hook/useform";


export const PokemonProvider = ({children}) => {

const [offset, setOffset] = useState(0);
const [allPokemons,setAllPokemons]=useState([]);
const [globalPokemons,setGlobalPokemons] = useState([])
const [loading, setloading] = useState(true)
const [active,setActive]= useState(false)


const {valueSearch, onInputChange, onResetForm} = useForm({
  valueSearch:''
})

//llamar a todos los pokemons
const getPokemons = async (limit = 30) => {
  const response = await getAllPokemons(limit,offset);


  const mapResponse = response?.succesfull.map(async(pokemon)=>{
    const urlSegments = pokemon.url.split("/");
    const pokemonId = urlSegments[urlSegments.length - 2]; 
    const getPokemon = await getPokemonDetails(pokemonId);
    return getPokemon?.succesfull;
  })
  const results = await Promise.all(mapResponse)
setAllPokemons([...allPokemons,...results])
setloading(false)
}

const getGlobalPokemons = async()=>{
  const response = await getAllPokemons(100000,0);
  const mapResponse = response?.succesfull.map(async(pokemon)=>{
    const urlSegments = pokemon.url.split("/");
    const pokemonId = urlSegments[urlSegments.length - 2]; 
    const getPokemon = await getPokemonDetails(pokemonId);
    return getPokemon?.succesfull;
  })
  const results = await Promise.all(mapResponse)
  console.log(results)
  setGlobalPokemons(results)
setloading(false)

}

const getPokemonById = async(id) =>{
  const getPokemon = await getPokemonDetails(id)
}
useEffect(() => {
  getPokemons();
}, [])

useEffect(() => {
  getGlobalPokemons();
}, [])

  return (
    <PokemonContext.Provider 
    value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonById
    }}>
        {children}
    </PokemonContext.Provider>
  )
}
