import axios from "../helpers/axios";
export async function getAllPokemons(limit,offset) {
    try {
        const getPokemons = await axios.get(`/pokemon?limit=${limit}&offset=${offset}`);

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