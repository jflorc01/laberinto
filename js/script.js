let laberinto = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const meta = buscarNumero(laberinto, 3);
const posInicial = buscarNumero(laberinto, 2);
const tiempos = [];

let mins = 0;
let segs = 0;
let ms = 0;

let cronoIniciado = false;
let Interval;

let divGanador = document.getElementById("ganador");
let tiempo = document.getElementById("tiempo");
let canvas = document.getElementById("laberinto");
let spanSeg = document.getElementById("seg");
let spanMin = document.getElementById("min");
let spanMs = document.getElementById("ms");
let historial = document.getElementById("historial");
const btnReiniciar = document.getElementById("reiniciar");

const ctx = canvas.getContext("2d");

const tileSize = 50;
var pjcol;
var pjfil;

function buscarNumero(matriz, num){
    let result = [];
    for(let i = 0; i < matriz.length; i++){
        for(let j = 0; j < matriz[i].length; j++){
            if(matriz[i][j] == num){
                result[0] = i;
                result[1] = j;
            }
        }
    }
    return result;
}

function dibujarLaberinto(matriz) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let fila = 0; fila < matriz.length; fila++) {
    for (let columna = 0; columna < matriz[fila].length; columna++) {
      const valor = matriz[fila][columna];
      const x = columna * tileSize;
      const y = fila * tileSize;

      if (
        (valor === 1 && fila == pjfil + 1 && columna == pjcol - 1) ||
        (valor === 1 && fila == pjfil + 1 && columna == pjcol) ||
        (valor === 1 && fila == pjfil + 1 && columna == pjcol + 1) ||
        (valor === 1 && fila == pjfil && columna == pjcol - 1) ||
        (valor === 1 && fila == pjfil && columna == pjcol + 1) ||
        (valor === 1 && fila == pjfil - 1 && columna == pjcol + 1) ||
        (valor === 1 && fila == pjfil - 1 && columna == pjcol - 1) ||
        (valor === 1 && fila == pjfil - 1 && columna == pjcol)
      ) {
        ctx.fillStyle = "black";
      } else if (valor === 2) {
        ctx.fillStyle = "green";
      } else if (
        (valor === 3 && fila == pjfil + 1 && columna == pjcol - 1) ||
        (valor === 3 && fila == pjfil + 1 && columna == pjcol) ||
        (valor === 3 && fila == pjfil + 1 && columna == pjcol + 1) ||
        (valor === 3 && fila == pjfil && columna == pjcol - 1) ||
        (valor === 3 && fila == pjfil && columna == pjcol + 1) ||
        (valor === 3 && fila == pjfil - 1 && columna == pjcol + 1) ||
        (valor === 3 && fila == pjfil - 1 && columna == pjcol - 1) ||
        (valor === 3 && fila == pjfil - 1 && columna == pjcol)
      ) {
        ctx.fillStyle = "red";
      } else if (
        (valor === 0 && fila == pjfil + 1 && columna == pjcol - 1) ||
        (valor === 0 && fila == pjfil + 1 && columna == pjcol) ||
        (valor === 0 && fila == pjfil + 1 && columna == pjcol + 1) ||
        (valor === 0 && fila == pjfil && columna == pjcol - 1) ||
        (valor === 0 && fila == pjfil && columna == pjcol + 1) ||
        (valor === 0 && fila == pjfil - 1 && columna == pjcol + 1) ||
        (valor === 0 && fila == pjfil - 1 && columna == pjcol - 1) ||
        (valor === 0 && fila == pjfil - 1 && columna == pjcol)
      ) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = "#A9A9A9";
      }

      ctx.fillRect(x, y, tileSize, tileSize);
      ctx.strokeStyle = "gray";
      ctx.strokeRect(x, y, tileSize, tileSize);
    }
  }
}
function buscarPJ(matriz) {
  for (let fila = 0; fila < matriz.length; fila++) {
    for (let columna = 0; columna < matriz[fila].length; columna++) {
      const valor = matriz[fila][columna];
      // Coordenadas del bloque
      const x = columna * tileSize;
      const y = fila * tileSize;
      if (valor === 2) {
        // Punto de partida
        pjcol = x / tileSize;
        pjfil = y / tileSize;
      }
    }
  }
}

