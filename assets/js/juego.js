/**
 * 2C = two of clubs(treboles)
 * 2D = two of Diamonds(Diamantes)
 * 2H = two of Heart(Corazones)
 * 2S = two of Spades(Espadas)
 */

// console.log("juego.js");

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0;

//referencias Dom
const btnNuevo = document.querySelector('#btnPedir');
const small = document.querySelector('small');
const divJugadorCartas = document.querySelector('#jugador-cartas');



/**
 * primer for recorre del 2 al 10
 * segundo for recorre los tipos
 * y luegos los agrega al arreglo
 *
 * los dos for ultimos hacen lo mismo  pero con los especiales y los tipos
 * @returns retorna la baraja revuelta
 */
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (const tipo of tipos) {
    for (const esp of especiales) {
      deck.push(  esp + tipo);
    }
  }

  // console.log(deck);
  deck = _.shuffle(deck); //revuelve
  console.log(deck);

  return deck;
};

crearDeck();

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "El mazo tiene mas cartas";
  }

  const carta = deck.pop(); //sacar carta del ultimo

  // console.log(carta);
  return carta;
};

// deck = []; //prueba del error

// pedirCarta();

/**
 * funcion que recibe un string para luego asignarlo a una variable punto
 * @param {valor recibo en la funcion pedirCarta} carta
 * @returns retorna los puntos
 */
// const valorCarta = (carta) => {
//   const valor = carta.substring(0, carta.length - 1);
//   let puntos = 0;

//   if (isNaN(valor)) {
//     puntos = valor === "A" ? 11 : 10;
//   } else {
//     puntos = valor * 1; //convertir a un numero
//     // punto = parseInt(valor); //convertir a un numero
//   }
//   console.log({puntos});
//   return puntos;
// };

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const valor = valorCarta(pedirCarta());
// console.log({ valor });

//Eventos
btnNuevo.addEventListener('click',() => {

  const carta = pedirCarta();
  
  puntosJugador = puntosJugador + valorCarta(carta);
  
  small.innerHTML = puntosJugador; 

  const imgCarta = document.createElement('img');//crea un elemento img
  imgCarta.src = `assets/cartas/${carta}.png`;//agrega source a la imagen
  imgCarta.classList.add('cartas');

  divJugadorCartas.append(imgCarta); //inserta la imagen

  if (puntosJugador>21) {
    console.warn('YA perdiste');
    btnPedir.disabled = true;
  }else if (puntosJugador===21){
    console.warn('Ya ganaste');
  }
  
  console.log({carta});
  console.log({puntosJugador});

});