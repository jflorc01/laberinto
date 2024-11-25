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

const canvas = document.getElementById('laberinto');
    const ctx = canvas.getContext('2d');
    const tileSize = 50;

    function dibujarLaberinto(matriz) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let fila = 0; fila < matriz.length; fila++) {
            for (let columna = 0; columna < matriz[fila].length; columna++) {
                const valor = matriz[fila][columna];
                const x = columna * tileSize;
                const y = fila * tileSize;

                if (valor === 1) {
                    ctx.fillStyle = 'black';
                } else if (valor === 2) {
                    ctx.fillStyle = 'green';
                } else if (valor === 3) {
                    ctx.fillStyle = 'red';
                } else {
                    ctx.fillStyle = 'white';
                }

                ctx.fillRect(x, y, tileSize, tileSize);
                ctx.strokeStyle = 'gray';
                ctx.strokeRect(x, y, tileSize, tileSize);
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

    dibujarLaberinto(laberinto);

    document.addEventListener('keydown', (event) => {
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
        dibujarLaberinto(laberinto);
    });

