import axios from "../helpers/axios";
export async function getAllPokemons(offset,limit) {
    try {
        const getPokemons = await axios.get(`/pokemon?offset=${offset}&limit=${limit}`);

        return {
            succesfull: getPokemons?.data?.results
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getPokemonDetails(id) {
    try {
        const getPokemon = await axios.get(`/pokemon/${id}`);//offset=50&limit=50
        // return getPokemons
        return {
            succesfull: getPokemon?.data
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getPokemonEncounters(id,encounters) {
    try {
        const getEncounters = await axios.get(`/pokemon/${id}/${encounters}`);//offset=50&limit=50
        // return getPokemons
        return {
            succesfull: getEncounters?.data
        }
    } catch (error) {
        console.log(error)
    }
}