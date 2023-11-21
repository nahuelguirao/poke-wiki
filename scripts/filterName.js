async function findPokemonByName(pokemonName) {
    const cardContainer = document.querySelector('.card-container');
    const main = document.getElementById('main');

    try {
        //Calls the api with the pokemonName
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        //Clean all the containers (badResult is the try again message with sad pikachu)
        cardContainer.innerHTML = '';
        const badResult = main.querySelector('.bad-result');
        if (badResult) {
            badResult.remove();
        }
        //If response is not ok
        if (!response.ok) {
            const badResult = document.createElement('div');
            badResult.classList.add('bad-result');
            badResult.innerHTML = `
                <h2>We couldn't find your Pokémon, try again!</h2>
                <img src="img/pikachu-sad.png">
            `;
            main.append(badResult);
            return;
        }
        // If the response is ok returns the card with the pokemon data
        const result = await response.json();
        if (result) {
            //Makes the <p> element with the pokemon types (because it can be 1 or 2 types at the same time)
            let types = result.types.map(res => `<p class='${res.type.name} type'>${res.type.name}`);
            types = types.join('');
            //Inserts pokemon card in cardContainer
            cardContainer.innerHTML = `
                <div class='card'>
                    <div class="pokemon-image">
                        <img src=${result.sprites.other['official-artwork'].front_default}
                            alt="${result.name}">
                        <p class="pokemon-id-back">#${result.id}</p>
                    </div>
                    <div class="pokemon-description">
                        <p class="pokemon-id">#${result.id}</p>
                        <h2 class="pokemon-name">${result.forms[0].name}</h2>
                    </div>
                    <div class="pokemon-types">
                        ${types}
                    </div>
                    <div class="pokemon-stats">
                        <p class="stat">${result.height}M</p>
                        <p class="stat">${result.weight}KG</p>
                    </div>
                </div>
            `;
        }
    } catch(error) {
        console.error(error);
    }
}

//Search Function
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input-name');
    const button = document.querySelector('.button-filter');

    button.addEventListener('click', async function() {
        //Search with the inputValue
        const inputValue = input.value.toLowerCase();
        await findPokemonByName(inputValue);
    });
    //When keydown 'enter'
    input.addEventListener('keydown', async function(e) {
        if (e.code === 'Enter'){
            const inputValue = input.value.toLowerCase();
            await findPokemonByName(inputValue);
        }
    })
});
