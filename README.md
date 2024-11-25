## Juego del laberinto

*Array laberinto:* Significado números:
    * 0: Camino.
    * 1: Muro.
    * 2: Posición del jugador.
    * 3: Meta.

*Funcionamiento:* 
    * Canvas que imprime una cuadrícula del tamaño del array del laberinto.
    * Casill negra: Muros.
    * Casilla blanca: Camino.
    * Casilla verde: Posición del jugador.
    * Casilla roja: meta,

*Tareas:*
    - [x] Imprimir laberinto.
    - [x] Mover posición.
    - [x] Impedir que se mueva en los muros.
    - [ ] Imprimir solamente las casillas de alrededor del jugador.

*Ideas:*
    * La casilla vibra más cuanto más cerca de la meta.
    * Elemento que se mueva aleatoriamente por los caminos y que si te alcanza pierdes.
    * Editor de mapas. Dibujar una cuadrícula y en las casillas en las que se haga clic serán muros. (Posible animación al añadir el muro).