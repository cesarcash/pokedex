import {getPokemon, getSpecies} from './api.js'

const $image = document.querySelector('#image')
function setImage(image){
    $image.src = image
}

const $description = document.querySelector('#description')
function setDescription(text){
    $description.textContent = text
}

const $screen = document.querySelector('#screen')
function loader(isLoading = false){
    const img = isLoading ? 'url(./images/loading.gif)' : '' 
    $screen.style.backgroundImage = img
}

const $input = document.querySelector('[name="id"]')
export function updateNumber(number){
    $input.value = number
}

export function randomPokemon(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

export async function findPokemon(id){

    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
    const description = (!pokemon.isError) ? species.data.flavor_text_entries.find((item) => item.language.name === 'es') : ''

    return {
        isError: (pokemon.isError || species.isError) ? true : false,
        id: (!pokemon.isError || !species.isError) ? pokemon.data.id : null,
        sprites: (!pokemon.isError || !species.isError) ? pokemon.data.sprites.front_default : './images/sad.png',
        description: (!pokemon.isError || !species.isError) ? description.flavor_text : 'No encontramos el pokemón ingresado',
    }
    
}

export async function setPokemon(id){

    loader(true)
    const pokemon = await findPokemon(id)
    console.log(pokemon)
    loader(false)
    setImage(pokemon.sprites)
    setDescription(pokemon.description)

    return pokemon
}