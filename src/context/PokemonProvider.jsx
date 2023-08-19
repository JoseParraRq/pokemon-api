import { useEffect, useState } from "react";
import { getAllPokemons, getPokemonDetails } from "../services/services";
import { PokemonContext } from "./pokemonContext";
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
const getPokemons = async (limit=30) => {
  console.log("limit offset", limit,offset)
  const response = await getAllPokemons(offset,limit);
console.log(response?.succesfull)

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
  const response = await getAllPokemons(0,100000);
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
  console.log("getPokemon.succesfull")
  return getPokemon?.succesfull
}

useEffect(() => {
  getPokemons();
}, [offset])

useEffect(() => {
  getGlobalPokemons();
}, [])
const onScrollLoadMore =()=>{
 
  setOffset(offset + 30);

}
	// Filter Function + State
	const [typeSelected, setTypeSelected] = useState({
		grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
	});

	const [filteredPokemons, setfilteredPokemons] = useState([]);
  const handleCheckbox = e => {
		setTypeSelected({
			...typeSelected,
			[e.target.name]: e.target.checked,
		});

		if (e.target.checked) {
			const filteredResults = globalPokemons.filter(pokemon =>
				pokemon.types
					.map(type => type.type.name)
					.includes(e.target.name)
			);
			setfilteredPokemons([...filteredPokemons, ...filteredResults]);
		} else {
			const filteredResults = filteredPokemons.filter(
				pokemon =>
					!pokemon.types
						.map(type => type.type.name)
						.includes(e.target.name)
			);
			setfilteredPokemons([...filteredResults]);
		}
	};

  return (
    <PokemonContext.Provider 
    value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonById,
        onScrollLoadMore,
        loading,
        setloading,
        active,
				setActive,
        handleCheckbox,
				filteredPokemons,
    }}>
        {children}
    </PokemonContext.Provider>
  )
}
