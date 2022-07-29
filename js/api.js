const BASE_URL = 'https://pokeapi.co/api/v2/'

export async function getPokemon(id){

    const response = await fetch(`${BASE_URL}pokemon/${id}/`)
    
    if(!response.ok){ return {isError: true, data: null} }
    
    const data = await response.json()
    return {isError: false, data}

}

export async function getSpecies(id){

    const response = await fetch(`${BASE_URL}pokemon-species/${id}/`)
    
    if(!response.ok){ return {isError: true, data: null} }

    const data = await response.json()
    return {isError: false, data}

}