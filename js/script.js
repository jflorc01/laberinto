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

const meta = [-1,-1];

// for(let i = 0; i < laberinto.length; i++){
//     for(let j = 0; j < laberinto[i].length; j++){
//         if(laberinto[i][j] === 3){
//             meta = [i, j];
//         }
//     }
// }
let divGanador = document.getElementById("ganador");
const canvas = document.getElementById('laberinto');
    const ctx = canvas.getContext('2d');
    const tileSize = 50;
    var pjcol;
    var pjfil;
    function dibujarLaberinto(matriz) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let fila = 0; fila < matriz.length; fila++) {
            for (let columna = 0; columna < matriz[fila].length; columna++) {
                const valor = matriz[fila][columna];
                const x = columna * tileSize;
                const y = fila * tileSize;

                if (valor === 1 && fila==pjfil+1 && columna==pjcol-1
                    || valor === 1 && fila==pjfil+1 && columna==pjcol
                    || valor === 1 && fila==pjfil+1 && columna==pjcol+1
                    || valor === 1 && fila==pjfil && columna==pjcol-1
                    || valor === 1 && fila==pjfil && columna==pjcol+1
                    || valor === 1 && fila==pjfil-1 && columna==pjcol+1
                    || valor === 1 && fila==pjfil-1 && columna==pjcol-1
                    || valor === 1 && fila==pjfil-1 && columna==pjcol) {
                    ctx.fillStyle = 'black';
                } else if (valor === 2) {
                    ctx.fillStyle = 'green';
                } else if (valor === 3 && fila==pjfil+1 && columna==pjcol-1
                    || valor === 3 && fila==pjfil+1 && columna==pjcol
                    || valor === 3 && fila==pjfil+1 && columna==pjcol+1
                    || valor === 3 && fila==pjfil && columna==pjcol-1
                    || valor === 3 && fila==pjfil && columna==pjcol+1
                    || valor === 3 && fila==pjfil-1 && columna==pjcol+1
                    || valor === 3 && fila==pjfil-1 && columna==pjcol-1
                    || valor === 3 && fila==pjfil-1 && columna==pjcol) {
                    ctx.fillStyle = 'red';
                } else if (valor === 0 && fila==pjfil+1 && columna==pjcol-1
                    || valor === 0 && fila==pjfil+1 && columna==pjcol
                    || valor === 0 && fila==pjfil+1 && columna==pjcol+1
                    || valor === 0 && fila==pjfil && columna==pjcol-1
                    || valor === 0 && fila==pjfil && columna==pjcol+1
                    || valor === 0 && fila==pjfil-1 && columna==pjcol+1
                    || valor === 0 && fila==pjfil-1 && columna==pjcol-1
                    || valor === 0 && fila==pjfil-1 && columna==pjcol){
                    ctx.fillStyle = 'white';
                } else{
                    ctx.fillStyle = '#A9A9A9';
                }

                ctx.fillRect(x, y, tileSize, tileSize);
                ctx.strokeStyle = 'gray';
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
                    pjcol= x/tileSize;
                    pjfil=y/tileSize;
                }
            }
        }
    }
    function mover(matriz, x, y) {
        let mat = matriz;
        let posx, posy;

        for (let i = 0; i < mat.length; i++) {
            for (let j = 0; j < mat[i].length; j++) {
                if (mat[i][j] === 2) {
                    posx = i;
                    posy = j;
                }
            }
        }

        if (
            mat[posx + x][posy + y] !== undefined &&
            mat[posx + x][posy + y] !== 1
        ) {
            mat[posx][posy] = 0;
            mat[posx + x][posy + y] = 2;
        }

        return mat;
    }

    function haGanado(laberinto){
        let victoria = true;

        for(let i = 0; i < laberinto.length; i++){
            for(let j = 0; j < laberinto[i].length; j++){
                if(laberinto[i][j] === 3){
                    victoria = false;
                }
            }
        }

        return victoria;
    }
    buscarPJ(laberinto);
    dibujarLaberinto(laberinto);

    const flechaPresionada = (event) => {
        let x = 0, y = 0;

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            x = -1;
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            x = 1;
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            y = -1;
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            y = 1;
        }

        laberinto = mover(laberinto, x, y);
        if(haGanado(laberinto)){
            divGanador.innerHTML = "👑¡Enhorabuena, has ganado!👑";
            buscarPJ(laberinto);
            dibujarLaberinto(laberinto);
            document.removeEventListener('keydown', flechaPresionada);
        }
        buscarPJ(laberinto);
        dibujarLaberinto(laberinto);
    }

    document.addEventListener('keydown', flechaPresionada);

