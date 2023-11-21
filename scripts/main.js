const containerPokemons = document.querySelector('.card-container');
const main = document.getElementById('main')

let url = `https://pokeapi.co/api/v2/pokemon/`;
let requests = [];

for (let i = 1; i <= 200; i++) {
    requests.push(fetch(url + i).then(res => res.json()));
}

//Promise all the request to load the pokemon in order
Promise.all(requests)
    .then(dataArray => {
        dataArray.forEach(data => showPokemon(data));
    })
    .catch(error => console.error(error));

function showPokemon(data) {
    //Conditional background ID 
    let id = data.id.toString()
    if (id.length === 1){
        id = `00${id}`
    } else if (id.length === 2){
        id = `0${id}`
    } else {
        id = `${id}`
    }
    //Pokemon Type
    let types = data.types.map(res => `<p class='${res.type.name} type'>${res.type.name}`)
    types = types.join('')
    //Creating each card
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = 
        `
            <div class="pokemon-image">
                <img src=${data.sprites.other['official-artwork'].front_default}
                    alt="${data.name}">
                <p class="pokemon-id-back">#${id}</p>
            </div>
            <div class="pokemon-description">
                <p class="pokemon-id">#${id}</p>
                <h2 class="pokemon-name">${data.forms[0].name}</h2>
            </div>
            <div class="pokemon-types">
                ${types}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${data.height}M</p>
                <p class="stat">${data.weight}KG</p>
            </div>
        `
    //Adding the card into the container
    containerPokemons.append(div);
}

//FILTERS

//Select all the buttons
let buttons = document.querySelectorAll('.button')
//For each button makes an event listener
buttons.forEach(button => button.addEventListener('click', (e) => {
    //Get button value (to filter)
    const buttonId = e.currentTarget.id
    
    //Empty the container
    const badResult = main.querySelector('.bad-result')
    if (badResult){
        badResult.innerHTML = ''
    }
    containerPokemons.innerHTML = ''
    
    //Does the filter
    for (let i = 1 ; i <= 200; i++){
        fetch(url+i)
            .then(res => res.json())
            .then(data => {
                if (buttonId == 'all'){
                    showPokemon(data)
                } else {
                    const types = data.types.map(type => type.type.name)
                    if (types.some(type => type.includes(buttonId))){
                        showPokemon(data)
                    }
                }
            })
    }
}))