// Mueve el 2 en el array dependiendo de las coordenadas que se le pasen
function mover(matriz, x, y) {
  let mat = matriz;
  let posx, posy;

  // Encuentra la posición del jugador
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === 2) {
        posx = i;
        posy = j;
      }
    }
  }

  // Cambia la posición
  if (mat[posx + x][posy + y] !== undefined && mat[posx + x][posy + y] !== 1) {
    mat[posx][posy] = 0;
    mat[posx + x][posy + y] = 2;
  }

  return mat;
}

// Comprueba si se ha llegado a la meta.
function haGanado(laberinto) {
  let victoria = true;

  for (let i = 0; i < laberinto.length; i++) {
    for (let j = 0; j < laberinto[i].length; j++) {
      // Si sigue habiendo meta, significa que el jugador no ha llegado a ella
      if (laberinto[i][j] === 3) {
        victoria = false;
      }
    }
  }

  return victoria;
}

buscarPJ(laberinto);
dibujarLaberinto(laberinto);

const flechaPresionada = (event) => {
    // Inicio del cronómetro
    if(!cronoIniciado){
        cronoIniciado = true;
        Interval = setInterval(iniciarCrono, 10);

    }
  let x = 0,
    y = 0;

  // En función de qué flecha se pulse, se enviarán unas coordenadas a la función mover
  if (event.key === "ArrowUp") {
    event.preventDefault();
    x = -1;
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    x = 1;
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    y = -1;
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    y = 1;
  }

  laberinto = mover(laberinto, x, y);
  // Si el jugador gana:
  if (haGanado(laberinto)) {
    // Se para el temporizador
    clearInterval(Interval);
    // Mostramos el tiempo en el historial
    historial.innerHTML += "<br>- " + tiempo.innerHTML;
    // Mostramos el botón para volver a jugar
    btnReiniciar.style.display = "block";
    // Felicitamos al jugador.
    divGanador.innerHTML = "👑¡Enhorabuena, has ganado!👑";

    buscarPJ(laberinto);
    dibujarLaberinto(laberinto);
    document.removeEventListener("keydown", flechaPresionada);
  }
  buscarPJ(laberinto);
  dibujarLaberinto(laberinto);
};

// Función que controla el cronómetro para que muestre los valores correctos.
function iniciarCrono() {
    ms++;

    if(ms <=0){
        spanMs.innerHTML = "0" + ms;
    }else{
        spanMs.innerHTML = ms;
    }

    if(ms > 99){
        if(segs === 59){
            mins++;
            spanMin.innerHTML = mins;
            segs = 0;
            spanSeg.innerHTML = "0" + 0;
        }else if(segs < 9){
            segs++;
            spanSeg.innerHTML = "0" + segs;
        }else{
            segs++;
            spanSeg.innerHTML = segs;
        }
        ms = 0;
        spanMs.innerHTML = "0" + 0;
    }
}

// Reinicia todos los valores para volver a jugar
function volverAJugar(){

    // Ponemos en el laberinto la posición inicial del jugador y la meta
    // en sus posiciones correctas.
    laberinto[posInicial[0]][posInicial[1]] = 2;
    laberinto[meta[0]][meta[1]] = 3;

    
    mins = "00";
    segs = "00";
    ms = "00";

    cronoIniciado = false;

    spanMin.innerHTML = "00";
    spanSeg.innerHTML = "00";
    spanMs.innerHTML = "00";

    // Ocultamos los elementos que se muestran al ganar.
    btnReiniciar.style.display = "none";
    divGanador.innerHTML = "";

    buscarPJ(laberinto);
    dibujarLaberinto(laberinto);
    document.addEventListener("keydown", flechaPresionada);
}

btnReiniciar.addEventListener("click", volverAJugar);
document.addEventListener("keydown", flechaPresionada);
