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
let puntosComputadora = 0;

//referencias Dom
const btnNuevo = document.querySelector('#btnPedir');
const small = document.querySelector('small');
const divJugadorCartas = document.querySelector('#jugador-cartas');
const divComputadora = document.querySelector('#computadora-cartas');
const small2 = document.querySelectorAll('small');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevoJuego = document.querySelector('#btnNuevo');





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

//turno computadora
const turnoComputadora = (puntosMinimos) => {


  do {
        
      const carta = pedirCarta();
      puntosComputadora = puntosComputadora + valorCarta(carta);
      small2[1].innerHTML = puntosComputadora; 

      const imgCarta = document.createElement('img');//crea un elemento img
      imgCarta.src = `assets/cartas/${carta}.png`;//agrega source a la imagen
      imgCarta.classList.add('cartas');//agraga la clase
      divComputadora.append(imgCarta); //inserta en div    

      if (puntosMinimos>21) {
        break;
      }

  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

  
  setTimeout(() => {
    
    if (puntosComputadora === puntosMinimos) {
      alert("Empate")
    }else if (puntosMinimos>21){
      alert("Perdiste")
    }else if (puntosComputadora>21){
      alert("Ganaste")
    }else{
      alert("Perdiste")
    }
  },10);

}

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
    turnoComputadora(puntosJugador); //para mostrar una carta anque sea 
    btnDetener.disabled = true;
  }else if (puntosJugador===21){
    console.warn('Ya ganaste');
    turnoComputadora(puntosJugador); //
    btnDetener.disabled = true;
  }
  
  console.log({carta});
  console.log({puntosJugador});

});


//evento detener
btnDetener.addEventListener('click',() =>{
  
  btnPedir.disabled   = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});


btnNuevoJuego.addEventListener('click',() =>{

  console.clear();
  deck = [];
  crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  small.innerHTML  = 0;
  small2.innerHTML = 0;
  divJugadorCartas.innerHTML = '';
  divComputadora.innerHTML = '';
  btnPedir.disabled   = false;
  btnDetener.disabled = false;
});


