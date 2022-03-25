
document.getElementById("app").innerHTML = `
<div id='poke_container' class="poke-container"></div>
<div id='modal_container' class="modal-container"></div>
<div id="overlay"></div>
`;

const modal_container = document.getElementById("modal_container");
const poke_container = document.getElementById("poke_container");
const pokemons_number = 40;

const fetchPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
  //console.log(pokemon.id);
  modal(pokemon);
};

const colors = {
  fire: "rgb(207 46 46 / 30%)",
  grass: "rgba(47 187 56 / 30%)",
  electric: "rgb(245 239 94 / 32%)",
  water: "rgb(0 111 163 / 48%)",
  ground: "rgb(253 199 144 / 54%)",
  rock: "rgb(89 63 38 / 58%)",
  fairy: "rgb(248 204 255 / 51%)",
  poison: "rgb(150 237 168 / 46%)",
  bug: "rgb(255 199 119 / 49%)",
  dragon: "rgb(134 176 253 / 63%)",
  psychic: "rgb(234 237 161 / 52%)",
  flying: "rgb(245 245 245 / 38%)",
  fighting: "rgb(241 173 142 / 46%)",
  normal: "rgb(245 245 245 / 23%)"
};

const main_types = Object.keys(colors);
//console.log(main_types);

fetchPokemon();

function createPokemonCard(pokemon) {
  var pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  pokemonEl.id = pokemon.id;

  const poke_type = pokemon.types.map((el) => el.type.name);
  const type = main_types.find((type) => poke_type.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type]; //this change
  pokemonEl.style.backgroundColor = color;
  const pokeInnerHTML = `
        <div class="img-container">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.id
          }.png" />     
        </div>
        <div class="info">
          <h1 class="number">${pokemon.id.toString().padStart(2, "0")}</h1>
          <h3 class="name">${name}</h3>
          <small class="type">Type: <span>${type}</span></small>
        </div>
          
    `;
  pokemonEl.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
  open(pokemonEl); // no se pq esta aqui
}

function open(nu) {
  nu.addEventListener("click", function () {
    var modalSel = document.getElementById(`modal${nu.id}`);
    var overlay = document.getElementById("overlay");
    modalSel.classList.add("active");
    overlay.classList.add("active");
    //close modal
    var btn2 = document.getElementById(`close-btn${nu.id}`);
    btn2.addEventListener("click", function () {
      modalSel.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
}

function modal(nu) {
  const name = nu.name[0].toUpperCase() + nu.name.slice(1);
  const poke_type = nu.types.map((el) => el.type.name);
  const poke_type2 = poke_type.map((el) => el[0].toUpperCase() + el.slice(1));
  const type = main_types.find((type) => poke_type.indexOf(type) > -1);
  var modalEl = document.createElement("div");
  modalEl.classList.add("modal");
  modalEl.id = `modal${nu.id}`;
  const modalInnerHtml = `
    <div class="header" style="background-color:${colors[type]};">
      ${name}
      <button class="close-btn" id="close-btn${nu.id}">&times;</button>
      <div class="img-container-modal">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nu.id}.png" />     
        </div>
      </div>
      <div class="body">Types: ${poke_type2} </br>
      </div>
    </div>
    `;
  modalEl.innerHTML = modalInnerHtml;
  modal_container.appendChild(modalEl);

  var modal = document.getElementById(`modal${nu.id}`);
  var overlay = document.getElementById("overlay");

  //modal.classList.add("active");
  //overlay.classList.add("active");
  //close modal overlay
  overlay.addEventListener("click", () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
}
