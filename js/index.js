import './charts.js'
import {setPokemon, updateNumber, randomPokemon, setImage} from './pokedex.js'

const $form = document.querySelector('#form')
const $next = document.querySelector('#next-pokemon')
const $prev = document.querySelector('#prev-pokemon')
const $nextImage = document.querySelector('#next-image')
const $prevImage = document.querySelector('#prev-image')
const $pokedex = document.querySelector('#pokedex')
const $randomPokemon = document.querySelector('#randomPokemon')

$form.addEventListener('submit', handleSubmit)
$next.addEventListener('click', handleNextPokemon)
$prev.addEventListener('click', handlePrevPokemon)
$nextImage.addEventListener('click', handleNextImage)
$prevImage.addEventListener('click', handlePrevImage)
$randomPokemon.addEventListener('click', handleRandomPokemon)

let activePokemon = null
async function handleSubmit(event){

    event.preventDefault()
    $pokedex.classList.add('is-open')
    const form = new FormData($form)
    const id = form.get('id')
    activePokemon = await setPokemon(id)

}

async function handleNextPokemon(){
    const id = (activePokemon === null || activePokemon.id === 898 ) ? 1 : activePokemon.id + 1
    activePokemon = await setPokemon(id)
    updateNumber(activePokemon.id)
}

async function handlePrevPokemon(){
    const id = (activePokemon === null || activePokemon.id === 1 ) ? 898 : activePokemon.id - 1
    activePokemon = await setPokemon(id)
    updateNumber(activePokemon.id)
}

async function handleRandomPokemon(){
    const min = 1
    const max = 898
    const idPokemon = randomPokemon(min,max)
    activePokemon = await setPokemon(idPokemon)
    updateNumber(idPokemon)
}

let activeSprite = 0

function handleNextImage(){
    if(activePokemon === null) return false

    
    if(activeSprite >= activePokemon.sprites.length - 1){
        activeSprite = 0
        return setImage(activePokemon.sprites[activeSprite])
    }
    
    activeSprite += 1
    return setImage(activePokemon.sprites[activeSprite])
}

function handlePrevImage(){
    if(activePokemon === null) return false
    
    if(activeSprite <= 0){
        activeSprite = activePokemon.sprites.length - 1
        return setImage(activePokemon.sprites[activeSprite])
    }
    activeSprite -= 1

    return setImage(activePokemon.sprites[activeSprite])

}

