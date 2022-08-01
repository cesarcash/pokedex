import {getPokemon, getSpecies} from './api.js'
import { createChart } from './charts.js'

const $image = document.querySelector('#image')
export function setImage(image){
    $image.src = image
}

const $description = document.querySelector('#description')
function setDescription(text){
    $description.textContent = text
}

const $light = document.querySelector('#light')
export function speech(text){

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es'
    
    speechSynthesis.speak(utterance);
    
    $light.classList.add('is-animated')
    utterance.addEventListener('end', () => {
        $light.classList.remove('is-animated')
    })

}

function speechCancel(){
    return speechSynthesis.cancel()
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
    const sprites = (!pokemon.isError || !species.isError) ? [pokemon.data.sprites.front_default] : ['./images/sad.png']
    let statsPokemon = []


    if(!pokemon.isError || !species.isError ){

        for (const item in pokemon.data.sprites){
            if( item !== 'front_default' && item !== 'other' && item !== 'versions' && pokemon.data.sprites[item]){
                sprites.push(pokemon.data.sprites[item])
            }
        }

        statsPokemon = pokemon.data.stats.map(item => item.base_stat)

    }

    return {
        sprites,
        isError: (pokemon.isError || species.isError) ? true : false,
        id: (!pokemon.isError || !species.isError) ? pokemon.data.id : null,
        description: (!pokemon.isError || !species.isError) ? description.flavor_text : 'No encontramos el pokemón ingresado',
        name: (!pokemon.isError || !species.isError) ? pokemon.data.name : 'Error 404',
        statsPokemon,
    }
    
}

let activeChart = null

export async function setPokemon(id){

    loader(true)
    const pokemon = await findPokemon(id)
    loader(false)

    setImage(pokemon.sprites[0])
    setDescription(pokemon.description)
    speechCancel()
    speech(`${pokemon.name}. ${pokemon.description}`)
    
    if(activeChart instanceof Chart){
        activeChart.destroy()
    }

    activeChart = createChart(pokemon.statsPokemon)


    return pokemon
}